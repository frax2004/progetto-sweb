import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonTextarea, 
  IonSearchbar 
} from '@ionic/angular/standalone';
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from "src/app/components/button/button.component";
import { EntryComponent } from "src/app/components/entry/entry.component";
import { CampagnaService } from 'src/app/services/campagna.service';
import { Alerts } from 'src/app/core/core';

@Component({
  selector: 'app-campaign-creation',
  templateUrl: './campaign-creation.page.html',
  styleUrls: ['./campaign-creation.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    FormsModule, 
    IonItem, 
    IonLabel, 
    TextAreaComponent, 
    ButtonComponent, 
    EntryComponent, 
    IonInput, 
    IonTextarea,
    IonSearchbar,
  ]
})
export class CampaignCreationPage implements OnInit {
  
  public name: string = '';
  public description: string = '';
  public banner: string = '';

  public selectedPlayers = signal<string[]>([]);
  public availablePlayers = signal<string[]>([]);

  constructor(private campagnaService: CampagnaService) {}

  public createCampaign = () => {
    const data = {
      name: this.name,
      players: this.selectedPlayers,
      desc: this.description,
      banner: this.banner
    };

    this.campagnaService.createCampaign(
      data,
      _ => Alerts.good("Campagna creata con successo!"),
      err => Alerts.error(err.error)
    );
  };

  loadPlayers = () => {};

  ngOnInit() { }

}
