import { DatiGiocatore } from "./dati-giocatore";

export interface DatiRichiesta {
  id_richiesta: number;
  giocatore: DatiGiocatore;
  stato: 'pending' | 'accepted' | 'rejected';
}
