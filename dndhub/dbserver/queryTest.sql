
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
      'Hernan',
      63,
      3,
      'Hernan @ gianluca.ferri44@edu.ru',
      'barbarian',
      'berserker',
      'half-orc',
      null,
      'acolyte',
      5,
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
      null
      );

      
      COMMIT;
      