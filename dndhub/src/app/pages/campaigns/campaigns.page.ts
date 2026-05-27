import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonRow, PopoverController } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Popups } from 'src/app/core/core';
import { Card } from 'src/app/components/card/Card';
import { CardComponent } from "src/app/components/card/card.component";

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.page.html',
  styleUrls: ['./campaigns.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonGrid, IonRow, ButtonComponent, CardComponent]
})
export class CampaignsPage implements OnInit {
  buttonCallbacks = {
    // da cambiare con bottone che va nella creazione della campagna quando si avrà l'apposita pagina
    createCampaign: { onClick: Popups.ofSimpleText(this.popoverController, 'Funzione non ancora implementata')},
  };

  campaignCards: Card[] = [
    {title: 'nome campagna + nome DM' , subtitle: 'numero giocatori', content: 'descrizione della campagna', imageURL: Card.defaultImageURL()},
    {title: 'I draghi ma anche le segrete - Gianpiero' , subtitle: '341 giocatori', content: 'Una campagna molto brutta', imageURL: 'https://immaginiamo.org/wp-content/uploads/2016/09/lunedi-36.jpg'},
  ];

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

}
