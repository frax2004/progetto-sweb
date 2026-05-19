import { Component, Input, OnInit } from '@angular/core';
import { Button } from './Button';
import { IonButton } from '@ionic/angular/standalone';
import { ButtonFunction } from './ButtonFunction';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [IonButton]
})
export class ButtonComponent  implements OnInit {
  @Input() button!: Button;
  @Input() buttonFunction!: ButtonFunction;

  constructor() { }

  ngOnInit() {}

}
