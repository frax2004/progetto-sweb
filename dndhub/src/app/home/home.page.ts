import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ButtonComponent } from '../components/button/button.component';
import { PopoverController } from '@ionic/angular';
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
  async goTo(e: Event) {
    let tmp = new PopUpComponent();
    tmp.setPopText("Hello World!");

    const pop = await this.popupController.create({
      component: "Hello World!",
      event: e,
    });

    await pop.present();
  }

  constructor(public popupController: PopoverController) {
  }
}
