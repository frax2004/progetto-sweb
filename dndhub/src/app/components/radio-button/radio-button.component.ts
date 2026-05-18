import { Component, Input, input, OnInit } from '@angular/core';
import { IonItem, IonList, IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
import { Radio } from './Radio';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  imports: [IonItem, IonList, IonRadio, IonRadioGroup],
})
export class RadioButtonComponent  implements OnInit {
  @Input() radios: Radio[] = [];
  @Input() groupValue: String = '';

  constructor() { }

  ngOnInit() {}

}
