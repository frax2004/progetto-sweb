
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
      'GIUSEPPEFINALE',
      10,
      2,
      'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
      'bard',
      null,
      'elf',
      'high-elf',
      'acolyte',
      1,
      15,
      4,
      2,
      2,
      0,
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
      'https://th.bing.com/th/id/OIP.wgZeLFUkX3E3fdh6noKC6AHaFj?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3'
      );
      
      
      INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Animal Friendship',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Bane',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Charm Person',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Color Spray',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Healing Word',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        4
      );
          INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Light',
          'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
          5
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Dancing Lights',
          'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
          6
        );;
  
      INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'leather-armor',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'dagger',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'rapier',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'diplomat’s-pack',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'lute',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        8
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'holy-symbols',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        9
      );;
  
      INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'elvish',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common-sign-language',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'draconic',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        3
      );;
  
      INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'str',
        9,
        -1,
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'dex',
        18,
        4,
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'con',
        14,
        2,
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'int',
        9,
        -1,
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'wis',
        8,
        -1,
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'cha',
        10,
        0,
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        5
      );;
      
      INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'light armor',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'simple weapons',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'longswords',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'rapiers',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'shortswords',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'hand crossbows',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: insight',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: religion',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: dexterity',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        8
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: charisma',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        9
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: acrobatics',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        10
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: animal handling',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        11
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: arcana',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        12
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'bagpipes',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        13
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'drum',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        14
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'dulcimer',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        15
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'darkvision',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'fey-ancestry',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'trance',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'keen-senses',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        3
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'spellcasting-bard',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'bardic-inspiration-d6',
        'GIUSEPPEFINALE @ (giocatore): Peppe@gmail.com',
        1
      );;
      
      COMMIT;
      