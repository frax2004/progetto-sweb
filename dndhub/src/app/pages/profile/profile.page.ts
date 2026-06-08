import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonInput ,IonToolbar, IonCol, PopoverController, IonLabel, IonList, IonItem, IonGrid, IonRow, IonButton, IonThumbnail, IonSplitPane, IonMenu } from '@ionic/angular/standalone';
import { Navigate, Popups } from 'src/app/core/core';
import { ButtonComponent } from "src/app/components/button/button.component";
import { UnorderedListElementComponent } from "src/app/components/unordered-list-element/unordered-list-element.component";
import { TitleComponent } from "src/app/components/title/title.component";
import { LabelComponent } from "src/app/components/label/label.component";
import { EntryComponent } from 'src/app/components/entry/entry.component';
import { Router } from '@angular/router';
import { UserUtilitiesService } from 'src/app/services/user.utilities.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [EntryComponent, IonSplitPane, IonMenu, IonContent, IonHeader, IonTitle, IonInput, IonToolbar, CommonModule, FormsModule, IonCol, ButtonComponent, IonLabel, IonList, UnorderedListElementComponent, IonItem, TitleComponent, LabelComponent, IonGrid, IonRow, IonButton, IonThumbnail],
})
export class ProfilePage implements OnInit, AfterViewInit {

  @ViewChild("username") usernameField!: EntryComponent;
  @ViewChild("email") emailField!: EntryComponent;
  @ViewChild("password") passwordField!: EntryComponent;

  censor: boolean = true;
  buttonCallbacks = {
    placeholder: { onClick: Popups.ofSimpleText(this.popoverController,'Funzione non ancora implementata')},
    uncensor: { onClick: () => {
        if (this.censor===true) this.censor=false;
        else this.censor=true;
      }
    },
    goBack: {
      onClick: () => {
        Navigate.toPath(this.router, 'landing-page')();
      }
    },
    enableAccountEdit: {
      onClick: () => {
        this.emailField.disabled = false;
        this.passwordField.disabled = false;
        this.usernameField.disabled = false;
      }
    },
    save: {
      onClick: () => {
        this.emailField.disabled = true;
        this.passwordField.disabled = true;
        this.usernameField.disabled = true;
      }
    }
  };

  constructor(private userService: UserUtilitiesService, public popoverController: PopoverController, private router: Router) {}

  ngAfterViewInit(): void {
    this.userService
    .getUserInfo()
    .subscribe({
      next: (value) => {
        console.log(JSON.stringify(value));
        this.usernameField.value = value.username;
        this.emailField.value = value.email;
        this.passwordField.value = value.password;
      },
      error: err => alert(JSON.stringify(err))
    });
  }
  
  ngOnInit() {}

}
