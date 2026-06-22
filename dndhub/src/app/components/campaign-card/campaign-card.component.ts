import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card/Card';
import { ButtonComponent } from '../button/button.component';
import { Alerts, currentGlobalCampaignName } from 'src/app/core/core';
import { Router } from '@angular/router';

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
    currentGlobalCampaignName.set(this.campaign.idx_campagna);
    this.router.navigate(['/campaign-chat']);
  }


}
