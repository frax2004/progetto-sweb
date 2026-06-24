import { Component, Input, OnInit } from '@angular/core';
import { DatiGiocatore } from '../dati-giocatore';
import { IonContent } from '@ionic/angular';
import { ButtonComponent } from '../button/button.component';
import { Button } from '../button/Button';
import { ButtonContext } from '../button/ButtonContext';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent
  ]
})
export class PlayerCardComponent implements OnInit {

  @Input() player!: DatiGiocatore;
  @Input() onReport: (player: DatiGiocatore) => void;
  @Input() onKick: (player: DatiGiocatore) => void;
  @Input() showKickButton?: boolean = true;
  
  reportButton: Button = {
    text: 'Segnala',
    expand: 'block',
    color: 'success'
  };

  kickButton: Button = {
    text: 'Espelli',
    expand: 'block',
    color: 'danger'
  };

  reportContext: ButtonContext = { onClick: () => this.onReport(this.player) };
  kickContext: ButtonContext = { onClick: () => this.onKick(this.player) };

  constructor() {}

  ngOnInit() {}

}