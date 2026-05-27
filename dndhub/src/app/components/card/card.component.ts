import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { Card } from './Card';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle]
})
export class CardComponent  implements OnInit {
  @Input() card!: Card;

  constructor() { }

  ngOnInit() {}

}
