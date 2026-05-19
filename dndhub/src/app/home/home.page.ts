import { Component, inject, Injectable } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ButtonComponent } from '../components/button/button.component';
import { PopoverController } from '@ionic/angular/standalone';
import { Popups } from '../core/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ButtonComponent],
})
export class HomePage {
  // Se dovete testare componenti, per favore non cancellate le funzioni relative al bottone e al 
  // pop-up ma mettetele in commento
  buttonCallbacks = {
    button1: { onClick: Popups.ofSimpleText(this.popupController, "Hello, World") }
  };

  
  constructor(public popupController: PopoverController) {}
}
