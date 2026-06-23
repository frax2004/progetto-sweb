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
  @Input() onAccept: (richiesta: DatiRichiesta) => void;
  @Input() onReject: (richiesta: DatiRichiesta) => void;

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

  acceptContext: ButtonContext = { onClick: () => this.onAccept(this.richiesta) };
  rejectContext: ButtonContext = { onClick: () => this.onReject(this.richiesta) };

  constructor() {}

  ngOnInit() {}

}