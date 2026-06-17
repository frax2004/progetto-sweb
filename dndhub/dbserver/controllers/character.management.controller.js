import { UserInstance } from "dbserver/global.context.js";
import { Database } from "../database.js";
import { DatabaseQueries } from "../database.queries.ts";


let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}

async function unwrapLevelSpecific(levelRow) {
  let features = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${levelRow.features}`);
  let class_specific = Database.queryAll(`SELECT * FROM ClassSpecific WHERE id = ${levelRow.class_specific}`);

  return {
    name: levelRow.character_class,
    features: await DatabaseQueries.map(await features, DatabaseQueries.unwrapArrayAPIReferenceItem),
    class_specific: (await DatabaseQueries.map(await class_specific, DatabaseQueries.unwrapClassSpecific))[0],
    idx: levelRow.idx,
    level: levelRow.level,
    ability_score_bonuses: levelRow.ability_score_bonuses,
    prof_bonus: levelRow.prof_bonus,
    cantrips_known: levelRow.cantrips_known,
    spell_slots_level_1: levelRow.spell_slots_level_1,
    spell_slots_level_2: levelRow.spell_slots_level_2,
    spell_slots_level_3: levelRow.spell_slots_level_3,
    spell_slots_level_4: levelRow.spell_slots_level_4,
    spell_slots_level_5: levelRow.spell_slots_level_5,
    spell_slots_level_6: levelRow.spell_slots_level_6,
    spell_slots_level_7: levelRow.spell_slots_level_7,
    spell_slots_level_8: levelRow.spell_slots_level_8,
    spell_slots_level_9: levelRow.spell_slots_level_9,
    spells_known: levelRow.spells_known,
    additional_magical_secrets_max_lvl: levelRow.additional_magical_secrets_max_lvl,
    aura_range: levelRow.aura_range
  }
}

async function displayLevelByNameAndLevel(req, res) {
  // lower case fatto in caso eventuale di errori
  const className = req.body.className.toLowerCase();
  // non voglio sottoclassi quindi subclass is null in query
  
  // console.log('Sono nella funzione --> ', className);

  let lvlsArray = [];
  try {
    for (let level = 1; level<=20; level++) {
      let levelInfo = Database.queryAll(`SELECT * FROM Level WHERE (character_class = '${className}' AND level = ${level} AND subclass is null)`);

      lvlsArray.push(await unwrapLevelSpecific((await levelInfo)[0]));
      //console.log(lvlsArray[level-1]);
    } 
  }
  catch(err) {
    console.log(err);
    sendResponse({
      status_code: 404,
      message: 'Non è stato possibile caricare i livelli dal database',
      success: false,
    }, res);
  }

  // arrivo qui se non ci sono stati problemi
  sendResponse({
      levels: lvlsArray,
      status_code: 200,
      success: true,
      message: 'Livelli caricati con successo'
    },
    res
  );
  
}

async function displayLevelRowByClassAndLevel(req,res) {
  const className = req.body.className.toLowerCase();
  const level = req.body.level;

  let levelRow = undefined;

  try {
    let levelInfo = Database.queryAll(`SELECT * FROM Level WHERE (character_class = '${className}' AND level = ${level} AND subclass is null)`);
  
    // console.log(await levelInfo);

    levelRow = await unwrapLevelSpecific((await levelInfo)[0]);
    console.log(levelRow);
  }
  catch (err) {
    console.log(err);
    sendResponse({
      status_code: 404,
      message: 'Non è stato possibile caricare i livelli dal database',
      success: false,
    }, res);
  }

  // arrivo qui se non ci sono stati problemi
  sendResponse({
      level: levelRow,
      status_code: 200,
      success: true,
      message: 'Livelli caricati con successo'
    },
    res
  );
}

export function displayClasses(req, res) {
  canSend=true;

  DatabaseQueries.retrieve("SELECT * FROM Class", DatabaseQueries.unwrapClass)
  .catch(err => {
    sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare le classi dal database',
        success: false,
      }, 
      res
    );
  }).then(classes => {
    sendResponse({
        classes: classes,
        status_code: 200,
        success: true,
        message: 'Classi caricate con successo'
      },
      res
    );
  });

  canSend = true;
}

async function unwrapSubspecies(subspecies) {
  if (subspecies===undefined) return;
  let ability_bonuses = Database.queryAll(`SELECT * FROM ArrayAbilityBonusItem WHERE array_id = ${subspecies.ability_bonuses}`);
  let racial_traits = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${subspecies.racial_traits}`);

  return {
    name: subspecies.name,
    species: subspecies.species,
    desc: subspecies.desc,
    ability_bonuses: await DatabaseQueries.map(await ability_bonuses, DatabaseQueries.unwrapArrayAbilityBonusItem),
    racial_traits: await DatabaseQueries.map(await racial_traits, DatabaseQueries.unwrapArrayAPIReferenceItem)
  };
}

async function unwrapSpeciesSpecific(species) {
  let subspecies = await Database.queryAll(`SELECT * FROM Subspecies WHERE species = '${species.idx}'`);
  let specArray = [];
  for(const spec of subspecies) {
    specArray.push(await unwrapSubspecies(spec));
  }
  let ability_bonuses = Database.queryAll(`SELECT * FROM ArrayAbilityBonusItem WHERE array_id = ${species.ability_bonuses}`);
  let ability_bonus_options = Database.queryAll(`SELECT * FROM Choice WHERE id = ${species.ability_bonus_options}`);
  let languages = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${species.languages}`);
  let language_options = Database.queryAll(`SELECT * FROM Choice WHERE id = ${species.language_options}`);
  let traits = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${species.traits}`);

  return {
    name: species.name,
    speed: species.speed,
    alignment: species.alignment,
    age: species.age,
    size: species.size,
    size_description: species.size_description,
    language_desc: species.language_desc,
    ability_bonuses: await DatabaseQueries.map(await ability_bonuses, DatabaseQueries.unwrapArrayAbilityBonusItem),
    ability_bonus_options: (await DatabaseQueries.map(await ability_bonus_options, DatabaseQueries.unwrapChoice))[0],
    languages: await DatabaseQueries.map(await languages, DatabaseQueries.unwrapArrayAPIReferenceItem),
    language_options: (await DatabaseQueries.map(await language_options, DatabaseQueries.unwrapChoice))[0],
    traits: await DatabaseQueries.map(await traits, DatabaseQueries.unwrapArrayAPIReferenceItem),
    subspecies: specArray.length === 0 ? undefined : specArray,  
  };
}

async function displaySpecies(req,res) {
  canSend = true;

  
  let speciesArray = [];
  try{
    const species = await Database.queryAll(`SELECT * FROM Species`);
  
    for (const sp of species) {
      //console.log(sp);
      speciesArray.push(await unwrapSpeciesSpecific(sp));
      // da levare è solo per debug
      // console.log(speciesArray[speciesArray.length-1]);
    }
  }
  catch (err) {
    console.log(err);
    sendResponse({
      status_code: 404,
      message: 'Non è stato possibile caricare le speci dal database',
      success: false,
    }, res);
    return;
  }

  //arrivo qui se non ci sono stati problemi
  sendResponse({
    status_code: 200,
    message: 'Speci caricate con successo',
    success: true,
    species: speciesArray,
  }, res);
}

async function displayBackgrounds(req,res) {
  canSend=true;

  DatabaseQueries.retrieve("SELECT * FROM Background", DatabaseQueries.unwrapBackground)
  .catch(err => {
    sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare i background dal database',
        success: false,
      }, 
      res
    );
  }).then(bgs => {
    sendResponse({
        backgrounds: bgs,
        status_code: 200,
        success: true,
        message: 'backgrounds caricati con successo'
      },
      res
    );
  });
}

async function displaySpellsByClass(req,res) {
  canSend=true;

  const className = req.body.className.toLowerCase();

  DatabaseQueries.retrieve(`SELECT * FROM Spell WHERE classes LIKE '%${className}%'`, DatabaseQueries.unwrapSpell)
  .catch(err => {
    sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare gli incantesimi dal database',
        success: false,
      }, 
      res
    );
  }).then(spells => {
    // console.log(JSON.stringify(spells));
    sendResponse({
        spells: spells,
        status_code: 200,
        success: true,
        message: 'Incantesimi caricate con successo'
      },
      res
    );
  });
}

async function displayClassByName(req,res) {
  canSend = true;

  const class_idx = req.body.className.toLowerCase();

  DatabaseQueries.retrieve(`SELECT * FROM Class WHERE idx = '${class_idx}'`, DatabaseQueries.unwrapClass)
  .catch(err => {
  sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare le classi dal database',
        success: false,
      }, 
      res
    );
  }).then(classes => {
    sendResponse({
        classes: classes,
        status_code: 200,
        success: true,
        message: 'Classi caricate con successo'
      },
      res
    );
  });
}

async function displaySpeciesByName(req,res) {
  canSend = true;

  const species_idx = req.body.speciesName.toLowerCase();

  DatabaseQueries.retrieve(`SELECT * FROM Species WHERE idx = '${species_idx}'`, DatabaseQueries.unwrapSpecies)
  .catch(err => {
  sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare le speci dal database',
        success: false,
      }, 
      res
    );
  }).then(species => {
    sendResponse({
        species: species,
        status_code: 200,
        success: true,
        message: 'Specie caricata con successo'
      },
      res
    );
  });
}

async function displayBackgroundByName(req,res) {
  canSend = true;

  const bg_idx = req.body.bgName.toLowerCase();

  DatabaseQueries.retrieve(`SELECT * FROM Background WHERE idx = '${bg_idx}'`, DatabaseQueries.unwrapBackground)
  .catch(err => {
  sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare il background dal database',
        success: false,
      }, 
      res
    );
  }).then(bg => {
    sendResponse({
        background: bg,
        status_code: 200,
        success: true,
        message: 'Background ottenuto con successo'
      },
      res
    );
  });
}

async function insertCharacter(req,res) {
  canSend = true;

  const name = req.body.name;
  const healthPoints = req.body.healthPoints;
  const imgURL = req.body.imgURL;
  const characterClass = req.body.characterClass;
  const subclass = req.body.subclass;
  const species = req.body.species;
  const subspecies = req.body.subspecies;
  const background = req.body.background;
  const level = req.body.level;
  const levelSpecifics = req.body.levelSpecifics;
  const equipment = req.body.equipment;
  const proficiencies = req.body.proficiencies;
  const languages = req.body.languages;
  const speciesTraits = req.body.speciesTraits;
  const speed = req.body.speed;
  const size = req.body.size;
  const startingGold = req.body.startingGold;
  const backgroundFeature = req.body.backgroundFeature;
  const statistics = req.body.statistics;
  const spellsKnown = req.body.spellsKnown;
  const spells = req.body.spells;
  const cantrips = req.body.cantrips;

  const idx_personaggio = `${name} @ ${UserInstance.USER.player_id}`;

  //log di testing, da levare dopo
  console.log('idx_personaggio: ' + idx_personaggio);

  //da finire, prima scrivo il middleware
}


export default {
  displayClasses,
  displayLevelByNameAndLevel,
  displaySpecies,
  displayBackgrounds,
  displayLevelRowByClassAndLevel,
  displaySpellsByClass,
  displayClassByName,
  displayBackgroundByName,
  displaySpeciesByName,
  insertCharacter,
}