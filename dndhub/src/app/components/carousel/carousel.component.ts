import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Card } from '../card/Card';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [CardComponent]
})
export class CarouselComponent  implements OnInit {
  @Input() cards: Card[] = [];

  constructor() { }

  ngOnInit() {}

}
