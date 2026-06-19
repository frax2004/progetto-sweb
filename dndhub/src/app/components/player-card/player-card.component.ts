import { Component, Input, OnInit } from '@angular/core';
import { DatiGiocatore } from '../dati-giocatore';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  standalone: true,
})
export class PlayerCardComponent implements OnInit {

  @Input() player!: DatiGiocatore;

  constructor() {}

  ngOnInit() {}

}