import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, PopoverController, IonItem, IonGrid, IonRow, NavController, IonLabel, IonButtons } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Navigate, Popups } from 'src/app/core/core';
import { CardComponent } from "src/app/components/card/card.component";
import { Card } from 'src/app/components/card/Card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonLabel, IonTitle, IonToolbar, CommonModule, FormsModule, ButtonComponent, IonItem, IonGrid, IonRow, CardComponent]
})
export class CharactersPage implements OnInit {

  buttonCallbacks = {
    goToCampaigns: { onClick: Popups.ofSimpleText(this.popupController, "Hello, World") },
    createChar: { onClick: Navigate.toPath(this.router, '/character-creation-info') },
  };

  img = Card.defaultImageURL();

  cards: Card = { title:'Nome personaggio', subtitle:'Razza, classe e livello', content:  'breve descrizione opzionale', imageURL: Card.defaultImageURL() };

  constructor(public popupController: PopoverController, private router: Router) { }

  ngOnInit() {
  }

}
