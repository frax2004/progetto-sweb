import jwt from 'jsonwebtoken';


export class UserInstance {
  generic_token = "";
  player_token = "";
  dm_token = "";
  current_token = undefined;
  static __USER__ = null;

  constructor(genericToken, playerToken, dmToken) {
    this.generic_token = genericToken;
    this.player_token = playerToken;
    this.dm_token = dmToken;
  }

  get generic_user_token() {
    return this.generic_token;
  }

  set generic_user_token(token) {
    this.generic_token = token;
  }

  get player_token() {
    return this.player_token;
  }

  set player_token(token) {
    this.player_token = token;
  }

  get dungeon_master_token() {
    return this.dm_token;
  }

  set dungeon_master_token(token) {
    this.dm_token = token;
  }

  get email() {
    return jwt.decode(this.generic_token).email;
  }

  get player_id() {
    return jwt.decode(this.player_token).id;
  }

  get dm_id() {
    return jwt.decode(this.dm_token).id;
  }

  static getPlayerId(email) {
    return `(giocatore): ${email}`;
  }

  get current() {
    return this.current_token;
  }

  set current(token) {
    this.current_token = token;
  }

  static getDmId(email) {
    return `(dungeon_master): ${email}`;
  }

  get info() {
    return JSON.stringify({
      email: this.email,
      dm_token: this.dm_token,
      player_token: this.player_token,
      generic_token: this.generic_token,
      player_id: this.player_id,
      dm_id: this.dm_id,
    }, null, 2);
  }

  static get USER() {
    return UserInstance.__USER__;
  }

  static set USER(user) {
    UserInstance.__USER__ = user;
  }

}

export function decodeCampaign(hashcode) {
  const decoder = ch => ch - 8;
  return Buffer.from(hashcode).map(decoder).toString();
}

export const generateToken = (body) => jwt.sign(
  body, 
  JWT_SECRET, 
  { expiresIn: '24h' }
);

export const JWT_SECRET = 'filafiabeelamagamago';

