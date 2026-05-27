import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonCol, IonRow, IonLabel, IonList, PopoverController } from '@ionic/angular/standalone';
import { CheckboxComponent } from "src/app/components/checkbox/checkbox.component";
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { UnorderedListElementComponent } from "src/app/components/unordered-list-element/unordered-list-element.component";
import { Navigate, Popups } from 'src/app/core/core';
import { EntryComponent } from "src/app/components/entry/entry.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.page.html',
  styleUrls: ['./character-sheet.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonGrid, IonCol, IonRow, IonLabel, CheckboxComponent, AccordionComponent, IonList, UnorderedListElementComponent, EntryComponent]
})
export class CharacterSheetPage implements OnInit {
  accordions = {
    // per qualche motivo \n non va a capo e neanche <br/>
    forza: { value: 'Strength accordion', title: 'FORZA - 10', content: 'Tiro salvezza: +0\nAtletica: +0'},
    destrezza: { value: 'Dexterity accordion', title: 'DESTREZZA - 86', content: 'Tiro salvezza: +10\nAcrobazia: +100 (competenza)\nVelocità di mano: -30\nFurtività: +1000 (maestria)'},
    costituzione: { value: 'Constitution accordion', title: 'COSTITUZIONE - 9', content: 'Tiro salvezza: -1000'},
    intelligenza: { value: 'Intelligence accordion', title: 'INTELLIGENZA - 34', content:'Tiro salvezza: +80 (competenza)\nArcano: +0\nStoria: +9\nInvestigare: +7\nNatura: +80\nReligione: +7'},
    saggezza: { value: 'Wisdom accordion', title: 'SAGGEZZA - 120', content:'Tiro salvezza: +1Milione (competenza)\nAddestrare animali: +50(maestria)\nIntuire: +0\nMedicina: +4\nPercezione: assai\nSopravvivenza: -5'},
    carisma: { value: 'Charisma accordion', title: 'CARISMA - 90', content:'Tiro salvezza: bho (competenza)\nInganno: +5\nIntimidire: -20 (competenza)\nIntrattenere: +9\nPersuasione: no'},
  };

  abilityAccordions = {
    abilita: { value: 'Ability accordion', title: 'Abilità e talenti', content:'dofcnsdlkndlfnqwoeiubscklsbelwksjandxlkjsnklcjsnbqwlkjdlksajd.khjslkhjsdlkjsd'},
    inventario: { value: 'Inventary accordion', title: 'Inventario', content:'200 monete d\'oro Genitore 1 genitore 2'},
  }

  buttonCallbacks = {
    placeholder: { onClick: Navigate.toPath(this.router,'character-spells')},
  };
  
  constructor(public popoverController: PopoverController, private router: Router) { }

  ngOnInit() {
  }

}
