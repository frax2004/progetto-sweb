import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonInput ,IonToolbar, IonCol, PopoverController, IonLabel, IonList, IonItem, IonGrid, IonRow, IonButton, IonThumbnail, IonSplitPane, IonMenu } from '@ionic/angular/standalone';
import { Popups } from 'src/app/core/core';
import { ButtonComponent } from "src/app/components/button/button.component";
import { UnorderedListElementComponent } from "src/app/components/unordered-list-element/unordered-list-element.component";
import { TitleComponent } from "src/app/components/title/title.component";
import { LabelComponent } from "src/app/components/label/label.component";
import { EntryComponent } from 'src/app/components/entry/entry.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [EntryComponent, IonSplitPane, IonMenu, IonContent, IonHeader, IonTitle, IonInput, IonToolbar, CommonModule, FormsModule, IonCol, ButtonComponent, IonLabel, IonList, UnorderedListElementComponent, IonItem, TitleComponent, LabelComponent, IonGrid, IonRow, IonButton, IonThumbnail],
})
export class ProfilePage implements OnInit {

  @ViewChildren("account_entry") entries!: QueryList<EntryComponent>;

  censor: boolean = true;
  buttonCallbacks = {
    placeholder: { onClick: Popups.ofSimpleText(this.popoverController,'Funzione non ancora implementata')},
    uncensor: { onClick: () => {
        if (this.censor===true) this.censor=false;
        else this.censor=true;
      }
    },
    enableAccountEdit: {
      onClick: () => {
        this.entries.forEach(e => e.disabled = false);
      }
    },
    save: {
      onClick: () => {
        this.entries.forEach(e => e.disabled = true);
      }
    }
  };

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {

  }

}
