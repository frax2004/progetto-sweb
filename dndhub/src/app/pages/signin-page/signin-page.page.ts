import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonInput, IonHeader, IonTitle, IonText, IonToolbar, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { Accordion } from 'src/app/components/accordion/Accordion';
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from 'src/app/components/button/button.component';
import { expand } from 'rxjs';
import { Button } from 'src/app/components/button/Button';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginPagePage } from '../login-page/login-page.page';
import { Navigate } from 'src/app/core/core';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.page.html',
  styleUrls: ['./signin-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, RouterLink, IonHeader, IonTitle, IonText, IonToolbar, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter, CommonModule, FormsModule, ButtonComponent, AccordionComponent, TextAreaComponent, ReactiveFormsModule, IonInputPasswordToggle]
})
export class SigninPagePage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, LoginPagePage.getPasswordValidator()]),
    username: new FormControl('',[Validators.required])
  });

  passwordType = 'password';

  doRegister() {
      //console.log("sono nella funzione");
      this.authService.register(
        this.formGroup.get('email')?.value || '',
        this.formGroup.get('password')?.value || '',
        this.formGroup.get('username')?.value || ''
      ).subscribe({
        next: (value) => {
          Navigate.toPath(this.router, 'landing-page');
        },
        error: (err) => {
          console.log(err);
          alert(err.message);
        }
      })
    }

  ngOnInit() {}
loginButton: Button = { text: 'Registrati', expand: 'block', color: '#ff0000', type: "submit"};
loginContext: ButtonContext = { onClick: () => { alert("Registrazione effettuata!"); } };




}
