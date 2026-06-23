import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonInput, IonHeader, IonTitle, IonButton, IonText, IonToolbar,IonIcon, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter, AlertController,  } from '@ionic/angular/standalone';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from 'src/app/components/button/button.component';
import { firstValueFrom } from 'rxjs';
import { Button } from 'src/app/components/button/Button';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { Router, RouterLink } from '@angular/router';
import { DatiRichiesta } from 'src/app/components/dati-richiesta';
import { DatiGiocatore } from 'src/app/components/dati-giocatore';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { RequestCardComponent } from 'src/app/components/request-card/request-card.component';
import { LabelComponent } from 'src/app/components/label/label.component';
import { State } from 'src/app/core/state';
import { Alerts, defaultCampaignImageURL, defualtCharacterImgURL, encodeCampaign } from 'src/app/core/core';
import { CampagnaService } from 'src/app/services/campagna.service';
import { CampaignChatPage } from '../campaign-chat/campaign-chat.page';
import { CampaignsPage } from '../campaigns/campaigns.page';
import { ReportsService } from 'src/app/services/reports.service';


@Component({
  selector: 'app-dettagi-campagna',
  templateUrl: './dettagi-campagna.page.html',
  styleUrls: ['./dettagi-campagna.page.scss'],
  standalone: true,
  imports: [IonContent, LabelComponent ,IonHeader, IonButton, RequestCardComponent, IonIcon, PlayerCardComponent ,IonTitle, IonToolbar, CommonModule, FormsModule, AccordionComponent, TextAreaComponent, ButtonComponent, RouterLink, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter, IonInput, IonText, AccordionComponent, ButtonComponent]
})
export class DettagiCampagnaPage implements OnInit {

  public campaign = State.currentCampaign;

  public get campaignCode() {
    return encodeCampaign(this.campaign().idx_campagna);
  }
  
  public get campaignName() {
    return this.campaign().nome;
  }

  public goBack = async (e: Event) => {
    await this.router.navigate(["/campaign-chat"]);
    await CampaignChatPage.CURRENT_PAGE.loadPlayers();
  }

  players = signal<DatiGiocatore[]>([]);
  requested = signal<DatiRichiesta[]>([]);
  dungeonMaster = signal<string>("");

  Docs: boolean = false;

  DocButton: Button = { text: 'documenti', expand: 'block', color:'#ff0000' };

  DocContext: ButtonContext = {
    onClick: () => this.toggleDocs()
  };

  toggleDocs() {
    this.Docs = !this.Docs;
  }

  public loadInfo = async () => {
    await this.loadPlayers();
    await this.loadDungeonMaster();
  };

  public loadDungeonMaster = async () => {
    try {
      const res = await firstValueFrom<any>(this.campagnaService.getDungeonMasterName(this.campaign().idx_campagna));
      this.dungeonMaster.set(res.dungeonMaster);
    } catch(err) {
      Alerts.message(err);
    }
  };
  
  constructor(private campagnaService: CampagnaService, private router: Router, private alertCtrl: AlertController, private reportService: ReportsService) {
    this.loadInfo();
  }

  public deleteCampaign = async (_: Event) => {
    
    const alert = await this.alertCtrl.create({
      header: 'Conferma eliminazione',
      message: 'Vuoi davvero eliminare questa campagna?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel' 
        },
        {
          text: 'Elimina',
          role: 'destructive',
          handler: async () => {
            const result = this.campagnaService.deleteCampaign(this.campaign().idx_campagna);
            try {
              await firstValueFrom(result);
              CampaignsPage.CURRENT_PAGE.loadCampaigns();
              await this.router.navigate(["/campaigns"]);
              Alerts.good("Campagna eliminata con successo!");
            } catch(err) {
              Alerts.error(err.error);
            }
          }
        }
      ]
    });

    await alert.present(); 
  };

  public static toPendingPlayer = function (pl: any): DatiRichiesta {
    return {
      giocatore: {
        nome: pl.nome,
        classe: pl.classe,
        livello: pl.livello,
        razza: pl.specie,
        profilo: pl.utente_generico,
        immagine: pl.imgURL ?? defaultCampaignImageURL
      },
      stato: 'pending'
    }
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

  public kickPlayer = async (player: DatiGiocatore) => {
    const alert = await this.alertCtrl.create({
      header: 'Conferma espulsione',
      message: 'Vuoi davvero espellere questo giocatore dalla campagna?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel' 
        },
        {
          text: 'Conferma',
          role: 'destructive',
          handler: async () => {
            const handle = this.campagnaService.removePlayer({
              campaign_idx: this.campaign().idx_campagna, 
              player_idx: `${player.nome} @ (giocatore): ${player.profilo}`, 
            });
            try {
              await firstValueFrom(handle);
              await this.loadPlayers();
              Alerts.good("Giocatore espulso con successo");
            } catch(err) {
              Alerts.error(err.error);
            }
          }
        }
      ]
    });

    await alert.present(); 
  };

  public presentReportDescriptionAlert = async (reason: string, player: DatiGiocatore) => {
    const alert = await this.alertCtrl.create({
      header: 'Report this player: Reason',
      inputs: [
        {
          cssClass: 'alertInput',
          placeholder: 'Tell us the problem',
          type: 'text',
          name: 'descInput'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertButton secondary',
        },
        {
          text: 'Send Report',
          cssClass: 'alertButton',
          handler: data => this.submitReport({
            tipo: reason, 
            quando: new Date().toISOString(),
            tipo_contenuto: 'content',
            contenuto: `The player "${player.nome} @ ${player.profilo}" was reported for this reason: ${data.descInput}`,
          })
        }
      ]
    });

    await alert.present();
  };

  public submitReport = async (report: {tipo: string, quando: string, tipo_contenuto: string, contenuto: string}) => {
    const handle = this.reportService.createReport(report);

    try {
      const response = await firstValueFrom<any>(handle);
      Alerts.good(response.message);
    } catch(err) {
      Alerts.error(err.error);
    }
  };

  public reportPlayer = async (player: DatiGiocatore) => {
    const alert = await this.alertCtrl.create({
      header: 'Report this player: Reason',
      inputs: [
        {
          cssClass: 'alertInput',
          value: 'inappropriate',
          label:  'inappropriate',
          type: 'radio'
        },
        {
          cssClass: 'alertInput',
          value: 'explicit',
          label:  'explicit',
          type: 'radio'
        },
        {
          cssClass: 'alertInput',
          value: 'offensive',
          label:  'offensive',
          type: 'radio',
          checked: true
        },
        {
          cssClass: 'alertInput',
          value: 'cheat',
          label:  'cheat',
          type: 'radio'
        },
        {
          cssClass: 'alertInput',
          value: 'other',
          label: 'other',
          type: 'radio',
        },
      ],
      buttons: [
        {
          text: 'Next',
          cssClass: 'alertButton',
          handler: reason => this.presentReportDescriptionAlert(reason, player)
        }
      ]
    });

    await alert.present();
  };

  public acceptRequest = async (request: DatiRichiesta) => {
    const handle = this.campagnaService.acceptPlayer({
      campaign_idx: this.campaign().idx_campagna, 
      player_idx: `${request.giocatore.nome} @ (giocatore): ${request.giocatore.profilo}`, 
    });

    try {
      await firstValueFrom(handle);
      await this.loadPlayers();
    } catch(err) {
      Alerts.error(err.error);
    }
  };

  public rejectRequest = async (request: DatiRichiesta) => {
    const handle = this.campagnaService.removePlayer({
      campaign_idx: this.campaign().idx_campagna, 
      player_idx: `${request.giocatore.nome} @ (giocatore): ${request.giocatore.profilo}`, 
    });

    try {
      await firstValueFrom(handle);
      await this.loadPlayers();
    } catch(err) {
      Alerts.error(err.error);
    }

  };


  public loadPlayers = async () => {
    try {
      const res = await firstValueFrom<any>(this.campagnaService.loadCampaignPlayers(this.campaign().idx_campagna));
    
      const pending = res.players
      .filter(pl => pl.stato === 'pending')
      .map(DettagiCampagnaPage.toPendingPlayer);
  
      const accepted = res.players
      .filter(pl => pl.stato === 'accepted')
      .map(DettagiCampagnaPage.toAcceptedPlayer);
  
      this.players.set(accepted);
      this.requested.set(pending);

    } catch(err) {
      Alerts.message(err);
    }

  }

  ngOnInit() {}

}
