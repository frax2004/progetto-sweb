import { Component, Input, OnInit } from '@angular/core';
import { IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [IonToolbar, IonTitle],
})
export class NavbarComponent  implements OnInit {
  @Input() elements: ButtonComponent[] = [];
  @Input() title: String | undefined;


  constructor() { }

  ngOnInit() {}

}
