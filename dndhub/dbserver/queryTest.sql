
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
      'francesco.marzano25@microsoft.eu',
      'Charlie Kirk',
      240,
      6,
      'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
      'fighter',
      'champion',
      'dragonborn',
      null,
      'acolyte',
      20,
      15,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      30,
      'Medium',
      'Shelter of the Faithful',
      'https://i.pinimg.com/736x/1e/92/9d/1e929d6b18f10aed40264dd02362aef4.jpg'
      );
      
      
      ;
  
      INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        0
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        1
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        2
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        3
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'chain-mail',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        4
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'maul',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        5
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'shield',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        6
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'light-crossbow',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        7
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'dungeoneer’s-pack',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        8
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'holy-symbols',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        9
      );;
  
      INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        0
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'draconic',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        1
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'goblin',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        2
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'sylvan',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        3
      );;
  
      INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'str',
        20,
        5,
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        0
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'dex',
        12,
        1,
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        1
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'con',
        14,
        2,
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        2
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'int',
        15,
        2,
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        3
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'wis',
        15,
        2,
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        4
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'cha',
        9,
        -1,
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        5
      );;
      
      INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'all armor',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        0
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'shields',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        1
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'simple weapons',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        2
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'martial weapons',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        3
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: insight',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        4
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: religion',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        5
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: strength',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        6
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: constitution',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        7
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: history',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        8
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: insight',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        9
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'draconic-ancestry',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'breath-weapon',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'damage-resistance',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        2
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'fighter-fighting-style',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'second-wind',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'action-surge-1-use',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        2
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'martial-archetype',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        3
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'extra-attack-1',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        4
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'martial-archetype-improvement-1',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        5
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'indomitable-1-use',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        6
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'martial-archetype-improvement-2',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        7
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'extra-attack-2',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        8
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'indomitable-2-uses',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        9
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'martial-archetype-improvement-3',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        10
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'action-surge-2-uses',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        11
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'indomitable-3-uses',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        12
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'martial-archetype-improvement-4',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        13
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'extra-attack-3',
        'Charlie Kirk @ (giocatore): francesco.marzano25@microsoft.eu',
        14
      );;
      
      COMMIT;
      