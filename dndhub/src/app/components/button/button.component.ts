import { Component, Input, OnInit } from '@angular/core';
import { Button } from './Button';
import { IonButton } from '@ionic/angular/standalone';
import { ButtonContext } from './ButtonContext';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [IonButton]
})
export class ButtonComponent  implements OnInit {
  @Input() button!: Button;
  @Input() context!: ButtonContext;

  constructor() { }

  ngOnInit() {}

}
