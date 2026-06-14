import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonInput, IonTitle, IonTextarea, IonToolbar, PopoverController, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Popups } from 'src/app/core/core';
import { timestamp } from 'rxjs';
import { PostService } from 'src/app/services/posts';

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

  constructor(public popoverController: PopoverController, private postService: PostService) { }


  posts = [];
  postText = '';
  idx_campagna: string = 'GiuseppeFINALEEEEEEEEEEEEE'; // per ora lasciate questo

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts(this.idx_campagna)
      .subscribe({
        next: (res: any) => {
          this.posts = res.data;
        },
        error: (err) => {
          console.log('Errore caricamento post:', err);
        }
      });
  }

  publica_post = () => {
    if (!this.postText?.trim()) {
      console.log('Scrivi qualcosa prima di pubblicare');
      return;
    }

    const body = {
      contenuto: this.postText,
      time_stamp: new Date().toISOString()
    };

    this.postService.createPost(this.idx_campagna, body)
      .subscribe({
        next: (res: any) => {
          console.log('Post salvato:', res);
          this.posts.push({
            text: body.contenuto,
            timestamp: body.time_stamp
          });
          this.postText = '';
        },
        error: (err) => {
          console.log('Errore salvataggio post:', err);
        }
      });
  };

  buttonContextPost = {
    newPost: {
      onClick: () => this.publica_post()
    }
  };
}