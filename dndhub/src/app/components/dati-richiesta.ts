import { DatiGiocatore } from "./dati-giocatore";

export interface DatiRichiesta {
  giocatore: DatiGiocatore;
  stato: 'pending' | 'accepted' | 'rejected';
}
