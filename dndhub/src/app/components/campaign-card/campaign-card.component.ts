import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card/Card';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { State } from 'src/app/core/state';

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
  @Input() campaign: any;

  constructor(private router: Router) { }
  ngOnInit() {}

  public gotoCampaign = (e: Event) => {
    State.currentCampaign.set(this.campaign);
    this.router.navigate(['/campaign-chat']);
  }


}
