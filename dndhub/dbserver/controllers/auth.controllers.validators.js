
export class AuthValidators {
  static assertPassword(pass, reporter) {
    const ok = pass !== undefined
    && pass !== null
    && pass.length >= 8
    && /[a-zA-Z_0-9@#$!?'\-]+/.test(pass)
    && /[A-Z]+/.test(pass)
    && /[a-z]+/.test(pass)
    && /[0-9]+/.test(pass);

    if(!ok) {
      reporter();
    }
  
    return ok;
  }
  
  static assertUsername(username, reporter) {
    const ok = username !== undefined
    && username !== null
    && username.length !== 0;
  
    if(!ok) {
      reporter();
    }
  
    return ok;
  }

  static assertEmail(email, reporter) {

    const ok = email !== undefined
    && email !== null
    && email.length !== 0
    && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    if(!ok) {
      reporter();
    }

    return ok;
  }
}