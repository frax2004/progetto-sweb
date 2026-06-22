import { Component, Input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { Card } from 'src/app/components/card/Card';

@Component({
  selector: 'app-campaign-creation-info',
  templateUrl: './campaign-creation-info.page.html',
  styleUrls: ['./campaign-creation-info.page.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
  ]
})
export class CampaignCreationInfoPage implements OnInit {

  @Input() cards: Card[] = [
    {
      imageURL: 'https://i.pinimg.com/1200x/31/c0/ac/31c0ac24049ddb8691569e4c3036252d.jpg',
      title: "Create a campaign... ",
      subtitle: " ...to connect with your friends!",
      content: ""
    },
    {
      imageURL: 'https://i.pinimg.com/1200x/e6/99/06/e699060b283cbbb93c08ca270fa0d9f7.jpg',
      title: "What even is a campaign... ",
      subtitle: " ...in Dungeons & Dragons",
      content: "To put it simply, a campaign is the collection of adventures and stories that your characters live! One dungeon master usually creates a campaign with its story for its players to enjoy."
    },
    {
      imageURL: 'https://i.redd.it/lxbxr1xfssg51.png',
      title: "What even is a campaign... ",
      subtitle: " ...on DnDHUB",
      content: "A campaign on dndhub is a way of connecting various players and one dungeon master to share infos about your own real life campaign."
    },
    {
      imageURL: 'https://i.redd.it/0gj7i93lpq561.png',
      title: "How to create a campaign",
      subtitle: "Creation page",
      content: "As soon as you'll go to the next page you will be greeted with some fields to fill, some of them are optional! You need at least a name for the campaign to create one. You can't own campaigns with the same name"
    },
    {
      imageURL: 'https://www.dndspeak.com/wp-content/uploads/2021/03/Tavernkeepers-1.jpg',
      title: "How to create a campaign",
      subtitle: "At campaign creation",
      content: "Once the campaign is created, you'll be transported to its own private campaign page. On here you will be able to post new information to your players, accept invitation and much more!"
    },
  ];

  currentCard = signal<number>(this.cards[0] !== undefined ? 0 : -1);

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public advance(amount: number) {
    const i = this.currentCard();
    if(i < 0 || i + amount < 0 || i + amount >= this.cards.length) return;
    this.currentCard.set(
      this.currentCard() + amount
    );
  }

  goBack = () => this.router.navigate(['/campaigns']);
  public createCampaign = () => this.router.navigate(["/campaign-creation"]);
}
