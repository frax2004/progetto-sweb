import { Component, Input, OnInit } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Accordion } from './Accordion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  imports: [IonAccordion, IonAccordionGroup, IonItem, IonLabel, CommonModule]
})
export class AccordionComponent  implements OnInit {
  @Input() accordions: Accordion[] = [];
  @Input() allowMultipleEnabled: boolean = false;

  constructor() {}

  ngOnInit() {}

}
