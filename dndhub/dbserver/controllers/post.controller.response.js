export class PostsResponses {
  
  static get POSTS_FETCH_ERROR() {
    return {
      status_code: 500,
      success: false,
      message: "Errore nel recupero dei post della campagna",
    };
  }

  static get CONTENT_NOT_VALID(){
    return {
        status_code: 500,
        success:false,
        message:"Errore, il contenuto non è valido o è vuoto",
    };
  }

  static get TIMESTAMP_NOT_VALID(){
    return {
        status_code:500,
        success:false,
        message:"errore, il timestamp non è valido",
  };
}
   
   

  static get CAMPAGNA_NOT_FOUND(){
    return{
        status_code:500,
        success:false,
        message:"Errore, nessuna campagna trovata",
    };
  }

  static get GENERIC_DB_ERROR(){
    return {
        status_code:500,
        success:false,
        message:"Errore del database",
    };
  }

  static get IDX_CAMPAGNA_INVALID(){
    return {
        status_code:500,
        success:false,
        message: "l'indice della campagna non è valido",
    };
  }

  static get POSTS_FETCH_SUCCESS() {
    return {
      status_code: 200,
      success: true,
      message: "Post recuperati con successo",
    };
  }

  static get POST_CREATE_ERROR() {
    return {
      status_code: 500,
      success: false,
      message: "Errore nella creazione del post",
    };
  }

  static get POST_CREATE_SUCCESS() {
    return {
      status_code: 200,
      success: true,
      message: "Post creato con successo",
    };
  }

  static get POST_DELETE_ERROR() {
    return {
      status_code: 500,
      success: false,
      message: "Errore nella cancellazione del post",
    };
  }

  static get POST_DELETE_SUCCESS() {
    return {
      status_code: 200,
      success: true,
      message: "Post eliminato con successo",
    };
  }
}