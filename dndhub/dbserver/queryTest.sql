
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
      'Peppe@gmail.com',
      'ELICRYA FINALE A  3 TESTE',
      140,
      6,
      'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
      'wizard',
      'evocation',
      'human',
      null,
      'acolyte',
      20,
      15,
      24,
      5,
      4,
      3,
      3,
      3,
      3,
      2,
      2,
      1,
      1,
      30,
      'Medium',
      'Shelter of the Faithful',
      null
      );
      
      
      INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Alarm',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Burning Hands',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Charm Person',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Chromatic Orb',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Color Spray',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Comprehend Languages',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Detect Magic',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Disguise Self',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Expeditious Retreat',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        8
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'False Life',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        9
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Feather Fall',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        10
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Find Familiar',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        11
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Fog Cloud',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        12
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Grease',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        13
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Ice Knife',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        14
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Identify',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        15
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Illusory Script',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        16
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Jump',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        17
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Longstrider',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        18
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Mage Armor',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        19
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Magic Missile',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        20
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Protection from Evil and Good',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        21
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Ray of Sickness',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        22
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Shield',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        23
      );
          INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Acid Splash',
          'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
          24
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Chill Touch',
          'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
          25
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Dancing Lights',
          'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
          26
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Elementalism',
          'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
          27
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Fire Bolt',
          'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
          28
        );;
  
      INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'spellbook',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'a-dagger',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'component-pouch',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'scholar’s-pack',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'holy-symbols',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        8
      );;
  
      INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'gnomish',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'dwarvish',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'draconic',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        3
      );;
  
      INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'str',
        13,
        1,
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'dex',
        14,
        2,
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'con',
        12,
        1,
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'int',
        19,
        4,
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'wis',
        10,
        0,
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'cha',
        15,
        2,
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        5
      );;
      
      INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'daggers',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'darts',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'slings',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'quarterstaffs',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'crossbows, light',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: insight',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: religion',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: intelligence',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: wisdom',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        8
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: arcana',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        9
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: history',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        10
      );;
  
      ;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'spellcasting-wizard',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'arcane-recovery',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'arcane-tradition',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'arcane-tradition-improvement-1',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'arcane-tradition-improvement-2',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'arcane-tradition-improvement-3',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'spell-mastery',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'signature-spell',
        'ELICRYA FINALE A  3 TESTE @ (giocatore): Peppe@gmail.com',
        7
      );;
      
      COMMIT;
      