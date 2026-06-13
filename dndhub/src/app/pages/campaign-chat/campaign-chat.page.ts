import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonInput, IonTitle, IonTextarea, IonToolbar, PopoverController, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Popups } from 'src/app/core/core';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-campaign-chat',
  templateUrl: './campaign-chat.page.html',
  styleUrls: ['./campaign-chat.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonInput, IonTextarea, IonToolbar, CommonModule, FormsModule, ButtonComponent, IonItem, IonLabel]
})
export class CampaignChatPage implements OnInit {
  buttonCallbacks = {
    placeholder: { onClick: Popups.ofSimpleText(this.popoverController, 'Funzione non ancora implementata') },
  };



  campaignName: string = 'Nome campagna';

  players = [
    { name: 'Gorillicrya', character: 'Tiefling barbaro lvl 999' },
    { name: 'Gorillicrya', character: 'Tiefling barbaro lvl 999' },
    { name: 'Gorillicrya', character: 'Tiefling barbaro lvl 999' },
    { name: 'Gorillicrya', character: 'Tiefling barbaro lvl 999' },
  ]

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

  posts = [];
  postText = '';

  publica_post = () => {
    if (!this.postText?.trim()) {
      console.log('prima scrivi qualcosa dentro il post');
      console.log(this.posts)
      return
    }
    else{
      this.posts.push({
      text: this.postText,
      timestamp: new Date().toLocaleString(),
    });
    }
    this.postText = '';
    console.log(this.posts);
  }
  buttonContextPost = {
    newPost: {
      onClick: (event) => {
        this.publica_post();
      }
    }
  };

}
