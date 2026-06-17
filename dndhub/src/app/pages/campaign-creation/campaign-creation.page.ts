import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonRow, IonCol, IonLabel, PopoverController, IonInput } from '@ionic/angular/standalone';
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from "src/app/components/button/button.component";
import { EntryComponent } from "src/app/components/entry/entry.component";
import { ScrollBarComponent } from "src/app/components/scrollbar/scrollbar.component";
import { CampagnaService } from 'src/app/services/campagna.service';
import { Alerts } from 'src/app/core/core';

@Component({
  selector: 'app-campaign-creation',
  templateUrl: './campaign-creation.page.html',
  styleUrls: ['./campaign-creation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonGrid, IonRow, IonCol, IonLabel, TextAreaComponent, ButtonComponent, EntryComponent, IonInput, ScrollBarComponent]
})
export class CampaignCreationPage implements OnInit {
  
  public nome: string = '';
  public giocatori: string[] = [];
  public descrizione: string = '';
  public banner: string = '';
  
  public buttonCallbacks = {
    finishCreation: {
      onClick: () => this.creaCampagna()
    }
  }

  constructor(private campagnaService: CampagnaService) {}

  creaCampagna() {
    const data = {
      name: this.nome,
      players: this.giocatori,
      desc: this.descrizione,
      banner: this.banner
    };

    this.campagnaService.createCampaign(
      data,
      _ => Alerts.good("Campagna creata con successo!"),
      err => Alerts.error(err.error)
    );
  }

  ngOnInit() { }

}
