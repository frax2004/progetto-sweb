import { Component, Input, OnInit } from '@angular/core';
import { DatiRichiesta } from '../dati-richiesta';
import { Button } from '../button/Button';
import { ButtonContext } from '../button/ButtonContext';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
  standalone: true,
  imports: [ButtonComponent]
})
export class RequestCardComponent implements OnInit {

  @Input() richiesta!: DatiRichiesta;

  acceptButton: Button = {
    text: 'Accetta',
    expand: 'block',
    color: 'success'
  };

  rejectButton: Button = {
    text: 'Rifiuta',
    expand: 'block',
    color: 'danger'
  };

  acceptContext: ButtonContext = {
    onClick: () => this.accetta()
  };

  rejectContext: ButtonContext = {
    onClick: () => this.rifiuta()
  };

  constructor() {}

  ngOnInit() {}

  accetta() {
    this.richiesta.stato = 'accepted';
    console.log('Richiesta accettata');
  }

  rifiuta() {
    this.richiesta.stato = 'rejected';
    console.log('Richiesta rifiutata');
  }
}