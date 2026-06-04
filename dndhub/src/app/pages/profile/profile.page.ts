import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonInput ,IonToolbar, IonCol, PopoverController, IonLabel, IonList, IonItem, IonGrid, IonRow, IonButton, IonThumbnail } from '@ionic/angular/standalone';
import { Popups } from 'src/app/core/core';
import { ButtonComponent } from "src/app/components/button/button.component";
import { UnorderedListElementComponent } from "src/app/components/unordered-list-element/unordered-list-element.component";
import { TitleComponent } from "src/app/components/title/title.component";
import { LabelComponent } from "src/app/components/label/label.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonInput, IonToolbar, CommonModule, FormsModule, IonCol, ButtonComponent, IonLabel, IonList, UnorderedListElementComponent, IonItem, TitleComponent, LabelComponent, IonGrid, IonRow, IonButton, IonThumbnail],
})
export class ProfilePage implements OnInit {
  censor: boolean = true;

  buttonCallbacks = {
    placeholder: { onClick: Popups.ofSimpleText(this.popoverController,'Funzione non ancora implementata')},
    uncensor: { onClick: () => {
        if (this.censor===true) this.censor=false;
        else this.censor=true;
      }
    },
  };

  uncensor(e: Event) {
    if (this.censor===true) this.censor=false;
    else this.censor=true;
  }

  showPassword() {
    if (this.censor===true) return '***';
    else return 'passordGIANNI';
  }

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

}
