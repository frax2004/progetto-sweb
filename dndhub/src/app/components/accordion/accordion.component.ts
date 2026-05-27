import { Component, Input, OnInit } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonThumbnail } from '@ionic/angular/standalone';
import { Accordion } from './Accordion';
import { CommonModule } from '@angular/common';
import { Card } from '../card/Card';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  imports: [IonAccordion, IonAccordionGroup, IonItem, IonLabel, CommonModule, IonThumbnail, ButtonComponent]
})
export class AccordionComponent  implements OnInit {
  @Input() accordions: Accordion[] = [];
  @Input() allowMultipleEnabled: boolean = false;
  plcImg: String = Card.defaultImageURL();

  constructor() {}

  ngOnInit() {}

}
