import { Component, Input, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  imports: [IonContent],
})
export class PopUpComponent implements OnInit {
  @Input() popText?: String;

  ngOnInit() {}

}
