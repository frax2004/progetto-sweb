
export class AuthQueries {
  static isSignedIn(email) {
    return `SELECT * FROM Account WHERE email = '${email}'`;
  }

  static getGenericUser(email) {
    return `SELECT * FROM UtenteGenerico WHERE account = '${email}'`;
  }

  static signIn(email, password, username) {
    return `INSERT OR IGNORE INTO Account (email, password, username) VALUES (
      '${email}', 
      '${password}', 
      '${username}'
    )`;
  }

  static insertGenericUser(email, playerId, dmId) {
    return `INSERT OR IGNORE INTO UtenteGenerico (account, utente_giocatore, utente_dungeon_master) VALUES (
      '${email}',
      '${playerId}',
      '${dmId}'
    )`;
  }
}