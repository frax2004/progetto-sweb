
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
      'gianluca.ferri44@edu.ru',
      'Carlos',
      32,
      3,
      'Carlos @ gianluca.ferri44@edu.ru',
      'paladin',
      'devotion',
      'half-elf',
      null,
      'acolyte',
      5,
      15,
      2,
      null,
      4,
      2,
      0,
      0,
      0,
      null,
      null,
      null,
      null,
      30,
      'Medium',
      'Shelter of the Faithful',
      null
      );
      
      
      INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Bless',
        'Carlos @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Command',
        'Carlos @ gianluca.ferri44@edu.ru',
        1
      );
          ;
  
      INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Carlos @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Carlos @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'chain-mail',
        'Carlos @ gianluca.ferri44@edu.ru',
        2
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Carlos @ gianluca.ferri44@edu.ru',
        3
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Carlos @ gianluca.ferri44@edu.ru',
        4
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'battleaxe',
        'Carlos @ gianluca.ferri44@edu.ru',
        5
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'shield',
        'Carlos @ gianluca.ferri44@edu.ru',
        6
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'mace',
        'Carlos @ gianluca.ferri44@edu.ru',
        7
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'explorer’s pack',
        'Carlos @ gianluca.ferri44@edu.ru',
        8
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'holy symbols',
        'Carlos @ gianluca.ferri44@edu.ru',
        9
      );;
  
      INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common',
        'Carlos @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'elvish',
        'Carlos @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'halfling',
        'Carlos @ gianluca.ferri44@edu.ru',
        2
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common',
        'Carlos @ gianluca.ferri44@edu.ru',
        3
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'celestial',
        'Carlos @ gianluca.ferri44@edu.ru',
        4
      );;
  
      INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'str',
        14,
        2,
        'Carlos @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'dex',
        14,
        2,
        'Carlos @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'con',
        11,
        0,
        'Carlos @ gianluca.ferri44@edu.ru',
        2
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'int',
        11,
        0,
        'Carlos @ gianluca.ferri44@edu.ru',
        3
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'wis',
        11,
        0,
        'Carlos @ gianluca.ferri44@edu.ru',
        4
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'cha',
        10,
        0,
        'Carlos @ gianluca.ferri44@edu.ru',
        5
      );;
      
      INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'all armor',
        'Carlos @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'shields',
        'Carlos @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'simple weapons',
        'Carlos @ gianluca.ferri44@edu.ru',
        2
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'martial weapons',
        'Carlos @ gianluca.ferri44@edu.ru',
        3
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: wisdom',
        'Carlos @ gianluca.ferri44@edu.ru',
        4
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: charisma',
        'Carlos @ gianluca.ferri44@edu.ru',
        5
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: religion',
        'Carlos @ gianluca.ferri44@edu.ru',
        6
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: persuasion',
        'Carlos @ gianluca.ferri44@edu.ru',
        7
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'darkvision',
        'Carlos @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'fey-ancestry',
        'Carlos @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'skill-versatility',
        'Carlos @ gianluca.ferri44@edu.ru',
        2
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-sense',
        'Carlos @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'lay-on-hands',
        'Carlos @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'paladin-fighting-style',
        'Carlos @ gianluca.ferri44@edu.ru',
        2
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'spellcasting-paladin',
        'Carlos @ gianluca.ferri44@edu.ru',
        3
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-smite',
        'Carlos @ gianluca.ferri44@edu.ru',
        4
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-health',
        'Carlos @ gianluca.ferri44@edu.ru',
        5
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'sacred-oath',
        'Carlos @ gianluca.ferri44@edu.ru',
        6
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'oath-spells',
        'Carlos @ gianluca.ferri44@edu.ru',
        7
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'channel-divinity',
        'Carlos @ gianluca.ferri44@edu.ru',
        8
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'paladin-extra-attack',
        'Carlos @ gianluca.ferri44@edu.ru',
        9
      );;
      
      COMMIT;
      