import { Component, Input, OnInit } from '@angular/core';
import { IonCheckbox } from '@ionic/angular/standalone';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  imports: [IonCheckbox],
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() testo: string = '';
}
