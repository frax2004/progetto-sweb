import { Component, Input, OnInit } from '@angular/core';
import { IonTextarea } from "@ionic/angular/standalone";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  imports: [IonTextarea],
})
export class TextAreaComponent  implements OnInit {
  @Input() fill?: String;
  @Input() label?: String;
  @Input() labelPlacement?: String;
  @Input() helperText?: String;
  @Input() errorText?: String;
  @Input() placeholder: String = "Scrivi qua";
  @Input() disabled: Boolean = false;

  constructor() { }

  ngOnInit() {}

}
