export class CampagnaResponses {

  static get CAMPAIGN_ALREADY_EXISTS() {
    return {
      status_code: 400,
      success: false,
      message: "Campagna già esistente"
    };
  }

  static get CAMPAIGN_NAME_REQUIRED() {
    return {
      status_code: 400,
      success: false,
      message: "Il nome della campagna è obbligatorio"
    };
  }

  static CAMPAIGN_CREATED(idx_campagna, nome) {
    return {
      status_code: 201,
      success: true,
      message: "Campagna creata con successo",
      idx_campagna,
      nome
    };
  }


   static get DATABASE_ERROR(){
    return{
        status_code:400,
        success:false,
        message:"Errore del DB"
    }
   }


}