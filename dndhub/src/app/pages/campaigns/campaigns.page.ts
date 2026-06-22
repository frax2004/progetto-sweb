import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent,
  IonFabButton,
} from '@ionic/angular/standalone';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CampaignCardComponent } from 'src/app/components/campaign-card/campaign-card.component';
import { Card } from 'src/app/components/card/Card';
import { Alerts } from 'src/app/core/core';
import { CampagnaService } from 'src/app/services/campagna.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.page.html',
  styleUrls: ['./campaigns.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    CampaignCardComponent,
    ButtonComponent,
    IonFabButton,
  ]
})
export class CampaignsPage implements OnInit {

  cards = signal<Card[]>([]);
  campaigns: any[] = [];

  constructor(private router: Router, private campaignService: CampagnaService) {
    this.loadCampaigns();
  }

  ngOnInit() { }

  private static toCard(campaign: any): Card {
    return {
      imageURL: campaign.banner ?? Card.defaultImageURL(),
      title: campaign.nome,
      subtitle: `${campaign.playersCount}`,
      content: campaign.descrizione,
    };
  };
  
  private loadCampaigns = () => {
    const success = (res: any) => {
      this.campaigns = res.campaigns;
      this.cards.set(res.campaigns.map(CampaignsPage.toCard));
    }
    const fail = res => Alerts.error(res.error);

    this.campaignService.loadCampaigns(success, fail);
  };

  createCampaign = () => this.router.navigate(['/campaign-creation-info']);
  goBack = () => this.router.navigate(['/landing-page']);

}
