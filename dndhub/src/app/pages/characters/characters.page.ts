import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, PopoverController, IonItem, IonGrid, IonRow, NavController, IonLabel, IonButtons } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Alerts, defualtCharacterImgURL, Navigate, Popups } from 'src/app/core/core';
import { CardComponent } from "src/app/components/card/card.component";
import { Card } from 'src/app/components/card/Card';
import { Router } from '@angular/router';
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { CampaignCardComponent } from "src/app/components/campaign-card/campaign-card.component";
import { CharacterCardComponent } from "src/app/components/character-card/character-card.component";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonLabel, IonTitle, IonToolbar, CommonModule, FormsModule, ButtonComponent, IonItem, IonGrid, IonRow, CardComponent, CampaignCardComponent, CharacterCardComponent]
})
export class CharactersPage implements OnInit {

  cards = signal<Card[]>([]);

  buttonCallbacks = {
    goToCampaigns: { onClick: Popups.ofSimpleText(this.popupController, "Hello, World") },
    createChar: { onClick: Navigate.toPath(this.router, '/character-creation-info') },
    goBack: { onClick: Navigate.toPath(this.router,'/landing-page')},
  };

  private static toCard(character: any): Card {
    return {
      imageURL: character.imgURL === null ? defualtCharacterImgURL : character.imgURL === undefined ? defualtCharacterImgURL : character.imgURL,
      title: character.nome,
      subtitle: character.specie + ' - ' + character.classe,
      content: character.background,
    };
  }

  private loadCharacters = () => {
    const success = (res: any) => {
      this.cards.set(res.characters.map(CharactersPage.toCard));
      console.log(JSON.stringify(res,null,2));
    }
    const fail = res => Alerts.error(res.error);

    this.characterServices.loadCharacters(success,fail);
  }


  constructor(public popupController: PopoverController, private router: Router, private characterServices: CharacterManagementService) { 
    this.loadCharacters();
  }

  ngOnInit() { }

}
