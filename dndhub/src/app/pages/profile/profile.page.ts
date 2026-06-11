import { 
  AfterViewInit, 
  Component, 
  OnInit, 
  ViewChild 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonAlert, 
  IonContent, 
  IonHeader, 
  IonTitle,
  IonInput ,
  IonToolbar, 
  IonCol, 
  PopoverController, 
  IonLabel, 
  IonList, 
  IonItem, 
  IonGrid, 
  IonRow, 
  IonButton, 
  IonThumbnail, 
  IonSplitPane, 
  IonMenu, 
  AlertController 
} from '@ionic/angular/standalone';
import { 
  Alerts, 
  Navigate 
} from 'src/app/core/core';
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
  imports: [
    IonAlert, 
    EntryComponent, 
    IonSplitPane, 
    IonMenu, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonInput, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonCol, 
    ButtonComponent, 
    IonLabel, 
    IonList, 
    UnorderedListElementComponent, 
    IonItem, 
    TitleComponent, 
    LabelComponent, 
    IonGrid, 
    IonRow, 
    IonButton, 
    IonThumbnail
  ],
})
export class ProfilePage implements OnInit, AfterViewInit {

  @ViewChild("username") usernameField: EntryComponent;
  @ViewChild("email") emailField: EntryComponent;
  @ViewChild("password") passwordField: EntryComponent;

  private currentEdit: {
    email: string;
    password: string;
    username: string;
  } | undefined = undefined;

  public goBack = () => Navigate.toPath(this.router, 'landing-page')();

  public enableAccountEdit = () => {
    this.currentEdit = {
      email: this.emailField.entry.value.toString(),
      password: this.passwordField.entry.value.toString(),
      username: this.usernameField.entry.value.toString(),
    };
    this.emailField.disabled = false;
    this.passwordField.disabled = false;
    this.usernameField.disabled = false;
  }

  public save = () => {
    if(this.currentEdit === undefined) return;
    
    const noChanges = this.currentEdit.email === this.emailField.entry.value.toString()
    && this.currentEdit.password === this.passwordField.entry.value.toString()
    &&  this.currentEdit.username === this.usernameField.entry.value.toString();
    
    const success = _ => {
      this.currentEdit = undefined;
      this.emailField.disabled = true;
      this.passwordField.disabled = true;
      this.usernameField.disabled = true;
      Alerts.good("Le informazioni sono state salvate con successo");
    };

    const fail = res => {
      this.emailField.entry.value = this.currentEdit.email;
      this.passwordField.entry.value = this.currentEdit.password;
      this.usernameField.entry.value = this.currentEdit.username;
      Alerts.error(res.error);
    };

    if(noChanges) return success({});

    this.userService.setUserInfo(
      this.emailField.entry.value.toString(), 
      this.passwordField.entry.value.toString(),
      this.usernameField.entry.value.toString(),
      success,
      fail
    );

  }

  private deleteAccount() {
    Alerts.notImplemetedError(ProfilePage.prototype.deleteAccount);
  } 
  private logOut() {
    Alerts.notImplemetedError(ProfilePage.prototype.logOut);
  }

  public buttons = {
    deleteAccount: { onClick: this.deleteAccount },
    logOut: { onClick: this.logOut },
    goBack: { onClick: this.goBack },
    enableAccountEdit: { onClick: this.enableAccountEdit },
    save: { onClick: this.save },
  };

  constructor(private alertController: AlertController, private userService: UserUtilitiesService, public popoverController: PopoverController, private router: Router) {}

  ngAfterViewInit() {
    this.userService.getUserInfo(
      value => {
        this.usernameField.entry.value = value.username;
        this.emailField.entry.value = value.email;
        this.passwordField.entry.value = value.password;
      }, 
      Alerts.error
    );
  }

  ngOnInit() {}
}
