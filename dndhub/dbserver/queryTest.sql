
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
      'Carletto',
      21,
      2,
      'Carletto @ (giocatore): giovanniDM@gmail.com',
      'wizard',
      'evocation',
      'human',
      null,
      'acolyte',
      3,
      15,
      6,
      3,
      4,
      2,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      30,
      'Medium',
      'Shelter of the Faithful',
      'https://i.pinimg.com/736x/bd/7d/f5/bd7df538f42aaa4b95634cbffefb2d6b.jpg'
      );
      
      
      INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Charm Person',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Ray of Sickness',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Unseen Servant',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Flaming Sphere',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Enlarge/Reduce',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Ice Knife',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        5
      );
          INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Acid Splash',
          'Carletto @ (giocatore): giovanniDM@gmail.com',
          6
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Prestidigitation',
          'Carletto @ (giocatore): giovanniDM@gmail.com',
          7
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Elementalism',
          'Carletto @ (giocatore): giovanniDM@gmail.com',
          8
        );;
  
      INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'spellbook',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'quarterstaff',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'arcane-focus',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'scholar’s-pack',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'holy-symbols',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        8
      );;
  
      INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'goblin',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'sylvan',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'thieves-cant',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        3
      );;
  
      INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'str',
        9,
        -1,
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'dex',
        14,
        2,
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'con',
        13,
        1,
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'int',
        16,
        3,
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'wis',
        15,
        2,
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'cha',
        11,
        0,
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        5
      );;
      
      INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'daggers',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'darts',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'slings',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'quarterstaffs',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'crossbows, light',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: insight',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: religion',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: intelligence',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: wisdom',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        8
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: arcana',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        9
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: investigation',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        10
      );;
  
      ;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'spellcasting-wizard',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'arcane-recovery',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'arcane-tradition',
        'Carletto @ (giocatore): giovanniDM@gmail.com',
        2
      );;
      
      COMMIT;
      