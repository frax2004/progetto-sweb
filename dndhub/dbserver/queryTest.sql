
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
      'simone.parisi92@gmail.eu',
      'Maicol mecduarf',
      220,
      6,
      'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
      'paladin',
      'devotion',
      'dwarf',
      'hill-dwarf',
      'acolyte',
      20,
      15,
      12,
      null,
      4,
      3,
      3,
      3,
      2,
      null,
      null,
      null,
      null,
      25,
      'Medium',
      'Shelter of the Faithful',
      'https://darksouls.wiki.fextralife.com/file/Dark-Souls/smough.jpg'
      );
      
      
      INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Bless',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        0
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Command',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        1
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Cure Wounds',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        2
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Detect Evil and Good',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        3
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Detect Magic',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        4
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Detect Poison and Disease',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        5
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Divine Favor',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        6
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Protection from Poison',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        7
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Prayer of Healing',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        8
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Revivify',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        9
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Aura of Life',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        10
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Dispel Evil and Good',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        11
      );
          ;
  
      INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        0
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        1
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'chain-mail',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        2
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        3
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        4
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'greataxe',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        5
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'shield',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        6
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'spear',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        7
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'explorer’s-pack',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        8
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'holy-symbols',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        9
      );;
  
      INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        0
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'dwarvish',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        1
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'infernal',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        2
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'undercommon',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        3
      );;
  
      INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'str',
        16,
        3,
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        0
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'dex',
        14,
        2,
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        1
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'con',
        12,
        1,
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        2
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'int',
        6,
        -2,
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        3
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'wis',
        13,
        1,
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        4
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'cha',
        15,
        2,
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        5
      );;
      
      INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'all armor',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        0
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'shields',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        1
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'simple weapons',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        2
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'martial weapons',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        3
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: insight',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        4
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: religion',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        5
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: wisdom',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        6
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: charisma',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        7
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: religion',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        8
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: intimidation',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        9
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'darkvision',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'dwarven-resilience',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'stonecunning',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        2
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'dwarven-combat-training',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        3
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'tool-proficiency',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        4
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-sense',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'lay-on-hands',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'paladin-fighting-style',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        2
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'spellcasting-paladin',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        3
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-smite',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        4
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-health',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        5
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'sacred-oath',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        6
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'oath-spells',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        7
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'channel-divinity',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        8
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'paladin-extra-attack',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        9
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'aura-of-protection',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        10
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'sacred-oath-improvement-1',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        11
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'aura-of-courage',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        12
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'improved-divine-smite',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        13
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'cleansing-touch',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        14
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'sacred-oath-improvement-2',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        15
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'aura-improvements',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        16
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'sacred-oath-improvement-3',
        'Maicol mecduarf @ (giocatore): simone.parisi92@gmail.eu',
        17
      );;
      
      COMMIT;
      