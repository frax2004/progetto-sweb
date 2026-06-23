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
import { ReportsService } from 'src/app/services/reports.service';

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
  };

  public submitReport = async (report: {tipo: string, quando: string, tipo_contenuto: string, contenuto: string}) => {
    const handle = this.reportService.createReport(report);

    try {
      const response = await firstValueFrom<any>(handle);
      Alerts.good(response.message);
    } catch(err) {
      Alerts.error(err.error);
    }
  };
  
  public presentReportDescriptionAlert = async (reason: string, post: any) => {
    const alert = await this.alertCtrl.create({
      header: 'Report this post: Description',
      inputs: [
        {
          cssClass: 'alertInput',
          placeholder: 'Tell us the problem',
          type: 'text',
          name: 'descInput'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertButton secondary',
        },
        {
          text: 'Send Report',
          cssClass: 'alertButton',
          handler: data => this.submitReport({
            tipo: reason, 
            quando: new Date().toISOString(),
            tipo_contenuto: 'post',
            contenuto: `The post sent at ${post.time_stamp} by this campaign "${this.campaign().idx_campagna}" was reported for this reason: ${data.descInput}`,
          })
        }
      ]
    });

    await alert.present();
  };

  public reportPost = (post: any) => {
    return async (e: Event) => {
      const alert = await this.alertCtrl.create({
        header: 'Report this post: Reason',
        inputs: [
          {
            cssClass: 'alertInput',
            value: 'inappropriate',
            label:  'inappropriate',
            type: 'radio'
          },
          {
            cssClass: 'alertInput',
            value: 'explicit',
            label:  'explicit',
            type: 'radio'
          },
          {
            cssClass: 'alertInput',
            value: 'offensive',
            label:  'offensive',
            type: 'radio',
            checked: true
          },
          {
            cssClass: 'alertInput',
            value: 'cheat',
            label:  'cheat',
            type: 'radio'
          },
          {
            cssClass: 'alertInput',
            value: 'other',
            label: 'other',
            type: 'radio',
          },
        ],
        buttons: [
          {
            text: 'Next',
            cssClass: 'alertButton',
            handler: reason => this.presentReportDescriptionAlert(reason, post)
          }
        ]
      });

      await alert.present();
    };
  };

  public get campaignName() {
    return this.campaign()?.nome;
  }

  private loadInfo = async () => {
    await this.loadPlayers();
    await this.loadPosts();
  } 

  constructor(private router: Router, private reportService: ReportsService, private PostsService: PostsService, private alertCtrl: AlertController, private campaignService: CampagnaService) { }

  ngOnInit() {
    this.loadInfo();
  }

}
