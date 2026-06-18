
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
      'Talion',
      65,
      3,
      'Talion @ gianluca.ferri44@edu.ru',
      'paladin',
      'devotion',
      'half-elf',
      null,
      'acolyte',
      5,
      15,
      7,
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
        'Heroism',
        'Talion @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Protection from Poison',
        'Talion @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Prayer of Healing',
        'Talion @ gianluca.ferri44@edu.ru',
        2
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Lesser Restoration',
        'Talion @ gianluca.ferri44@edu.ru',
        3
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Detect Evil and Good',
        'Talion @ gianluca.ferri44@edu.ru',
        4
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Cure Wounds',
        'Talion @ gianluca.ferri44@edu.ru',
        5
      );
INSERT OR IGNORE INTO ArraySpellItem (item,idx_personaggio,array_idx) VALUES (
        'Command',
        'Talion @ gianluca.ferri44@edu.ru',
        6
      );
          ;
  
      INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Talion @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Talion @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'chain-mail',
        'Talion @ gianluca.ferri44@edu.ru',
        2
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'clothes-common',
        'Talion @ gianluca.ferri44@edu.ru',
        3
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'pouch',
        'Talion @ gianluca.ferri44@edu.ru',
        4
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'morningstarshield',
        'Talion @ gianluca.ferri44@edu.ru',
        5
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'dagger',
        'Talion @ gianluca.ferri44@edu.ru',
        6
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'explorer’s pack',
        'Talion @ gianluca.ferri44@edu.ru',
        7
      );
INSERT OR IGNORE INTO ArrayEquipmentItem (item,idx_personaggio,array_idx) VALUES (
        'holy symbols',
        'Talion @ gianluca.ferri44@edu.ru',
        8
      );;
  
      INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'common',
        'Talion @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'elvish',
        'Talion @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'orc',
        'Talion @ gianluca.ferri44@edu.ru',
        2
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'sylvan',
        'Talion @ gianluca.ferri44@edu.ru',
        3
      );
INSERT OR IGNORE INTO ArrayLanguageItem (item,idx_personaggio,array_idx) VALUES (
        'undercommon',
        'Talion @ gianluca.ferri44@edu.ru',
        4
      );;
  
      INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'str',
        18,
        4,
        'Talion @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'dex',
        6,
        -2,
        'Talion @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'con',
        17,
        3,
        'Talion @ gianluca.ferri44@edu.ru',
        2
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'int',
        14,
        2,
        'Talion @ gianluca.ferri44@edu.ru',
        3
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'wis',
        13,
        1,
        'Talion @ gianluca.ferri44@edu.ru',
        4
      );
INSERT OR IGNORE INTO ArrayStatsItem (stat_idx,stat_value,stat_modifier,idx_personaggio,array_idx) VALUES (
        'cha',
        20,
        5,
        'Talion @ gianluca.ferri44@edu.ru',
        5
      );;
      
      INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'all armor',
        'Talion @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'shields',
        'Talion @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'simple weapons',
        'Talion @ gianluca.ferri44@edu.ru',
        2
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'martial weapons',
        'Talion @ gianluca.ferri44@edu.ru',
        3
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: wisdom',
        'Talion @ gianluca.ferri44@edu.ru',
        4
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'saving throw: charisma',
        'Talion @ gianluca.ferri44@edu.ru',
        5
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: athletics',
        'Talion @ gianluca.ferri44@edu.ru',
        6
      );
INSERT OR IGNORE INTO ArrayProficienciesItem (proficiency,idx_personaggio,array_idx) VALUES (
        'skill: intimidation',
        'Talion @ gianluca.ferri44@edu.ru',
        7
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'darkvision',
        'Talion @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'fey-ancestry',
        'Talion @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'skill-versatility',
        'Talion @ gianluca.ferri44@edu.ru',
        2
      );;
  
      INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-sense',
        'Talion @ gianluca.ferri44@edu.ru',
        0
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'lay-on-hands',
        'Talion @ gianluca.ferri44@edu.ru',
        1
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'paladin-fighting-style',
        'Talion @ gianluca.ferri44@edu.ru',
        2
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'spellcasting-paladin',
        'Talion @ gianluca.ferri44@edu.ru',
        3
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-smite',
        'Talion @ gianluca.ferri44@edu.ru',
        4
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'divine-health',
        'Talion @ gianluca.ferri44@edu.ru',
        5
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'sacred-oath',
        'Talion @ gianluca.ferri44@edu.ru',
        6
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'oath-spells',
        'Talion @ gianluca.ferri44@edu.ru',
        7
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'channel-divinity',
        'Talion @ gianluca.ferri44@edu.ru',
        8
      );
INSERT OR IGNORE INTO ArrayFeatItem (item,idx_personaggio,array_idx) VALUES (
        'paladin-extra-attack',
        'Talion @ gianluca.ferri44@edu.ru',
        9
      );;
      
      COMMIT;
      