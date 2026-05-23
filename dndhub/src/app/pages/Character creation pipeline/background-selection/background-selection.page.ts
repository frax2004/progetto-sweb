import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, PopoverController, IonFooter } from '@ionic/angular/standalone';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { Accordion } from 'src/app/components/accordion/Accordion';
import { Button } from 'src/app/components/button/Button';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { Popups } from 'src/app/core/core';

@Component({
  selector: 'app-background-selection',
  templateUrl: './background-selection.page.html',
  styleUrls: ['./background-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, AccordionComponent, IonFooter, ButtonComponent]
})
export class BackgroundSelectionPage implements OnInit {
  b1_button: Button = { text: 'clicca qui', expand: ''};
    b1_context: ButtonContext = { onClick: Popups.ofSimpleText(this.popoverController, "Hai scelto questo background")};
    b1: ButtonComponent = {
      button: this.b1_button, context: this.b1_context,
      // questa riga sotto l'ha aggiunta automaticamente l'estensione, non so perché
      ngOnInit: function (): void {
        throw new Error('Function not implemented.');
      }
    }

  b2_context: ButtonContext = { onClick: Popups.ofSimpleText(this.popoverController, "Andiamo les go les go milano")};

  accordions: Accordion[] = [
    { value: 'saggio accordion', title: 'Saggio', content: 'Il backgorund del saggio riguarda tutti i personaggi che hanno studiato assai prima di partire in avventura', button: this.b1},
    { value: 'viandante accordion', title: 'Viandante', content: 'Letteralemente il background dei senzatetto', button: this.b1},
    { value: 'marinaio accordion', title: 'Marinaio', content: 'Aaaaargh! Sono un pirata! AAAAAAAAAAAAAAAaargh!', button: this.b1},
  ];


  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

}
