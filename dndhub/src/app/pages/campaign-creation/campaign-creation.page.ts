import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonRow, IonCol, IonLabel, PopoverController, IonInput } from '@ionic/angular/standalone';
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from "src/app/components/button/button.component";
import { Popups } from 'src/app/core/core';
import { EntryComponent } from "src/app/components/entry/entry.component";
import { ScrollBarComponent } from "src/app/components/scrollbar/scrollbar.component";
import { CampagnaService } from 'src/app/services/campagna';

@Component({
  selector: 'app-campaign-creation',
  templateUrl: './campaign-creation.page.html',
  styleUrls: ['./campaign-creation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonGrid, IonRow, IonCol, IonLabel, TextAreaComponent, ButtonComponent, EntryComponent, IonInput, ScrollBarComponent]
})
export class CampaignCreationPage implements OnInit {
buttonCallbacks = {
  finishCreation: {
    onClick: () => this.creaCampagna()
  }
}


constructor(public popoverController: PopoverController ,private campagnaService: CampagnaService) {}

creaCampagna() {

  const data = {
    nome: this.nome,
    giocatori: this.giocatori,
    descrizione: this.descrizione,
    banner: this.banner,
    utente_dungeon_master: "email@utente.com"
  };

  this.campagnaService.createCampaign(data)
    .subscribe(res => {
      console.log("Campagna creata", res);
    });
}
  ngOnInit() {
  }
nome = '';
giocatori = '';
descrizione = '';
banner = '';
}
