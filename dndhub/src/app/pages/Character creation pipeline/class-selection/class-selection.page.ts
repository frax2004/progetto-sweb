import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonLabel, PopoverController, IonCol, IonRow, IonFooter } from '@ionic/angular/standalone';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { Accordion } from 'src/app/components/accordion/Accordion';
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from 'src/app/components/button/button.component';
import { expand } from 'rxjs';
import { Button } from 'src/app/components/button/Button';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { Navigate, Popups } from 'src/app/core/core';
import { DragEntryComponent } from "src/app/components/drag-entry/drag-entry.component";
import { Router } from '@angular/router';
import { TitleComponent } from "src/app/components/title/title.component";
import { LabelComponent } from "src/app/components/label/label.component";
import { CharacterManagementService } from 'src/app/services/character.management.service';

@Component({
  selector: 'app-class-selection',
  templateUrl: './class-selection.page.html',
  styleUrls: ['./class-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonGrid, AccordionComponent, IonLabel, TextAreaComponent, IonCol, ButtonComponent, IonRow, IonFooter, DragEntryComponent, TitleComponent, LabelComponent]
})
export class ClassSelectionPage implements OnInit {
  b1_button: Button = { text: 'clicca qui', expand: ''};
  b1_context: ButtonContext = { onClick: Popups.ofSimpleText(this.popoverController, "Hai scelto questa classe")};
  b1: ButtonComponent = {
    button: this.b1_button, context: this.b1_context,
    // questa riga sotto l'ha aggiunta automaticamente l'estensione, non so perché
    ngOnInit: function (): void {
      throw new Error('Function not implemented.');
    }
  }

  b2_context: ButtonContext = { onClick: Popups.ofSimpleText(this.popoverController, "Andiamo les go les go milano")};

  buttonCallbacks = {
    // manca la pagina precedente a cui linkare il primo bottone
    nextPage: { onClick: Navigate.toPath(this.router,'species-selection')}
  }

  //da cambiare quando avremo un db come si deve
  accordions: Accordion[] = [
    // { value: 'barbaro accordion', title: 'Barbaro', content: 'Al barbaro piace stare mezzo nudo e piacchiare la gente forte e essere arrabbiato e essere pelato e ascoltare sludge', button: this.b1},
    // { value: 'mago accordion', title: 'Mago', content: 'Il mago è un secchione che tira magie e puo\' (quasi) letteralemente piegare la realtà alla sua volontà una volta arrivato ad un determinato livello', button: this.b1},
    // { value: 'ranger accordion', title: 'Ranger', content: 'è scarso, non sceglierlo :[', button: this.b1},
  ];

  constructor(public popoverController: PopoverController, private router: Router, private classDisplayer: CharacterManagementService) {
    this.classDisplayer
    .displayClasses()
    .subscribe({
      next: (value: any) => {
         = value.classes;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



  ngOnInit() {}

}
