import jwt from 'jsonwebtoken';

class UserInstance {
  generic_token = "";
  player_token = "";
  dm_token = "";

  getEmail() {
    return jwt.decode(this.generic_token).email;
  }

  getPlayerId() {
    return jwt.decode(this.player_token).id;
  }

  getDmId() {
    return jwt.decode(this.dm_token).id;
  }

  static getPlayerId(email) {
    return `(giocatore): ${email}`;
  }

  static getDmId(email) {
    return `(dungeon_master): ${email}`;
  }

}

let USER = new UserInstance();



const JWT_SECRET = 'filafiabeelamagamago';


export default {
  UserInstance,
  USER,
  JWT_SECRET
}