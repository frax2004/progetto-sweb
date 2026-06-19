import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card/Card';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss'],
  imports: [
    ButtonComponent,
  ]
})
export class CampaignCardComponent  implements OnInit {

  @Input() card: Card;

  constructor() { }
  ngOnInit() {}

}
