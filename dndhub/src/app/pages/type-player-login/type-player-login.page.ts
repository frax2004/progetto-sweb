import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonLabel ,IonTitle, IonToolbar, } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Router } from '@angular/router';
import { Navigate, Popups } from 'src/app/core/core';
import { expand } from 'rxjs';

@Component({
  selector: 'app-type-player-login',
  templateUrl: './type-player-login.page.html',
  styleUrls: ['./type-player-login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,IonLabel, IonToolbar, CommonModule, ButtonComponent, FormsModule]
})
export class TypePlayerLoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


















  goto(route: string) {
    this.router.navigate([route]);
  }


}
