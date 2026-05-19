import { Component, inject, Injectable } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ButtonComponent } from '../components/button/button.component';
import { PopoverController } from '@ionic/angular/standalone';
import { PopUpComponent } from '../components/pop-up/pop-up.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ButtonComponent],
})

export class HomePage {
  // Se dovete testare componenti, per favore non cancellate le funzioni relative al bottone e al 
  // pop-up ma mettetele in commento 
  tmpFunc = {onClick: (a: Event) => this.goTo(a)};
  public popupController: PopoverController;

  constructor() {
    this.popupController = inject(PopoverController);
  }

  async goTo(e: Event) {
    const pop = await this.popupController.create({
      component: PopUpComponent.of("Pollarà"),
      event: e,
    });

    await pop.present();
  }
}
