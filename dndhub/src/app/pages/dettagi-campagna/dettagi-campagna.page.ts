import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonInput, IonHeader, IonTitle, IonButton, IonText, IonToolbar,IonIcon, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter,  } from '@ionic/angular/standalone';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { Accordion } from 'src/app/components/accordion/Accordion';
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from 'src/app/components/button/button.component';
import { expand, firstValueFrom } from 'rxjs';
import { Button } from 'src/app/components/button/Button';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { RouterLink } from '@angular/router';
import { DatiRichiesta } from 'src/app/components/dati-richiesta';
import { DatiGiocatore } from 'src/app/components/dati-giocatore';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { RequestCardComponent } from 'src/app/components/request-card/request-card.component';
import { LabelComponent } from 'src/app/components/label/label.component';
import { State } from 'src/app/core/state';
import { defualtCharacterImgURL, encodeCampaign } from 'src/app/core/core';
import { CampagnaService } from 'src/app/services/campagna.service';


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

  players = signal<DatiGiocatore[]>([]);
  requested = signal<DatiRichiesta[]>([]);

  Docs: boolean = false;

  DocButton: Button = { text: 'documenti', expand: 'block', color:'#ff0000' };

  DocContext: ButtonContext = {
    onClick: () => this.toggleDocs()
  };

  toggleDocs() {
    this.Docs = !this.Docs;
  }

  
  constructor(private campagnaService: CampagnaService) {}

  public static toPendingPlayer = function (pl: any): DatiRichiesta {
    return {
      giocatore: {
        nome: pl.nome,
        classe: pl.classe,
        livello: pl.livello,
        razza: pl.specie,
        profilo: pl.utente_generico,
        immagine: pl.imgURL ?? defualtCharacterImgURL
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


  public loadPlayers = async () => {
    const res = await firstValueFrom<any>(this.campagnaService.loadCampaignPlayers(this.campaign().idx_campagna));

    console.log(JSON.stringify(res, null, 2));

    const pending = res.players
    .filter(pl => pl.stato === 'pending')
    .map(DettagiCampagnaPage.toPendingPlayer);

    const accepted = res.players
    .filter(pl => pl.stato === 'accepted')
    .map(DettagiCampagnaPage.toAcceptedPlayer);

    this.players.set(accepted);
    this.requested.set(pending);
  }

  ngOnInit() {
    this.loadPlayers();
  }

}
