
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
      'GianpieroTecnologia@gmail.com',
      'Messmer',
      14,
      2,
      'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
      'barbarian',
      null,
      'dwarf',
      'hill-dwarf',
      'acolyte',
      1,
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
      25,
      'Medium',
      'Shelter of the Faithful',
      'https://tse1.mm.bing.net/th/id/OIP.n2xvN_CRRRIz1Ile-rUNpwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'
      );
      
      
      ;
  
      INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'explorers-pack',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'javelin',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'greataxe',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'handaxe',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'holy-symbols',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        8
      );;
  
      INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'dwarvish',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'draconic',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common-sign-language',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        3
      );;
  
      INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'str',
        16,
        3,
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'dex',
        15,
        2,
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'con',
        15,
        2,
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'int',
        8,
        -1,
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'wis',
        15,
        2,
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'cha',
        9,
        -1,
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        5
      );;
      
      INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'light armor',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'medium armor',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'shields',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'simple weapons',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'martial weapons',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: insight',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: religion',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: strength',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: constitution',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        8
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: animal handling',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        9
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: athletics',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        10
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'darkvision',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'dwarven-resilience',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'stonecunning',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'dwarven-combat-training',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'tool-proficiency',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        4
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'rage',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'barbarian-unarmored-defense',
        'Messmer @ (giocatore): GianpieroTecnologia@gmail.com',
        1
      );;
      
      COMMIT;
      