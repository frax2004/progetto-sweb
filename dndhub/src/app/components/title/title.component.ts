import { Component, Input, OnInit } from '@angular/core';
import { IonTitle } from "@ionic/angular/standalone";
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  imports: [LabelComponent],
})
export class TitleComponent  implements OnInit {
  @Input() title!: String;


  constructor() { }

  ngOnInit() {}

}
