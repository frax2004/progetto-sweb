import { Component, Input, OnInit } from '@angular/core';
import { ULelemContext } from './ULelemContext';
import { IonLabel, IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-unordered-list-element',
  templateUrl: './unordered-list-element.component.html',
  styleUrls: ['./unordered-list-element.component.scss'],
  imports: [IonLabel, IonItem],
})
export class UnorderedListElementComponent  implements OnInit {
  @Input() text: String = '';
  @Input() context?: ULelemContext;

  constructor() { }

  ngOnInit() {}

}
