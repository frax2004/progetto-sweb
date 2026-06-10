import { UserInstance } from "../global.context.js";


export function isLogged(req, res, next) {
  if(UserInstance.USER !== undefined && UserInstance.USER !== null) {
    next();
  } else {
    res.status(401).json({
      status_code: 401,
      success: false,
      message: "L'utente non è attualmente autenticato",
    });
  }
}

export default {
  isLogged,
}