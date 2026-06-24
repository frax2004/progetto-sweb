import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonIcon, IonButton } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { PlayerCardComponent } from "src/app/components/player-card/player-card.component";
import { LabelComponent } from "src/app/components/label/label.component";
import { State } from 'src/app/core/state';
import { Alerts, currentGlobalCharacterName, defualtCharacterImgURL, encodeCampaign, Navigate } from 'src/app/core/core';
import { DatiGiocatore } from 'src/app/components/dati-giocatore';
import { DatiRichiesta } from 'src/app/components/dati-richiesta';
import { Button } from 'src/app/components/button/Button';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { CampagnaService } from 'src/app/services/campagna.service';
import { firstValueFrom } from 'rxjs';
import { alertController, AlertOptions, AlertInput, AlertButton } from '@ionic/core';
import { Router } from '@angular/router';
import { CharactersPage } from '../characters/characters.page';

@Component({
  selector: 'app-character-campaign-details',
  templateUrl: './character-campaign-details.page.html',
  styleUrls: ['./character-campaign-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ButtonComponent, IonLabel, IonItem, IonIcon, PlayerCardComponent, LabelComponent, IonButton]
})
export class CharacterCampaignDetailsPage implements OnInit {

  public campaign = State.currentCampaign;
  
  buttonCallbacks = {
    goBack: { onClick: Navigate.toPath(this.router,'character-campaign-chat')},
  };

  public get campaignName() {
    return this.campaign()?.nome;
  }

  public get campaignIdx() {
    return this.campaign()?.idx_campagna;
  }

  players = signal<DatiGiocatore[]>([]);

  Docs: boolean = false;
  
  DocButton: Button = { text: 'documenti', expand: 'block', color:'#ff0000' };
  
  DocContext: ButtonContext = {
    onClick: () => this.toggleDocs()
  };

  dungeonMaster = signal<string>("");
  toggleDocs() {
    this.Docs = !this.Docs;
  }

  public loadDungeonMaster = async () => {
    try {
      const res = await firstValueFrom<any>(this.campagnaService.getDungeonMasterName(this.campaign().idx_campagna));
      this.dungeonMaster.set(res.dungeonMaster);
    } catch(err) {
      Alerts.message(err);
    }
  };
  
  constructor(private campagnaService: CampagnaService, private router: Router) {
    this.loadInfo();
  }

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

  exitCampaignAlert = async () => {
    await (await alertController.create({
      header: 'Are you sure?',
      message: 'Exiting the campaign you won\'t be able to access it again.',
      buttons: [
        {
          text: 'Go back',
          role: 'cancel',
          cssClass: 'alertButton secondary',
        },
        {
          text: 'Yes',
          cssClass: 'alertButton',
          handler: (alertData) => {
            this.campagnaService.exitCampaign(this.campaignIdx)
            .subscribe({
              next: async (value: any) => {
                await this.router.navigate(['/characters']);
                await CharactersPage.CURRENT_INSTANCE.loadCampaigns();
                Alerts.personalizedMessage('You succesfully exited a campaign','Campaign exited');
              },
              error: (err) => Alerts.error(err.error)
            })
          }
        }
      ]
    })).present();
  }

  public loadPlayers = async () => {
    const res = await firstValueFrom<any>(this.campagnaService.loadCampaignPlayers(this.campaign()?.idx_campagna));

    const accepted = res.players
    .filter(pl => pl.stato === 'accepted')
    .map(CharacterCampaignDetailsPage.toAcceptedPlayer);
  
    this.players.set(accepted);
  }

  ngOnInit() {}

  public loadInfo = async () => {
    await this.loadPlayers();
    await this.loadDungeonMaster();
  };
}
