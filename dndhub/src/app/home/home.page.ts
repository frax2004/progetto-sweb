import { Component, inject, Injectable } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/angular/standalone';
import { ButtonComponent } from '../components/button/button.component';
import { PopoverController } from '@ionic/angular/standalone';
import { Popups } from '../core/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { expand } from 'rxjs';
import { Button } from '../components/button/Button';
import { UnorderedListElementComponent } from "../components/unordered-list-element/unordered-list-element.component";
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ButtonComponent, NavbarComponent, UnorderedListElementComponent, IonList, CardComponent],
})
export class HomePage {
  // Se dovete testare componenti, per favore non cancellate le funzioni relative al bottone e al 
  // pop-up ma mettetele in commento
  buttonCallbacks = {
    button1: { onClick: Popups.ofSimpleText(this.popupController, "Hello, World") },
    button2: { onClick: Popups.ofSimpleText(this.popupController, "ciao") },
    button3: { onClick: Popups.ofSimpleText(this.popupController, "marmellata") }
  };

  b1: Button = {text: 'prova Testo', expand: ''};
  b2: Button = {text: 'prova altro testp', expand: ''};
  b3: Button = {text: 'prova', expand: ''};
  
  constructor(public popupController: PopoverController) {}
}
