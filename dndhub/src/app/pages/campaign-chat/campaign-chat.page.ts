import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTextarea, IonTitle, IonToolbar, PopoverController, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Alerts, Popups } from 'src/app/core/core';
import { firstValueFrom, timestamp } from 'rxjs';
import { PostsService } from 'src/app/services/PostsService';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CampagnaService } from 'src/app/services/campagna.service';
import { State } from 'src/app/core/state';
import { CampaignsPage } from '../campaigns/campaigns.page';

@Component({
  selector: 'app-campaign-chat',
  templateUrl: './campaign-chat.page.html',
  styleUrls: ['./campaign-chat.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonTextarea, IonToolbar, CommonModule, FormsModule, ButtonComponent, IonItem, IonLabel]
})
export class CampaignChatPage implements OnInit {
  
  static CURRENT_PAGE: CampaignChatPage;

  public buttonCallbacks = {
    placeholder: {
      onClick: async () => {
        await this.router.navigate(['/campaigns']);
        CampaignsPage.CURRENT_PAGE.loadCampaigns();
      }
    }
  };

  public buttonCampaignCallBacks = {
    placeholder: { onClick: () => this.router.navigate(['/dettagli-campagna'])}
  };

  
  public posts = signal<any[]>([]);
  public players = signal<any[]>([]);
  
  public campaign = State.currentCampaign;
  public postText: string = '';

  constructor(private router: Router, private PostsService: PostsService, private alertCtrl: AlertController, private campaignService: CampagnaService) {
    CampaignChatPage.CURRENT_PAGE = this;
  }
  
  public loadInfo = async () => {
    await this.loadPosts();
    await this.loadPlayers();
  }

  ngOnInit() {
    
    this.loadInfo();
  }

  public get campaignName() {
    return this.campaign().nome;
  }
  
  async deletePost(time_stamp: string) { 
    
    const alert = await this.alertCtrl.create({ 
      
      header: 'Conferma eliminazione', 
      message: 'Vuoi davvero eliminare questo post?',
      buttons: [
        {
          text: 'Annulla', 
          role: 'cancel'  
        },
        {
          text: 'Elimina',
          role: 'destructive',
          
          
          handler: () => this.PostsService
          .deletePost(this.campaign().idx_campagna, time_stamp) 
          .subscribe({
            next: this.loadPosts,
            error: err => Alerts.error(err.error)
          })
        }
      ]
    });

    
    await alert.present(); 
  }

  public loadPlayers = async () => {
    try {
      const res = await firstValueFrom<any>(this.campaignService.loadAcceptedPlayers(this.campaign().idx_campagna));
      this.players.set(res.players);
    } catch(err) {
      Alerts.error(err.error);
    }
  }

  public loadPosts = async () => {
    try {
      const res = await firstValueFrom<any>(this.PostsService.getPosts(this.campaign().idx_campagna));
      this.posts.set(res.data);
    } catch(err) {
      Alerts.error(err.error);
    }
  }

  async confermaPubblicazione() {
    if (!this.postText?.trim()) {
      Alerts.personalizedMessage("Scrivi qualcosa prima di creare il post",'Message');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Conferma pubblicazione',
      message: 'Vuoi davvero pubblicare questo post?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel'
        },
        {
          text: 'Pubblica',
          role: 'confirm',
          handler: () => {

            const body = {
              contenuto: this.postText,
              time_stamp: new Date().toISOString()
            };

            this.PostsService.createPost(this.campaign().idx_campagna, body)
            .subscribe({
              next: (res: any) => {
                this.postText = '';
                this.loadPosts();
              },
              error: (err) => Alerts.error(err.error)
            });
          }
        }
      ]
    });

    await alert.present();
  }
  
  buttonContextPost = {
    newPost: {
      onClick: () => this.confermaPubblicazione()
    }
  };

  deletePostClick = (time_stamp: string) => {
    return () => this.deletePost(time_stamp);
  };
}
