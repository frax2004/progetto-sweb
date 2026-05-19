import { Component, OnInit } from '@angular/core';
import { IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [IonToolbar, IonTitle],
})
export class NavbarComponent  implements OnInit {
  @Input() Elements: 
  @Input() title: String | undefined;


  constructor() { }

  ngOnInit() {}

}
