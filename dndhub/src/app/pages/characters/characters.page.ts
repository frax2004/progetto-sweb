import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, PopoverController, IonItem, IonGrid, IonRow } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Popups } from 'src/app/core/core';
import { CardComponent } from "src/app/components/card/card.component";
import { Card } from 'src/app/components/card/Card';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ButtonComponent, IonItem, IonGrid, IonRow, CardComponent]
})
export class CharactersPage implements OnInit {

  buttonCallbacks = {
    goToCampaigns: { onClick: Popups.ofSimpleText(this.popupController, "Hello, World") },
    createChar: { onClick: Popups.ofSimpleText(this.popupController, "Funzione non ancora implementata :]") }
  }

  img = Card.defaultImageURL();

  cards: Card = { title:'Nome personaggio', subtitle:'Razza, classe e livello', content:  'breve descrizione opzionale', imageURL: Card.defaultImageURL() };

  constructor(public popupController: PopoverController) { }

  ngOnInit() {
  }

}
