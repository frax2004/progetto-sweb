import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonContent, IonInput, IonHeader, IonTitle, IonText, IonToolbar, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter, IonButton, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { Accordion } from 'src/app/components/accordion/Accordion';
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from 'src/app/components/button/button.component';
import { expand } from 'rxjs';
import { Button } from 'src/app/components/button/Button';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverController } from '@ionic/angular/standalone';
import { Alerts, Navigate, Popups } from 'src/app/core/core';
import { State } from 'src/app/core/state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, RouterLink, IonHeader, IonTitle, IonText, IonToolbar, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter, CommonModule, ReactiveFormsModule, ButtonComponent, AccordionComponent, TextAreaComponent, IonButton, IonInputPasswordToggle]
})
export class LoginPagePage implements OnInit {

  constructor(private authService: AuthService, public popoverController: PopoverController, private router: Router) { }

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, LoginPagePage.getPasswordValidator()]),
  });

  public static getPasswordValidator(): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      const candidate = control.value as string;

      if(!candidate) {
        return null;
      }

      const assertLength = candidate.length >= 8;
      const assertIsLegal = /[a-zA-Z_0-9@#$!?'\-]+/.exec(candidate)?.includes(candidate);
      const assertHasCapital = /[A-Z]+/.test(candidate);
      const assertHasLower = /[a-z]+/.test(candidate);
      const assertHasNumber = /[0-9]+/.test(candidate);

      const correct = assertLength
      && assertIsLegal
      && assertHasCapital
      && assertHasLower
      && assertHasNumber;

      return correct ? null : {
        Length: assertLength,
        IsLegal: assertIsLegal,
        HasCapital: assertHasCapital,
        HasLower: assertHasLower,
        HasNumber: assertHasNumber,
      };
    };
  }

  ngOnInit() {}

  doLogin(event: Event) {
    //console.log("sono nella funzione");
    this.authService.login(
      this.formGroup.get('email')?.value || '',
      this.formGroup.get('password')?.value || ''
    ).subscribe({
      next: (value) => {
        State.User.isLogged.set(true);
        Navigate.toPath(this.router, 'landing-page')();
      },
      error: err => Alerts.error(err.error)
    })
  }

  
  buttonCallbacks = {
    authLogin: {
      onClick: this.doLogin
    }
  };

  loginButton: Button = { text: 'Login', expand: 'block', color: '#ff0000', type: "submit"};
  loginContext: ButtonContext = { onClick: () => { alert("Login effettuato!"); } };




}



