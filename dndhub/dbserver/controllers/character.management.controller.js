import { Database } from "../database.js";
import { DatabaseQueries } from "../database.queries.ts";


let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
    canSend=true;
    //TODO da togliere = true
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

function displaySpecies(req,res) {
  canSend = true;

  DatabaseQueries.retrieve("SELECT * FROM Species", DatabaseQueries.unwrapSpecies)
  .catch(err => {
    sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare le speci dal database',
        success: false,
      }, 
      res
    );
  }).then(species => {
    console.log(species);
    sendResponse({
        species: species,
        status_code: 200,
        success: true,
        message: 'Speci caricate con successo'
      },
      res
    );
  });
}

export default {
  displayClasses,
  displayLevelByNameAndLevel,
  displaySpecies,
}