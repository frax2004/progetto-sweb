import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent,
  IonFabButton,
} from '@ionic/angular/standalone';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CampaignCardComponent } from 'src/app/components/campaign-card/campaign-card.component';
import { Card } from 'src/app/components/card/Card';

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

  

  cards = signal<Card[]>([
    {title: 'nome campagna + nome DM' , subtitle: '344', content: 'descrizione della campagna', imageURL: Card.defaultImageURL()},
    {title: 'I draghi ma anche le segrete - Gianpiero' , subtitle: '341 giocatori', content: 'Una campagna molto brutta', imageURL: 'https://immaginiamo.org/wp-content/uploads/2016/09/lunedi-36.jpg'},
    {title: 'nome campagna + nome DM' , subtitle: '344', content: 'descrizione della campagna', imageURL: Card.defaultImageURL()},
    {title: 'I draghi ma anche le segrete - Gianpiero' , subtitle: '341 giocatori', content: 'Una campagna molto brutta', imageURL: 'https://immaginiamo.org/wp-content/uploads/2016/09/lunedi-36.jpg'},
    {title: 'nome campagna + nome DM' , subtitle: '344', content: 'descrizione della campagna', imageURL: Card.defaultImageURL()},
    {title: 'I draghi ma anche le segrete - Gianpiero' , subtitle: '341 giocatori', content: 'Una campagna molto brutta', imageURL: 'https://immaginiamo.org/wp-content/uploads/2016/09/lunedi-36.jpg'},
  ]);

  constructor(private router: Router) { }
  ngOnInit() { }

  createCampaign = () => this.router.navigate(['/campaign-creation-info']);
  goBack = () => this.router.navigate(['/landing-page']);

}
