
export class AuthResponses {
  static get ILLEGAL_PASSWORD() {
    return {
      status_code: 401,
      message: `La password inserita non è valida`,
      success: false,
    };
  }

  static get ILLEGAL_USERNAME() {
    return {
      status_code: 401,
      message: `Il nome utente inserito non è valido.`,
      success: false,
    };
  }

  static get ILLEGAL_EMAIL() {
    return {
      status_code: 401,
      message: `L'indirizzo email inserito non è valido.`,
      success: false,
    };
  }

  static get EMAIL_NOT_PRESENT() {
    return {
      status_code: 401,
      success: false,
      message: "L'indirizzo email inserito non è registrato."
    };
  }

  static get UNABLE_TO_GET_USER_INFOS() {
    return {
      status_code: 401,
      success: false,
      message: `Non è stato possibile ottenere le informazioni circa l'account specificato.`
    };
  }

  static get INCORRECT_PASSWORD() {
    return {
      success: false,
      status_code: 401,
      message: "La password inserita non è corretta."
    };
  }

  static get USER_SIGNIN_FAILURE() {
    return {
      success: false,
      status_code: 401,
      message: 'Impossibile registrare l\'utente'
    };
  }

  static get USER_ALREADY_SIGNEDIN() {
    return {
      success: false,
      status_code: 401,
      message: 'L\'utente specificato è già registrato, provare ad accedere.'
    };
  }

  static loginResponse(user_token, player_token, dm_token) {
    return {
      status_code: 200,
      message: 'Login effettuato con successo.',
      success: true,
      generic_token: user_token,
      player_token: player_token, 
      dm_token: dm_token, 
    };
  }

  static signinResponse(user_token, player_token, dm_token) {
    return {
      success: false,
      status_code: 200,
      message: 'Registrazione avvenuta con successo.',
      generic_token: user_token,
      player_token: player_token,
      dm_token: dm_token
    };
  }
}