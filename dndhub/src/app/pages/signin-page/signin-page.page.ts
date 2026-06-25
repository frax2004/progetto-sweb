import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInput, IonHeader, IonTitle, IonText, IonToolbar, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter, IonInputPasswordToggle, PopoverController } from '@ionic/angular/standalone';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { Alerts, Navigate } from 'src/app/core/core';
import { Services, State } from 'src/app/core/state';
import { EntryComponent } from 'src/app/components/entry/entry.component';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.page.html',
  styleUrls: ['./signin-page.page.scss'],
  standalone: true,
  imports: [
    EntryComponent,
    IonContent,
    IonInput,
    RouterLink,
    IonHeader,
    IonTitle,
    IonText,
    IonToolbar,
    IonItem,
    IonLabel,
    ButtonComponent,
    IonInputPasswordToggle
]
})
export class SigninPagePage implements OnInit {

  constructor(private router: Router) {}

  @ViewChild("email") emailField: EntryComponent;
  @ViewChild("password") passwordField: EntryComponent;
  @ViewChild("username") usernameField: EntryComponent;

  doRegister = (event: Event) => {
    Services.authService.register(
      this.emailField.entry.value?.toString() ?? '',
      this.passwordField.entry.value?.toString() ?? '',
      this.usernameField.entry.value?.toString() ?? ''
    ).subscribe({
      next: (value) => {
        State.User.isLogged.set(true);
        Navigate.toPath(this.router, 'landing-page')();
      },
      error: err => Alerts.error(err.error)
    })
  }

  ngOnInit() {}
}
