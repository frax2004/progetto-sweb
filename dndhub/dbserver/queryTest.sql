
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
      'giovanniDM@gmail.com',
      'Trapezio',
      56,
      3,
      'Trapezio @ (giocatore): giovanniDM@gmail.com',
      'warlock',
      'fiend',
      'tiefling',
      null,
      'acolyte',
      7,
      15,
      8,
      3,
      0,
      0,
      0,
      2,
      0,
      0,
      0,
      0,
      0,
      30,
      'Medium',
      'Shelter of the Faithful',
      null
      );
      
      
      INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Hex',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Illusory Script',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Unseen Servant',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Misty Step',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Invisibility',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Fly',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Magic Circle',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Blight',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        7
      );
          INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Mage Hand',
          'Trapezio @ (giocatore): giovanniDM@gmail.com',
          8
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Chill Touch',
          'Trapezio @ (giocatore): giovanniDM@gmail.com',
          9
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Prestidigitation',
          'Trapezio @ (giocatore): giovanniDM@gmail.com',
          10
        );;
  
      INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'dagger',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'leather-armor',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'club',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'arcane-focus',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'scholar’s-pack',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        8
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'mace',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        9
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'holy-symbols',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        10
      );;
  
      INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'infernal',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'deep-speech',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'thieves-cant',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        3
      );;
  
      INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'str',
        8,
        -1,
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'dex',
        12,
        1,
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'con',
        16,
        3,
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'int',
        16,
        3,
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'wis',
        14,
        2,
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'cha',
        19,
        4,
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        5
      );;
      
      INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'light armor',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'simple weapons',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: insight',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: religion',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: wisdom',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: charisma',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: nature',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: history',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        7
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'darkvision',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'hellish-resistance',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'infernal-legacy',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        2
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'otherworldly-patron',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'pact-magic',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'eldritch-invocations',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'pact-boon',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'otherworldly-patron-improvement-1',
        'Trapezio @ (giocatore): giovanniDM@gmail.com',
        4
      );;
      
      COMMIT;
      