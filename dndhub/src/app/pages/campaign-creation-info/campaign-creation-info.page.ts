import { Component, Input, OnInit, signal } from '@angular/core';
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
      imageURL: 'https://i.pinimg.com/1200x/3f/59/9b/3f599be10be14718b1cf5f0fb087f69f.jpg',
      title: "Il mondo di Dungeons & Dragons è pieno di avventure...",
      subtitle: "Non vorrai perdertele mica tutte!",
      content: "Crea la tua campagna e potrai sbloccare infinite possibilità..."
    },
    {
      imageURL: 'https://i.pinimg.com/736x/f0/2c/72/f02c72a7cb29a8ceefc8fcea10f706c2.jpg',
      title: "Immagina raccontare una storia e giocarla...",
      subtitle: "Come vivere una favola!",
      content: "Raduna i tuoi amici e affrontate orripilanti mostri nelle segrete più oscure della fantasia!"
    },
  ];

  currentCard = signal<number>(this.cards[0] !== undefined ? 0 : -1);

  constructor() { }

  ngOnInit() {
  }

  public advance(amount: number) {
    const i = this.currentCard();
    if(i < 0 || i + amount < 0 || i + amount >= this.cards.length) return;
    this.currentCard.set(
      this.currentCard() + amount
    );
  }

}
