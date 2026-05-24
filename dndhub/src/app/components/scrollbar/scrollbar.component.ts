import { Component, OnInit } from '@angular/core';
import {
  IonAvatar,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';

import { FakeDbService } from './fake-db';
import { Item } from './item';

@Component({
  selector: 'app-scroll-bar',
  templateUrl: 'scrollbar.component.html',
  standalone: true,
  imports: [
    IonAvatar,
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
  ],
})
export class ScrollBarComponent implements OnInit {

  items: Item[] = [];

  private page = 0;
  private pageSize = 20;

  constructor(private db: FakeDbService) {}

  ngOnInit() {
    this.loadMore(); // Carica i primi elementi all'inizio
  }

  async loadMore(event?: any) { // event è opzionale, viene passato solo quando la funzione è chiamata dall'infinite scroll
    const newItems = await this.db.getItems(this.page, this.pageSize); // Ottieni nuovi elementi dal servizio

    this.items = [...this.items, ...newItems]; // Aggiungi i nuovi elementi alla lista esistente 
    this.page++; // i ... serve a prendere gli elementi singoli  dall'array altrimenti vengono presi tutti insieme

    if (event) { //
      event.target.complete();

      if (newItems.length < this.pageSize) { // Se non ci sono più elementi da caricare, disabilita l'infinite scroll
        event.target.disabled = true;
      }
    }
  }
}