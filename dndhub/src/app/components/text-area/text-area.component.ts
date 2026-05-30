import { Component, Input, OnInit } from '@angular/core';
import { IonTextarea, IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  imports: [IonTextarea, IonItem],
})
export class TextAreaComponent  implements OnInit {
  @Input() fill: String = 'outline';
  @Input() label?: String = 'label'; 
  @Input() labelPlacement?: String = 'floating';
  @Input() helperText?: String;
  @Input() errorText?: String;
  @Input() placeholder: String = "Scrivi qua";
  @Input() disabled: Boolean = false;
  @Input() autogrow?: boolean = true;

  constructor() { }

  ngOnInit() {}

}
