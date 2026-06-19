
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
      'Maurone',
      22,
      2,
      'Maurone @ (giocatore): giovanniDM@gmail.com',
      'cleric',
      'life',
      'human',
      null,
      'acolyte',
      4,
      15,
      8,
      4,
      4,
      3,
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
      null
      );
      
      
      INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Warding Bond',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Enhance Ability',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Aid',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Inflict Wounds',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Detect Evil and Good',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Purify Food and Drink',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Shield of Faith',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Silence',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        7
      );
          INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Guidance',
          'Maurone @ (giocatore): giovanniDM@gmail.com',
          8
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Light',
          'Maurone @ (giocatore): giovanniDM@gmail.com',
          9
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Mending',
          'Maurone @ (giocatore): giovanniDM@gmail.com',
          10
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Resistance',
          'Maurone @ (giocatore): giovanniDM@gmail.com',
          11
        );;
  
      INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'shield',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'mace',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'scale mail',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'handaxe',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'explorer’s pack',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        8
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'holy symbols',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        9
      );;
  
      INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'celestial',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'sylvan',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'undercommon',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        3
      );;
  
      INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'str',
        15,
        2,
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'dex',
        9,
        -1,
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'con',
        11,
        0,
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'int',
        14,
        2,
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'wis',
        18,
        4,
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'cha',
        13,
        1,
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        5
      );;
      
      INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'light armor',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'medium armor',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'shields',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'simple weapons',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: wisdom',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: charisma',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: religion',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: medicine',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        7
      );;
  
      ;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'spellcasting-cleric',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-domain',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'domain-spells-1',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'channel-divinity-1-rest',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'channel-divinity-turn-undead',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-domain-improvement-1',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'domain-spells-2',
        'Maurone @ (giocatore): giovanniDM@gmail.com',
        6
      );;
      
      COMMIT;
      