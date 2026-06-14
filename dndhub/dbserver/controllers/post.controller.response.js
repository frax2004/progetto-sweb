export class PostsResponses {
  
  static get POSTS_FETCH_ERROR() {
    return {
      status_code: 500,
      success: false,
      message: "Errore nel recupero dei post della campagna",
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