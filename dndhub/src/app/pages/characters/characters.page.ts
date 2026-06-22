import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, PopoverController, IonItem, IonGrid, IonRow, NavController, IonLabel, IonButtons, IonButton, IonAlert, IonInput } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Alerts, currentGlobalCharacterName, defualtCharacterImgURL, Navigate, Popups } from 'src/app/core/core';
import { CardComponent } from "src/app/components/card/card.component";
import { Card } from 'src/app/components/card/Card';
import { Router } from '@angular/router';
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { CampaignCardComponent } from "src/app/components/campaign-card/campaign-card.component";
import { alertController, AlertOptions, AlertInput, AlertButton } from '@ionic/core';
import { CharacterCardComponent } from "src/app/components/character-card/character-card.component";
import { CharacterSheetPage } from '../character-sheet/character-sheet.page';
import { CampagnaService } from 'src/app/services/campagna.service';
import { firstValueFrom } from 'rxjs';
import { text } from 'express';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonLabel, IonTitle, IonToolbar, CommonModule, FormsModule, ButtonComponent, IonItem, IonGrid, IonRow, CardComponent, CampaignCardComponent, CharacterCardComponent, IonButton, IonAlert, IonInput]
})
export class CharactersPage implements OnInit {

  characterCards = signal<Card[]>([]);
  campaignCards = signal<Card[]>([]);
  campaignCode: string;


  seeCampaigns = false;

  setCharacterName = (name: string) => {
    currentGlobalCharacterName.set(name)
    this.router.navigate(['/character-sheet']);
  }

  joinCampaignAlert = async () => {
    await (await alertController.create({
      header: 'Choose a character to participate in a new campaign',
      inputs: [
      {
        name: 'codeInput',
        type: 'text',
        placeholder: 'Insert campaign code',
        cssClass: 'alertInput',
      },
      {
        name: 'nameInput',
        type: 'text',
        placeholder: 'Insert character name',
        cssClass: 'alertInput',
      }
    ],
      buttons: [
        {
          text: 'Go back',
          role: 'cancel',
          cssClass: 'alertButton secondary',

        },
        {
          text: 'Send request',
          cssClass: 'alertButton',
          handler: (alertData) => {
            this.campaignServices.createCampaignParticipationRequest(alertData.nameInput,alertData.codeInput)
            .subscribe({
              next: (value: any) => {
                alert(alertData.nameInput);
                Alerts.personalizedMessage('Request succesfully sent!','Request sent');
              },
              error: (err) => Alerts.error(err.error)
            });
          }
        }
      ]
    })).present();
  }

  buttonCallbacks = {
    joinCampaign: {onClick: this.joinCampaignAlert},
    toggle: { onClick: () => this.seeCampaigns = !this.seeCampaigns },
    createChar: { onClick: Navigate.toPath(this.router, '/character-creation-info') },
    goBack: { onClick: Navigate.toPath(this.router,'/landing-page')},
  };

  private static toCharacterCard(character: any): Card {
    return {
      imageURL: character.imgURL === null ? defualtCharacterImgURL : character.imgURL === undefined ? defualtCharacterImgURL : character.imgURL,
      title: character.nome,
      subtitle: character.specie + ' - ' + character.classe,
      content: character.background,
    };
  }

  private static toCampaignCard(campaign: any): Card {
    return {
      imageURL: campaign.banner ?? Card.defaultImageURL(),
      title: campaign.nome,
      subtitle: `${campaign.playersCount}`,
      content: campaign.descrizione,
    };
  }

  private loadCharacters = async () => {
    try {
      const resValue = await firstValueFrom(this.characterServices.loadCharacters());
      this.characterCards.set(resValue.characters.map(CharactersPage.toCharacterCard));
    }
    catch (err) {
      Alerts.error(err.error);
    }
  }

  private loadCampaigns = async () => {
    try {
      const resValue = await firstValueFrom(this.campaignServices.loadAcceptedCharacterCampaigns());
      this.campaignCards.set(resValue.campaigns.map(CharactersPage.toCampaignCard));
    }
    catch (err) {
      Alerts.error(err.error);
    }
  }

  private loadUtils = async () => {
    await this.loadCharacters();
    await this.loadCampaigns();
  }

  constructor(public popupController: PopoverController, private campaignServices: CampagnaService, private router: Router, private characterServices: CharacterManagementService) { 
    this.loadUtils();
  }

  ngOnInit() { }

}
