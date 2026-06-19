import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInput, IonHeader, IonTitle, IonText, IonToolbar, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter, IonInputPasswordToggle, PopoverController } from '@ionic/angular/standalone';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Alerts, Navigate } from 'src/app/core/core';
import { State } from 'src/app/core/state';
import { EntryComponent } from 'src/app/components/entry/entry.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
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
  ]
})
export class LoginPagePage implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  @ViewChild("email") emailField: EntryComponent;
  @ViewChild("password") passwordField: EntryComponent;

  ngOnInit() {}

  doLogin = (event: Event) => {
    this.authService.login(
      this.emailField.entry.value.toString() ?? '',
      this.passwordField.entry.value.toString() ?? ''
    ).subscribe({
      next: (value) => {
        State.User.isLogged.set(true);
        Navigate.toPath(this.router, 'landing-page')();
      },
      error: err => Alerts.error(err.error)
    })
  }

}



