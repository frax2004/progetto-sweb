import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonInput, IonHeader, IonTitle, IonText, IonToolbar, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter,  } from '@ionic/angular/standalone';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { Accordion } from 'src/app/components/accordion/Accordion';
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from 'src/app/components/button/button.component';
import { expand } from 'rxjs';
import { Button } from 'src/app/components/button/Button';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [IonContent,IonInput, RouterLink, IonHeader, IonTitle, IonText , IonToolbar, IonItem, IonGrid, IonLabel, IonCol, IonRow, IonFooter, CommonModule, FormsModule, ButtonComponent, AccordionComponent, TextAreaComponent]
})
export class LoginPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
loginButton: Button = { text: 'Login', expand: 'block', color: '#ff0000'};
loginContext: ButtonContext = { onClick: () => { alert("Login effettuato!"); } };




}



