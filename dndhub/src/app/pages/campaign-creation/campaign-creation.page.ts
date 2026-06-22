import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonTextarea, 
  IonSearchbar, 
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList
} from '@ionic/angular/standalone';
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from "src/app/components/button/button.component";
import { EntryComponent } from "src/app/components/entry/entry.component";
import { CampagnaService } from 'src/app/services/campagna.service';
import { Alerts } from 'src/app/core/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-creation',
  templateUrl: './campaign-creation.page.html',
  styleUrls: ['./campaign-creation.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    FormsModule, 
    IonItem, 
    IonLabel, 
    TextAreaComponent, 
    ButtonComponent, 
    EntryComponent, 
    IonInput, 
    IonTextarea,
    IonSearchbar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
  ]
})
export class CampaignCreationPage implements OnInit {
  
  public name: string = '';
  public description: string = '';
  public banner: string = '';
  public documentsLinks = signal<string[]>([]);
  public selectedPlayers = signal<string[]>([]);
  public availablePlayers = signal<string[]>([]);
  public currentPrefix = signal<string>("");
  @ViewChild("doc_entry") public documentEntry: IonInput;

  private static PLAYERS_LOADER_THRESHOLD = 8;

  constructor(private router: Router, private campagnaService: CampagnaService) {}

  public addDocumentLink = (_: Event) => {
    this.documentsLinks.update(links => {
      const link = this.documentEntry.value.toString() ?? '';
      if(link !== '')
        links.push(link);
      return links;
    });
  }

  public removeDocumentLink(doc: string) {
    this.documentsLinks.update(links => {
      links.splice(links.indexOf(doc));
      return links;
    });
  }

  public removePlayer = (player: any) => {
    this.selectedPlayers.update(selected => {
      selected.splice(selected.indexOf(player), 1);
      return selected;
    });
    this.availablePlayers.update(available => {
      available.unshift(player);
      return available;
    })
  }

  public addPlayer = (player: any) => {
    this.selectedPlayers.update(selected => selected.concat([player]));
    this.availablePlayers.update(available => {
      available.splice(available.indexOf(player), 1);
      return available;
    })
  }

  public createCampaign = () => {
    const data = {
      name: this.name !== '' ? this.name : null,
      players: this.selectedPlayers(),
      desc: this.description !== '' ? this.description : null,
      banner: this.banner !== '' ? this.banner : null,
      documents: this.documentsLinks()
    };

    this.campagnaService.createCampaign(
      data,
      _ => {
        this.router.navigate(["/campaigns"]);
        Alerts.good("Campagna creata con successo!");
      },
      err => Alerts.error(err.error)
    );
  };


  public onScrollForMore = (e: InfiniteScrollCustomEvent) => {
    this.loadMorePlayers(() => setTimeout(
      () => {
        e.target.complete();
      }, 
      500
    ));
  };

  public onSearchEnter = (e: Event) => {
    const target = e.target as HTMLIonSearchbarElement;
    this.currentPrefix.set(target.value);
    this.availablePlayers.set([]);
    this.loadMorePlayers();
  };

  public loadMorePlayers = (callback: () => {} | undefined = undefined) => {
    const queryInfo = {
      limit: CampaignCreationPage.PLAYERS_LOADER_THRESHOLD,
      offset: this.availablePlayers().length,
      regex: this.currentPrefix() !== '' ? `${this.currentPrefix()}%` : '',
      excludes: this.selectedPlayers()
    };

    const success = (res: any) => {
      const players = res.players;
      this.availablePlayers.set(
        this.availablePlayers().concat(
          players.map(player => player.idx_personaggio)
        )
      );
      callback?.();
    };

    this.campagnaService.loadPlayers(
      queryInfo,
      success,
      (res: any) => Alerts.error(res.error)
    )
  }

  ngOnInit() { this.loadMorePlayers(); }

}
