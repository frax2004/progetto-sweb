import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonIcon } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { PlayerCardComponent } from "src/app/components/player-card/player-card.component";
import { LabelComponent } from "src/app/components/label/label.component";
import { State } from 'src/app/core/state';
import { defualtCharacterImgURL, encodeCampaign } from 'src/app/core/core';
import { DatiGiocatore } from 'src/app/components/dati-giocatore';
import { DatiRichiesta } from 'src/app/components/dati-richiesta';
import { Button } from 'src/app/components/button/Button';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { CampagnaService } from 'src/app/services/campagna.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-character-campaign-details',
  templateUrl: './character-campaign-details.page.html',
  styleUrls: ['./character-campaign-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ButtonComponent, IonLabel, IonItem, IonIcon, PlayerCardComponent, LabelComponent]
})
export class CharacterCampaignDetailsPage implements OnInit {

  public campaign = State.currentCampaign;

  public get campaignCode() {
    return encodeCampaign(this.campaign()?.idx_campagna ?? 'Secrets-of-the-Shattered-Isles @ (dungeon_master): pino.gerardi88@microsoft.ru');
  }
  
  public get campaignName() {
    return this.campaign()?.nome ?? 'Secrets-of-the-Shattered-Isles';
  }

  players = signal<DatiGiocatore[]>([]);

  Docs: boolean = false;
  
  DocButton: Button = { text: 'documenti', expand: 'block', color:'#ff0000' };
  
  DocContext: ButtonContext = {
    onClick: () => this.toggleDocs()
  };

  toggleDocs() {
    this.Docs = !this.Docs;
  }

  constructor(private campagnaService: CampagnaService) { }

  public static toAcceptedPlayer = function (pl: any): DatiGiocatore {
    return {
      nome: pl.nome,
      classe: pl.classe,
      livello: pl.livello,
      razza: pl.specie,
      profilo: pl.utente_generico,
      immagine: pl.imgURL ?? defualtCharacterImgURL
    }
  }


  public loadPlayers = async () => {
    const res = await firstValueFrom<any>(this.campagnaService.loadCampaignPlayers(this.campaign()?.idx_campagna ?? 'Secrets-of-the-Shattered-Isles @ (dungeon_master): pino.gerardi88@microsoft.ru'));
  
    console.log(JSON.stringify(res, null, 2));
  
    const accepted = res.players
    .filter(pl => pl.stato === 'accepted')
    .map(CharacterCampaignDetailsPage.toAcceptedPlayer);
  
    this.players.set(accepted);
  }

  ngOnInit() {
    this.loadPlayers();
  }

}
