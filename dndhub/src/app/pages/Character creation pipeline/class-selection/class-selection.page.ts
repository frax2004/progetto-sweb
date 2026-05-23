import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonLabel } from '@ionic/angular/standalone';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { Accordion } from 'src/app/components/accordion/Accordion';
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";

@Component({
  selector: 'app-class-selection',
  templateUrl: './class-selection.page.html',
  styleUrls: ['./class-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonGrid, AccordionComponent, IonLabel, TextAreaComponent]
})
export class ClassSelectionPage implements OnInit {
  //da cambiare quando avremo un db come si deve
  accordions: Accordion[] = [
    { value: 'elf accordion', title: 'Elfo', content: 'gli elfi hanno le orecchie a punta e vivono molto a lungo, le possibili sottorazze sono elfo dei boschi e elfo alto'},
    { value: 'dwarf accordion', title: 'Nano', content: 'i nani non hanno le orecchie a punta, non sono alti e minano i minerali :]'},
    { value: 'halfling accordion', title: 'Halfling', content: 'Gli halfling sono praticamente gli hobbit pero\' Wotc non aveva i soldi per pagare il nome hobbit'},
  ];


  constructor() { }

  ngOnInit() {
  }

}
