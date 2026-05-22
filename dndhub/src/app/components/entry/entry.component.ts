import { Component, Input, OnInit } from '@angular/core';
import { IonInput, IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  imports: [IonInput, IonItem],
})
export class EntryComponent  implements OnInit {
  @Input() label?: String;
  @Input() labelPlacement?: String;
  @Input() type?: String;
  @Input() placeholder: String = "Scrivi qui";
  @Input() disabled: Boolean = false;

  constructor() { }

  ngOnInit() {}

}
