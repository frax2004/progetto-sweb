import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, AlertController } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { State } from 'src/app/core/state';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/PostsService';
import { CampagnaService } from 'src/app/services/campagna.service';
import { firstValueFrom } from 'rxjs';
import { Alerts } from 'src/app/core/core';

@Component({
  selector: 'app-character-campaign-chat',
  templateUrl: './character-campaign-chat.page.html',
  styleUrls: ['./character-campaign-chat.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, ButtonComponent]
})
export class CharacterCampaignChatPage implements OnInit {

  public buttonCallbacks = {
    placeholder: { onClick: () => this.router.navigate(['/characters'])}
  };

  public buttonCampaignCallBacks = {
    placeholder: { onClick: () => this.router.navigate(['/character-campaign-details'])}
  };

  public posts = signal<any[]>([]);
  public players = signal<any[]>([]);

  public campaign = State.currentCampaign;

  public loadPlayers = async () => {
    try {
      const res = await firstValueFrom<any>(this.campaignService.loadAcceptedPlayers(this.campaign()?.idx_campagna));
      this.players.set(res.players);
    } catch(err) {
      Alerts.error(err.error);
    }
  }

  public loadPosts = async () => {
    try {
      const res = await firstValueFrom<any>(this.PostsService.getPosts(this.campaign()?.idx_campagna));
      this.posts.set(res.data);
    } catch(err) {
      Alerts.error(err.error);
    }
  }

  public get campaignName() {
    return this.campaign()?.nome;
  }

  private loadInfo = async () => {
    await this.loadPlayers();
    await this.loadPosts();
  } 

  constructor(private router: Router, private PostsService: PostsService, private alertCtrl: AlertController, private campaignService: CampagnaService) { }

  ngOnInit() {
    this.loadInfo();
  }

}
