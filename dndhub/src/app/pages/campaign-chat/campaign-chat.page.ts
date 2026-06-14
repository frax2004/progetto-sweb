import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, PopoverController, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Popups } from 'src/app/core/core';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-campaign-chat',
  templateUrl: './campaign-chat.page.html',
  styleUrls: ['./campaign-chat.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ButtonComponent, IonItem, IonLabel]
})
export class CampaignChatPage implements OnInit {
  buttonCallbacks = {
      placeholder: { onClick: Popups.ofSimpleText(this.popoverController,'Funzione non ancora implementata')},
  };

  campaignName: string = 'Nome campagna';

  posts = [
    {text: 'Testo esemplificativo di un post', senderImgURL: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Tokay_Gecko.jpg', timestamp: '09.37'},
    {text: 'Testo esemplificativo di un post', senderImgURL: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Tokay_Gecko.jpg', timestamp: '09.37'},
    {text: 'Testo esemplificativo di un post', senderImgURL: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Tokay_Gecko.jpg', timestamp: '09.37'},
  ];

  players = [
    { name: 'Gorillicrya', character: 'Tiefling barbaro lvl 999'},
    { name: 'Gorillicrya', character: 'Tiefling barbaro lvl 999'},
    { name: 'Gorillicrya', character: 'Tiefling barbaro lvl 999'},
    { name: 'Gorillicrya', character: 'Tiefling barbaro lvl 999'},
  ]

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

}
