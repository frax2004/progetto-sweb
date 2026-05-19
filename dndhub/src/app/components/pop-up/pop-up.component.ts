import { Component, Input, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  imports: [IonContent],
})
export class PopUpComponent  implements OnInit {
  public popText!: String;

  public static of(st: String) {
    class SonOfPopUpComponent extends PopUpComponent {
      constructor () {super(st);}
    }
    return SonOfPopUpComponent;
  }

  public setPopText(st: String) {
    this.popText = st;
  }

  constructor(st: String) {
    this.popText = st;
  }

  ngOnInit() {}

}
