import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, PopoverController, IonItem, IonFooter } from '@ionic/angular/standalone';
import { Accordion } from 'src/app/components/accordion/Accordion';
import { Button } from 'src/app/components/button/Button';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { Popups } from 'src/app/core/core';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";

@Component({
  selector: 'app-species-selection',
  templateUrl: './species-selection.page.html',
  styleUrls: ['./species-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, AccordionComponent, IonFooter, ButtonComponent]
})
export class SpeciesSelectionPage implements OnInit {
  b1_button: Button = { text: 'clicca qui', expand: ''};
    b1_context: ButtonContext = { onClick: Popups.ofSimpleText(this.popoverController, "Hai scelto questa specie")};
    b1: ButtonComponent = {
      button: this.b1_button, context: this.b1_context,
      // questa riga sotto l'ha aggiunta automaticamente l'estensione, non so perché
      ngOnInit: function (): void {
        throw new Error('Function not implemented.');
      }
    }

  b2_context: ButtonContext = { onClick: Popups.ofSimpleText(this.popoverController, "Andiamo les go les go milano")};

  accordions: Accordion[] = [
    { value: 'elf accordion', title: 'Elfo', content: 'gli elfi hanno le orecchie a punta e vivono molto a lungo, le possibili sottorazze sono elfo dei boschi e elfo alto', button: this.b1},
    { value: 'dwarf accordion', title: 'Nano', content: 'i nani non hanno le orecchie a punta, non sono alti e minano i minerali :]', button: this.b1},
    { value: 'halfling accordion', title: 'Halfling', content: 'Gli halfling sono praticamente gli hobbit pero\' Wotc non aveva i soldi per pagare il nome hobbit', button: this.b1},
  ];


  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

}
