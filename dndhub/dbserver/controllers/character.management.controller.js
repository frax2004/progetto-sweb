import { UserInstance } from "../global.context.js";
import { Database } from "../database.js";
import { DatabaseQueries } from "../database.queries.ts";
import fs from 'fs';
import { freemem } from "os";


let canSend = true;
function sendResponse(obj, res) {
  if (canSend) {
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
  canSend = true;
  // lower case fatto in caso eventuale di errori
  const className = req.body.className.toLowerCase();
  // non voglio sottoclassi quindi subclass is null in query

  // console.log('Sono nella funzione --> ', className);

  let lvlsArray = [];
  try {
    for (let level = 1; level <= 20; level++) {
      let levelInfo = Database.queryAll(`SELECT * FROM Level WHERE (character_class = '${className}' AND level = ${level} AND subclass is null)`);

      lvlsArray.push(await unwrapLevelSpecific((await levelInfo)[0]));
      //console.log(lvlsArray[level-1]);
    }

    sendResponse({
      levels: lvlsArray,
      status_code: 200,
      success: true,
      message: 'Livelli caricati con successo'
    },
      res
    );
  }
  catch (err) {
    console.log(err);
    sendResponse({
      status_code: 404,
      message: 'Non è stato possibile caricare i livelli dal database',
      success: false,
    }, res);
  }
}

async function displayLevelRowByClassAndLevel(req, res) {
  canSend = true;
  const className = req.body.className.toLowerCase();
  const level = req.body.level;

  let levelRow = undefined;

  try {
    let levelInfo = Database.queryAll(`SELECT * FROM Level WHERE (character_class = '${className}' AND level = ${level} AND subclass is null)`);

    // console.log(await levelInfo);

    levelRow = await unwrapLevelSpecific((await levelInfo)[0]);

    sendResponse({
      level: levelRow,
      status_code: 200,
      success: true,
      message: 'Livelli caricati con successo'
    },
      res
    );
  }
  catch (err) {
    console.log(err);
    sendResponse({
      status_code: 404,
      message: 'Non è stato possibile caricare i livelli dal database',
      success: false,
    }, res);
  }
}

export function displayClasses(req, res) {
  canSend = true;

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
}

async function unwrapSubspecies(subspecies) {
  if (subspecies === undefined) return;
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
  for (const spec of subspecies) {
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

async function displaySpecies(req, res) {
  canSend = true;


  let speciesArray = [];
  try {
    const species = await Database.queryAll(`SELECT * FROM Species`);

    for (const sp of species) {
      //console.log(sp);
      speciesArray.push(await unwrapSpeciesSpecific(sp));
      // da levare è solo per debug
      // console.log(speciesArray[speciesArray.length-1]);
    }
    sendResponse({
      status_code: 200,
      message: 'Speci caricate con successo',
      success: true,
      species: speciesArray,
    }, res);
  }
  catch (err) {
    console.log(err);
    sendResponse({
      status_code: 404,
      message: 'Non è stato possibile caricare le speci dal database',
      success: false,
    }, res);
  }
}

function displayBackgrounds(req, res) {
  canSend = true;

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

function displaySpellsByClass(req, res) {
  canSend = true;

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

function displayClassByName(req, res) {
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

function displaySpeciesByName(req, res) {
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

function displayBackgroundByName(req, res) {
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

function insertSpells(idx_personaggio, spells, cantrips, res) {
  //funzione di appoggio per insertCharacter

  if (spells === undefined || spells === null) return '';

  let array_idx = 0;

  let finalSpellsQuery = spells.map((spell) => `INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        '${spell.name}',
        '${idx_personaggio}',
        ${array_idx++}
      );`
  );

  if (cantrips === undefined || cantrips === null) return finalSpellsQuery.join('\n');

  let finalCantripsQuery = cantrips.map((cantrip) => `INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          '${cantrip.name}',
          '${idx_personaggio}',
          ${array_idx++}
        );`
  );


  return `${finalSpellsQuery.join('\n')}
          ${finalCantripsQuery.join('\n')}`;
}

function insertEquipment(idx_personaggio, equipment, res) {
  //funzione di appoggio per insertCharacter

  let finalQuery = equipment.map((equip, array_idx) => `INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        '${equip.idx}',
        '${idx_personaggio}',
        ${array_idx}
      );`
  );


  return finalQuery.join('\n');
}

function insertLanguage(idx_personaggio, languages, res) {
  //funzione di appoggio per insertCharacter

  let finalQuery = languages.map((lang, array_idx) => `INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        '${lang}',
        '${idx_personaggio}',
        ${array_idx}
      );`
  );

  return finalQuery.join('\n');
}

function insertStats(idx_personaggio, statistics, res) {
  //funzione di appoggio per insertCharacter
  const statsName = ['strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma'];

  let finalQuery = statsName.map((stat, array_idx) => {
    const statIdx = stat === 'strength' ? 'str' :
      stat === 'dexterity' ? 'dex' :
        stat === 'constitution' ? 'con' :
          stat === 'intelligence' ? 'int' :
            stat === 'wisdom' ? 'wis' : 'cha';
    return `INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        '${statIdx}',
        ${statistics[stat].value},
        ${statistics[stat].modifier},
        '${idx_personaggio}',
        ${array_idx}
      );`;
  });


  return finalQuery.join('\n');
}

function insertFeats(idx_personaggio, feats, res) {
  //funzione di appoggio per insertCharacter

  if (feats === undefined || feats === null) return '';

  let finalQuery = feats.map((feat, array_idx) => `INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        '${feat}',
        '${idx_personaggio}',
        ${array_idx}
      );`
  );


  return finalQuery.join('\n');
}

function insertProficiencies(idx_personaggio, proficiencies, res) {
  //funzione di appoggio per insertCharacter

  let finalQuery = proficiencies.map((prof, array_idx) => `INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        '${prof.name.toLowerCase()}',
        '${idx_personaggio}',
        ${array_idx}
      );`
  );


  return finalQuery.join('\n');
}

async function insertCharacter(req, res) {
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
  const cantripsKnown = req.body.cantripsKnown;
  const spells = req.body.spells;
  const cantrips = req.body.cantrips;

  const idx_personaggio = `${name} @ ${UserInstance.USER.player_id}`;
  const utente_generico = UserInstance.USER.email;

  //log di testing, da levare dopo
  console.log('idx_personaggio: ' + idx_personaggio);

  try {
    const insertCharQuery = `
    BEGIN TRANSACTION;


    INSERT OR IGNORE INTO Personaggio (
      utente_generico,
      nome,
      punti_vita,
      bonus_competenza,
      idx_personaggio,
      classe,
      sottoclasse,
      specie,
      sottospecie,
      background,
      livello,
      quantita_oro,
      numero_incantesimi,
      numero_trucchetti,
      slot_livello_1,
      slot_livello_2,
      slot_livello_3,
      slot_livello_4,
      slot_livello_5,
      slot_livello_6,
      slot_livello_7,
      slot_livello_8,
      slot_livello_9,
      velocita,
      taglia,
      abilita_extra,
      imgURL
    )
    VALUES (
      '${utente_generico}',
      '${name}',
      ${healthPoints},
      ${levelSpecifics.proficiency_bonus},
      '${idx_personaggio}',
      '${characterClass.toLowerCase()}',
      ${subclass !== undefined ? `'${subclass.toLowerCase().replace(' ', '-')}'` : null},
      '${species.toLowerCase()}',
      ${subspecies !== undefined ? `'${subspecies.toLowerCase().replace(' ', '-')}'` : null},
      '${background.toLowerCase().replace(' ', '-')}',
      ${level},
      ${startingGold.quantity},
      ${spellsKnown !== undefined ? spellsKnown : null},
      ${cantripsKnown !== undefined ? cantripsKnown : null},
      ${levelSpecifics.spell_slots_level_1 !== undefined ? levelSpecifics.spell_slots_level_1 : null},
      ${levelSpecifics.spell_slots_level_2 !== undefined ? levelSpecifics.spell_slots_level_2 : null},
      ${levelSpecifics.spell_slots_level_3 !== undefined ? levelSpecifics.spell_slots_level_3 : null},
      ${levelSpecifics.spell_slots_level_4 !== undefined ? levelSpecifics.spell_slots_level_4 : null},
      ${levelSpecifics.spell_slots_level_5 !== undefined ? levelSpecifics.spell_slots_level_5 : null},
      ${levelSpecifics.spell_slots_level_6 !== undefined ? levelSpecifics.spell_slots_level_6 : null},
      ${levelSpecifics.spell_slots_level_7 !== undefined ? levelSpecifics.spell_slots_level_7 : null},
      ${levelSpecifics.spell_slots_level_8 !== undefined ? levelSpecifics.spell_slots_level_8 : null},
      ${levelSpecifics.spell_slots_level_9 !== undefined ? levelSpecifics.spell_slots_level_9 : null},
      ${speed},
      '${size}',
      '${backgroundFeature.name}',
      ${imgURL !== undefined ? `'${imgURL}'` : null}
      );
      
      
      ${insertSpells(idx_personaggio, spells, cantrips, res)};
  
      ${insertEquipment(idx_personaggio, equipment, res)};
  
      ${insertLanguage(idx_personaggio, languages, res)};
  
      ${insertStats(idx_personaggio, statistics, res)};
      
      ${insertProficiencies(idx_personaggio, proficiencies, res)};
  
      ${insertFeats(idx_personaggio, speciesTraits, res)};
  
      ${insertFeats(idx_personaggio, levelSpecifics.feats, res)};
      
      COMMIT;
      `;

    fs.writeFileSync('queryTest.sql', insertCharQuery, 'utf-8');
    await Database.execAll(insertCharQuery);

    sendResponse({
      status_code: 200,
      message: 'Personaggio caricato!',
      success: true,
    }, res);
  }
  catch (err) {
    console.log('Errore nel catch di character.management.controller.insertCharacter():\n ', err);
    try {
      await Database.execOne('ROLLBACK;');
    }
    finally {
      sendResponse({
        status_code: 400,
        message: 'Errore nell\'inserimento dei dati personaggio',
        success: false,
        err: err,
      }, res);
    }
  }


}

function getAbilityScores(req, res) {
  canSend = true;

  DatabaseQueries.retrieve("SELECT * FROM AbilityScore", DatabaseQueries.unwrapAbilityScore)
    .catch(err => {
      sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare gli ability scores dal database',
        success: false,
      },
        res
      );
    }).then(abScores => {
      sendResponse({
        ability_scores: abScores,
        status_code: 200,
        success: true,
        message: 'backgrounds caricati con successo'
      },
        res
      );
    });
}

function getCharacterByIdx(req, res) {
  canSend = true;

  const idx = req.body.idx_personaggio;

  DatabaseQueries.retrieve(`SELECT * FROM Personaggio WHERE idx_personaggio = '${idx}'`, (el) => el)
    .catch(err => {
      sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare il personaggio dal database',
        success: false,
      },
        res
      );
    }).then(character => {
      sendResponse({
        character: character[0],
        status_code: 200,
        success: true,
        message: 'Personaggio caricato con successo'
      },
        res
      );
    });
}

function getCharacterAbilityScores(req, res) {
  canSend = true;

  const idx = req.body.idx_personaggio;

  DatabaseQueries.retrieve(`SELECT * FROM ArrayStatsItem WHERE idx_personaggio = '${idx}'`, (el) => el)
    .catch(err => {
      sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare le statistiche dal database',
        success: false,
      },
        res
      );
    }).then(stats => {
      sendResponse({
        stats: stats,
        status_code: 200,
        success: true,
        message: 'Statistiche caricate con successo'
      },
        res
      );
    });
}

function getCharacterProficiencies(req, res) {
  canSend = true;

  const idx = req.body.idx_personaggio;

  DatabaseQueries.retrieve(`SELECT * FROM ArrayProficienciesItem WHERE idx_personaggio = '${idx}'`, (el) => el)
    .catch(err => {
      sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare le competenze dal database',
        success: false,
      },
        res
      );
    }).then(profs => {
      sendResponse({
        proficiencies: profs,
        status_code: 200,
        success: true,
        message: 'Competenze caricate con successo'
      },
        res
      );
    });
}

async function getCharacterEquipment(req, res) {
  canSend = true;

  const idx = req.body.idx_personaggio;

  DatabaseQueries.retrieve(`SELECT item FROM ArrayEquipmentItem WHERE idx_personaggio = '${idx}'`, (el) => el)
    .catch(err => {
      sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare equipaggiamento dal database',
        success: false,
      },
        res
      );
    }).then(async (equipmentArray) => {
      try {
        let retEquip = [];
        for (const item of equipmentArray) {

          const unwrappedEquip = await DatabaseQueries.retrieve(`SELECT * FROM Equipment WHERE idx like '%${item.item}%'`, DatabaseQueries.unwrapEquipment);

          if (unwrappedEquip[0] !== undefined) retEquip.push(unwrappedEquip[0]);
        }
        sendResponse({
          equipment: retEquip,
          status_code: 200,
          message: 'Equipaggiamento ottenuto correttamente',
          success: true,
        }, res);
      }
      catch (err) {
        // console.log(err);
        sendResponse({
          status_code: 404,
          message: 'Non è stato possibile caricare equipaggiamento dal database ' + err.message,
          success: false,
        }, res);
      }
    });
}

function getCharacterLanguages(req, res) {
  canSend = true;

  const idx = req.body.idx_personaggio;

  DatabaseQueries.retrieve(`SELECT item FROM ArrayLanguageItem WHERE idx_personaggio = '${idx}'`, (el) => el)
    .catch(err => {
      sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare le lingue dal database',
        success: false,
      },
        res
      );
    }).then(languages => {
      let langArray = [];
      for (const language of languages) {
        DatabaseQueries.retrieve(`SELECT * FROM Language WHERE idx = '${language.item}'`, el => el)
          .catch(err => {
            sendResponse({
              status_code: 404,
              message: 'Non è stato possibile caricare le lingue dal database',
              success: false,
            },
              res
            );
            return;
          })
          .then(lang => {
            langArray.push(lang[0])

            if (langArray.length === languages.length) {
              console.log('sono qui');
              sendResponse({
                status_code: 200,
                languages: langArray,
                message: 'Lingue caricate',
                success: true,
              }, res);
            }
          })
      }

    });
}

function getCharacterFeats(req, res) {
  canSend = true;

  const idx = req.body.idx_personaggio;

  DatabaseQueries.retrieve(`SELECT * FROM ArrayFeatItem WHERE idx_personaggio = '${idx}'`, (el) => el)
    .catch(err => {
      sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare i talenti dal database',
        success: false,
      },
        res
      );
    }).then(feats => {
      sendResponse({
        feats: feats,
        status_code: 200,
        success: true,
        message: 'Talenti caricati con successo'
      },
        res
      );
    });
}

function getCharacterSpells(req, res) {
  canSend = true;

  const idx = req.body.idx_personaggio;

  DatabaseQueries.retrieve(`SELECT * FROM ArraySpellItem WHERE idx_personaggio = '${idx}'`, (el) => el)
    .catch(err => {
      sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare gli incantesimi dal database',
        success: false,
      },
        res
      );
    }).then(spells => {
      let spellArray = []
      for (const spell of spells) {
        DatabaseQueries.retrieve(`SELECT * FROM Spell WHERE name = '${spell.item}'`, el => el)
          .catch(err => {
            console.log('\nSono nel secondo catch\n');
            sendResponse({
              status_code: 404,
              message: 'Non è stato possibile caricare gli incantesimi dal database',
              success: false,
            },
              res
            );
          })
          .then(spell => {
            spellArray.push(spell[0]);

            if (spellArray.length === spells.length) {
              sendResponse({
                spells: spellArray,
                status_code: 200,
                message: 'Incantesimi caricati con successo',
                success: true,
              }, res);
            }
          })
      }
    });
}

function getCharacters(req, res) {
  canSend = true;

  const email = UserInstance.USER.email;

  DatabaseQueries.retrieve(`SELECT * FROM Personaggio WHERE utente_generico = '${email}'`, el => el)
    .catch(err => {
      sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare i personaggi dal database',
        success: false,
      },
        res
      );
    }).then(characters => {
      sendResponse({
        characters: characters,
        status_code: 200,
        success: true,
        message: 'Personaggi caricati con successo'
      },
        res
      );
    });
}

async function deleteCharacter(req, res) {
  canSend = true;
  const idx = req.body.idx_personaggio;
  try {
    const deleteQuery = `BEGIN TRANSACTION;
      DELETE FROM ArraySpellItem WHERE idx_personaggio = '${idx}';
      DELETE FROM ArrayEquipmentItem WHERE idx_personaggio = '${idx}';
      DELETE FROM ArrayLanguageItem WHERE idx_personaggio = '${idx}';
      DELETE FROM ArrayStatsItem WHERE idx_personaggio = '${idx}';
      DELETE FROM ArrayProficienciesItem WHERE idx_personaggio = '${idx}';
      DELETE FROM ArrayFeatItem WHERE idx_personaggio = '${idx}';
      DELETE FROM Personaggio WHERE idx_personaggio = '${idx}';
      COMMIT;`
      ;
    await Database.execAll(deleteQuery);
    sendResponse({
      status_code: 200,
      success: true,
      message: 'il personaggio è stato eliminato con successo'
    },
      res
    );
  }
  catch (err) {
    console.log('debug eliminazione personaggio', err);
    try {
      await Database.execOne('ROLLBACK;');
    }
    finally {
      sendResponse({
        status_code: 500,
        success: false,
        message: 'la cancellazione del personaggio non è arrivata a buon fine'
      },
        res
      );
    }
  }
}

export async function loadSpells(req, res) {
  canSend = true;

  const limit = req.body.limit;
  const offset = req.body.offset;
  const regex = req.body.regex;
  const level = req.body.level;
  const className = req.body.className;
  const filters = [];
  const quotify = (s) => `'${s}'`;

  if (className !== undefined && className !== null && className !== '') {
    filters.push(`classes LIKE ${quotify('%' + className.toLowerCase() + '%')}`);
  }

  if (regex !== '') {
    filters.push(`name LIKE ${quotify(regex)}`);
  }

  if (level !== null && level !== undefined) {
    filters.push(`level = ${level}`);
  }

  const filter = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

  const query = `
    SELECT * FROM Spell
    ${filter}
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  try {
    const spells = await Database.queryAll(query);
    sendResponse({
      message: "Incantesimi ottenuti con successo",
      success: true,
      status_code: 200,
      spells: spells
    }, res);
  } catch (err) {
    sendResponse({
      message: "Impossibile ottenere gli incantesimi",
      success: false,
      status_code: 401
    }, res);
  }
}

export async function replaceSpell(req, res) {
  canSend = true;

  const idx_personaggio = req.body.idx_personaggio;
  const oldSpell = req.body.oldSpell;
  const newSpell = req.body.newSpell;

  const query = `
    UPDATE ArraySpellItem
    SET item = '${newSpell}'
    WHERE idx_personaggio = '${idx_personaggio}'
    AND item = '${oldSpell}'
  `;

  try {
    await Database.execOne(query);
    sendResponse({
      message: "Incantesimo sostituito con successo",
      success: true,
      status_code: 200
    }, res);
  } catch (err) {
    sendResponse({
      message: "Impossibile sostituire l'incantesimo",
      success: false,
      status_code: 401
    }, res);
  }
}

export async function updateCharacterStats(req, res) {
  canSend = true;

const idx_personaggio = req.body.idx_personaggio;
const health = req.body.health;
const speed = req.body.speed;
const size = req.body.size;
const image= req.body.image;

  try {
    const query = `
      UPDATE Personaggio
      SET punti_vita = '${health}',
          velocita = '${speed}',
          taglia = '${size}',
          imgURL = '${image}'
      WHERE idx_personaggio = '${idx_personaggio}'
    `;

    await Database.execOne(query);

    sendResponse({
      status_code: 200,
      success: true,
      message: 'Personaggio modificato con successo'
    }, res);

  } catch (err) {
    sendResponse({
      status_code: 500,
      success: false,
      message: 'Errore nella modifica del personaggio: ' + err.message
    }, res);
  }
};


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
  getAbilityScores,
  getCharacterByIdx,
  getCharacterAbilityScores,
  getCharacterProficiencies,
  getCharacterEquipment,
  getCharacterLanguages,
  getCharacterFeats,
  getCharacterSpells,
  getCharacters,
  deleteCharacter,
  loadSpells,
  replaceSpell,
  updateCharacterStats,
}