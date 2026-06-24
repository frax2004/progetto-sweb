
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
      'Prova cambia incantesimi',
      11,
      2,
      'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
      'cleric',
      'life',
      'elf',
      'high-elf',
      'acolyte',
      3,
      15,
      4,
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
      null
      );
      
      
      INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Bane',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Bless',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Create or Destroy Water',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Command',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        3
      );
          INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Guidance',
          'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
          4
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Light',
          'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
          5
        );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
          'Mending',
          'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
          6
        );;
  
      INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'shield',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'a-warhammer',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'scale-mail',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'club',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'priest’s-pack',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        8
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'holy-symbols',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        9
      );;
  
      INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'elvish',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common-sign-language',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'draconic',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        3
      );;
  
      INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'str',
        12,
        1,
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'dex',
        16,
        3,
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'con',
        7,
        -2,
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'int',
        17,
        3,
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'wis',
        12,
        1,
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'cha',
        12,
        1,
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        5
      );;
      
      INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'light armor',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'medium armor',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'shields',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'simple weapons',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: insight',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: religion',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: wisdom',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        6
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: charisma',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        7
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: history',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        8
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: insight',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        9
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'darkvision',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'fey-ancestry',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'trance',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'keen-senses',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        3
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'spellcasting-cleric',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-domain',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'domain-spells-1',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        2
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'channel-divinity-1-rest',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        3
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'channel-divinity-turn-undead',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        4
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-domain-improvement-1',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        5
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'domain-spells-2',
        'Prova cambia incantesimi @ (giocatore): Peppe@gmail.com',
        6
      );;
      
      COMMIT;
      