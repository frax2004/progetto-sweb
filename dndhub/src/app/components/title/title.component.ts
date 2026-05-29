import { Component, Input, OnInit } from '@angular/core';
import { IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  imports: [IonTitle],
})
export class TitleComponent  implements OnInit {
  @Input() title!: String;


  constructor() { }

  ngOnInit() {}

}
