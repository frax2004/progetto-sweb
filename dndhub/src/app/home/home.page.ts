import { Component, inject, Injectable } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ButtonComponent } from '../components/button/button.component';
import { PopoverController } from '@ionic/angular/standalone';
import { Popups } from '../core/core';
import { CheckboxComponent } from '../components/checkbox/checkbox.component'; 
import { ScrollBarComponent } from '../components/scrollbar/scrollbar.component';

  @Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ButtonComponent, CheckboxComponent,  ScrollBarComponent],
})
export class HomePage {
  // Se dovete testare componenti, per favore non cancellate le funzioni relative al bottone e al 
  // pop-up ma mettetele in commento  
  /* buttonCallbacks = {
    button1: { onClick: Popups.ofSimpleText(this.popupController, "Hello, World") }
  };

  
  constructor(public popupController: PopoverController) {} */
  items: any[] = [];

  limit = 2; //elementi che vengono caricati ogni volta che viene aperta la lista

  offset = 0; //è sostanzialmente il contatore che serve a capire dove è arrivato il caricamento del db

  ProvaDragonBall = [ // per provare il db 
    { id: 1, name: 'Wizard' },
    { id: 2, name: 'Rogue' },
    { id: 3, name: 'Paladin' },
    { id: 4, name: 'Barbarian' },
    { id: 5, name: 'Druid ' },
    { id: 6, name: 'Warlock' },
  ];
  constructor(public popupController: PopoverController) {

  this.initialize(); // questa funzione serve a caricare i primi elementi dal database

}

async initialize() { // questa a differenza di quella di  poco fa, aspetta che ci sia bisogno di caricare i nuovi oggetti dal db, mentre quella di prima carica all'inizializzazione della pagine

  const firstItems = await this.loadMore();  

  this.items.push(...firstItems); //aggiunge gli elementi caricati alla lista già creata

}

async loadMore() { // potrebbe anche inglobare initialize, ma poi se si vuole caricare nuovi elementi dal db basta chiamare questa funzione

  const data = this.ProvaDragonBall.slice( // slice si occupa di dividere il pezzo di db che serve
    this.offset,
    this.offset + this.limit
  );

  this.offset += this.limit;

return data; // restituisce gli elementi presi dal database
}
} 

