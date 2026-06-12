import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  imports: [IonInput, IonItem],
})
export class EntryComponent  implements OnInit {
  @Input() label?: string;
  @Input() labelPlacement?: string;
  @Input() type?: string;
  @Input() placeholder: string = "Scrivi qui";
  @Input() disabled: boolean = false;
  @ViewChild("input") entry!: IonInput;
  @Input() value?: string;

  constructor() { }

  ngOnInit() {}

}
