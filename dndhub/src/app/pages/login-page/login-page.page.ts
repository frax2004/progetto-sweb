import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent,IonInput, IonHeader, IonTitle, IonText, IonToolbar, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter,  } from '@ionic/angular/standalone';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { Accordion } from 'src/app/components/accordion/Accordion';
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from 'src/app/components/button/button.component';
import { expand } from 'rxjs';
import { Button } from 'src/app/components/button/Button';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverController } from '@ionic/angular/standalone';
import { Popups } from 'src/app/core/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [IonContent,IonInput, RouterLink, IonHeader, IonTitle, IonText , IonToolbar, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter, CommonModule, ReactiveFormsModule, ButtonComponent, AccordionComponent, TextAreaComponent]
})
export class LoginPagePage implements OnInit {

  constructor(private authService: AuthService, public popoverController: PopoverController) { }

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  ngOnInit() {}
  buttonCallbacks = {
    authLogin: {
      onClick: () => {
        Popups.ofSimpleText(this.popoverController,'ENTRO');
        this.authService.login(
          this.formGroup.get('email')?.value || '',
          this.formGroup.get('password')?.value || ''
        ).subscribe({
          next: (value) => {
            console.log(value);
          },
          error: (err) => {
            console.log(err);
          }
        })
    }
  }
  };

  loginButton: Button = { text: 'Login', expand: 'block', color: '#ff0000'};
  loginContext: ButtonContext = { onClick: () => { alert("Login effettuato!"); } };




}



