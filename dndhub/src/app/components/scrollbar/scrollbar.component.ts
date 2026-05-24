import { Component, OnInit, Input } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonAvatar,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-scrollbar',
  templateUrl: './scrollbar.component.html',
  standalone: true,
  imports: [
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList
  ]

})
export class ScrollBarComponent {

  @Input() items?: any[];

  @Input() loadMore!: () => Promise<any[]>; // questa è una funzione che viene passata come input al componente, che serve a caricare nuovi elementi dal database

  async onIonInfinite(event: InfiniteScrollCustomEvent) { // questo serve perché deve aspettare che la funzione carichi dal db

    const newItems = await this.loadMore(); // carica nuovi elementi dal database

    this.items.push(...newItems); // aggiunge i nuovi elementi alla lista esistente 
    // i tre puntini indicano che gli elementi presi dal database vanno presi singolarmente, altrimenti vengono presi tutti insieme
    event.target.complete(); // segnala la fine del caricamento dei nuovi oggetti

    if (newItems.length === 0) { // se non ci sono più elementi da caricare, disabilita l'infinite scroll
      event.target.disabled = true;
    }
  }
}