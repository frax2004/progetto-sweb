import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent,
  IonFabButton,
} from '@ionic/angular/standalone';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CampaignCardComponent } from 'src/app/components/campaign-card/campaign-card.component';
import { Card } from 'src/app/components/card/Card';
import { Alerts, Campaign, defaultCampaignImageURL } from 'src/app/core/core';
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

  static CURRENT_PAGE: CampaignsPage;
  cards = signal<Card[]>([]);
  campaigns: Campaign[] = [];

  constructor(private router: Router, private campaignService: CampagnaService) {
    CampaignsPage.CURRENT_PAGE = this;
    this.loadCampaigns();
  }

  ngOnInit() { }

  private static toCard(campaign: any): Card {
    return {
      imageURL: campaign.banner ?? defaultCampaignImageURL,
      title: campaign.nome,
      subtitle: `${campaign.playersCount}`,
      content: campaign.descrizione,
    };
  };
  
  private static toCampaign = function (campaign: any): Campaign {
    return {
      utente_generico: campaign.utente_generico,
      nome: campaign.nome,
      idx_campagna: campaign.idx_campagna,
      banner: campaign.banner ?? defaultCampaignImageURL,
      descrizione: campaign.descrizione,
      links_documenti: campaign.links_documenti
    };
  }

  public loadCampaigns = () => {
    const success = (res: any) => {
      this.campaigns = res.campaigns.map(CampaignsPage.toCampaign);
      this.cards.set(res.campaigns.map(CampaignsPage.toCard));
    }
    const fail = res => Alerts.error(res.error);

    this.campaignService.loadCampaigns(success, fail);
  };

  createCampaign = () => this.router.navigate(['/campaign-creation-info']);
  goBack = () => this.router.navigate(['/landing-page']);

}
