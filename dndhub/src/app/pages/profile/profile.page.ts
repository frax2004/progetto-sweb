import { AfterViewInit, Component, effect, ElementRef, inject, OnInit, QueryList, signal, viewChild, ViewChild, ViewChildren } from '@angular/core';
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

  @ViewChild("username") usernameField: EntryComponent;
  @ViewChild("email") emailField: EntryComponent;
  @ViewChild("password") passwordField: EntryComponent;

  entryHandle = signal<EntryComponent | null>(null);

  public goBack = () => Navigate.toPath(this.router, 'landing-page')();
  public enableAccountEdit = () => {
    this.emailField.disabled = false;
    this.passwordField.disabled = false;
    this.usernameField.disabled = false;
  }
  public save = () => {
    this.emailField.disabled = true;
    this.passwordField.disabled = true;
    this.usernameField.disabled = true;
  }

  public placeholder = () => alert('Not Implemented Function');

  public buttons = {
    placeholder: { onClick: this.placeholder },
    goBack: { onClick: this.goBack },
    enableAccountEdit: { onClick: this.enableAccountEdit },
    save: { onClick: this.save }
  };

  constructor(private userService: UserUtilitiesService, public popoverController: PopoverController, private router: Router) {}

  ngAfterViewInit() {
    this.userService
    .getUserInfo()
    .subscribe({
      next: value => {
        this.usernameField.entry.value = value.username;
        this.emailField.entry.value = value.email;
        this.passwordField.entry.value = value.password;
      },
      error: err => alert(JSON.stringify(err))
    });
  }

  ngOnInit() {}
}
