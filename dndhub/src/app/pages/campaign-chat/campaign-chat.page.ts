import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTextarea, IonTitle, IonToolbar, PopoverController, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Popups } from 'src/app/core/core';
import { timestamp } from 'rxjs';
import { PostsService } from 'src/app/services/PostsService';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-campaign-chat',
  templateUrl: './campaign-chat.page.html',
  styleUrls: ['./campaign-chat.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonTextarea, IonToolbar, CommonModule, FormsModule, ButtonComponent, IonItem, IonLabel]
})
export class CampaignChatPage implements OnInit {
  buttonCallbacks = {
    placeholder: { onClick: Popups.ofSimpleText(this.popoverController, 'Funzione non ancora implementata') },
  };

campaignName: string = '';
  idx_campagna: string = 'The-Frozen-Frontier @ (dungeon_master): antonio.ferri90@unipa.net';
  postText: string = '';

    posts=[];
  // posts = [
  //   {
  //     text: 'ciao freezer',
  //     time_stamp: '16/04/2005',
  //   },
  // ];

  players = [
    { name: 'Gorillicrya', character: 'Tiefling barbaro lvl 999' },
    { name: 'Gorillicrya', character: 'Tiefling barbaro lvl 999' },
    { name: 'Gorillicrya', character: 'Tiefling barbaro lvl 999' },
    { name: 'Gorillicrya', character: 'Tiefling barbaro lvl 999' },
  ]

  constructor(public popoverController: PopoverController, private PostsService: PostsService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.loadPosts(); // quando la pagina viene caricata prende subito i post se presenti
  }

  async deletePost(time_stamp: string) { // questa funzione serve per mostrare a schermo il popup di verifica 
    // l'ho importata da ionic, vi fa fare i popup belli
    const alert = await this.alertCtrl.create({ // qua ti limiti a dichiarare e creare l'oggetto alert
      // siccome ci vuole un po ' di tempo si usa await
      header: 'Conferma eliminazione', // questi semplicemente sono i suoi attributi e bottoni
      message: 'Vuoi davvero eliminare questo post?',
      buttons: [
        {
          text: 'Annulla', // sono semplici oggetti
          role: 'cancel'  // questo non fa nulla se si clicca qui 
        },
        {
          text: 'Elimina',
          role: 'destructive',
          handler: () => { //questo serve per fargli fare una funzione nel caso lo si clicchi ed esegue
            // la funzione per cancellare il post
            this.PostsService.deletePost(this.idx_campagna, time_stamp) // questa dovete andarla a 
              // vedere al controller se volete
              .subscribe({
                next: () => {
                  console.log("Post eliminato");
                  this.loadPosts();
                },
                error: (err) => {
                  console.log('errore eliminazione', err);
                }
              });
          }
        }
      ]
    });

    await alert.present(); // poco fa create serviva soltanto a crearlo però solo ora lo stiamo mostrando a schermo cosi
  }

  loadPosts() {
    this.PostsService.getPosts(this.idx_campagna)
      .subscribe({
        next: (res: any) => {
          this.posts = res.data;
        },
        error: (err) => {
          console.log('Errore caricamento post:', err);
        }
      });
  }

  async confermaPubblicazione() {

    if (!this.postText?.trim()) {
      console.log('Scrivi qualcosa prima di pubblicare');
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

            const body = {contenuto: this.postText,
            time_stamp: new Date().toISOString()
            };

            this.PostsService.createPost(this.idx_campagna, body)
              .subscribe({
                next: (res: any) => {
                  console.log('Post salvato:', res);

                  this.postText = '';

                  this.loadPosts();
                },
                error: (err) => {
                  console.log('Errore salvataggio post:', err);
                }
              });
          }
        }
      ]
    });

    await alert.present();
  }
  //devo ancora fare il buttom per cancellare i post ma questo poi ci penso perché mi siddia e devo cambiare l'ui
  buttonContextPost = {
    newPost: {
      onClick: () => this.confermaPubblicazione()
    }
  };

  deletePostClick = (time_stamp: string) => {
    return () => this.deletePost(time_stamp);
  };
}
