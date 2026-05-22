import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle]
})
export class CardComponent  implements OnInit {

  @Input() imageURL: String = "https://ionicframework.com/docs/img/demos/card-media.png";
  @Input() title?: String;
  @Input() subtitle?: String;
  @Input() content?: String;

  constructor() { }

  ngOnInit() {}

}
