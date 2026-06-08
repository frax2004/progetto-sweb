import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonLabel, PopoverController, IonCol, IonRow, IonFooter, IonAccordionGroup, IonAccordion, IonThumbnail } from '@ionic/angular/standalone';
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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonGrid, AccordionComponent, IonLabel, TextAreaComponent, IonCol, ButtonComponent, IonRow, IonFooter, DragEntryComponent, TitleComponent, LabelComponent, IonAccordionGroup, IonAccordion, IonThumbnail]
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

  classesArray = [];

  //da cambiare quando avremo un db come si deve
  accordions: Accordion[] = [
    // { value: 'barbaro accordion', title: 'Barbaro', content: 'Al barbaro piace stare mezzo nudo e piacchiare la gente forte e essere arrabbiato e essere pelato e ascoltare sludge', button: this.b1},
    // { value: 'mago accordion', title: 'Mago', content: 'Il mago è un secchione che tira magie e puo\' (quasi) letteralemente piegare la realtà alla sua volontà una volta arrivato ad un determinato livello', button: this.b1},
    // { value: 'ranger accordion', title: 'Ranger', content: 'è scarso, non sceglierlo :[', button: this.b1},
  ];

  // le funzioni display devono essere static altrimenti non possono essere accedute all'interno del costruttore
  static displayProficiencies(className,proficiencies) {
    let retValue = '';
    for(const prof of proficiencies) {
      if (!prof.name.includes('Saving Throw')) {
        retValue = retValue + '\n- ' + prof.name;
      }
    }
    return className + ' ha compentenza in\n' + retValue;
  }

  static displaySavingThrows(className,savingThrows) {
    let retValue = '';
    for(const prof of savingThrows) {
      let tmp = prof.name === 'STR' ? 'Strength (STR)' :
                prof.name === 'DEX' ? 'Dexterity (DEX)' :
                prof.name === 'CON' ? 'Constitution (CON)' :
                prof.name === 'WIS' ? 'Wisdom (WIS)' :
                prof.name === 'INT' ? 'Intelligence (INT)' : 'Charisma (CHA)' 
      retValue = retValue + '\n- ' + tmp;
    }
    return className + ' ha compentenza nei seguenti tiri salvezza\n' + retValue;
  }

  static displayProficiencyChoices(className,choices) {
    // forse abbiamo flattato un po' troppa roba...
    let retValue = '';
    for (const el of choices) {
         retValue = retValue + '\n- ' + el.desc;
    }

    return className + ' puo\' scegliere tra le seguenti competenze\n' + retValue;
  }

  static displayMulticlassing(className,multiclassing) {
    let profValue = '';
    let prereqValue = '';
    let choiceValue = '';
    for (const item of multiclassing.prerequisites) {
      let tmp = item.ability_score?.name === 'STR' ? 'Strength (STR)' :
                item.ability_score?.name === 'DEX' ? 'Dexterity (DEX)' :
                item.ability_score?.name === 'CON' ? 'Constitution (CON)' :
                item.ability_score?.name === 'WIS' ? 'Wisdom (WIS)' :
                item.ability_score?.name === 'INT' ? 'Intelligence (INT)' : 'Charisma (CHA)';
      prereqValue = prereqValue + 'Multiclassare con questa classe richiede un ' + tmp + ' minimo di: ' + item.minimum_score + '\n'; 
    }
    for (const item of multiclassing.proficiencies) {
      profValue = profValue + '\n- ' + item.name;
    }
    if(className === 'Bard') {
      choiceValue = choiceValue + '\n\nInoltre guadagni competenza in una delle abilita\' seguenti e una competenza con uno strumento qualsiasi:\n'
    }
    else if (className === 'Rogue' || className === 'Ranger') {
      choiceValue = choiceValue + '\n\nInoltre guadagni competenza in una delle abilita\' seguenti';
    }

    for (const itemChoice of multiclassing.proficiency_choices) {
      for (const set of itemChoice.option_set?.options_array) {
        choiceValue = choiceValue + '\n- ' + set.reference_item?.name;
      }
    }

    // c'è qualche errore nel db, la parte opzionale la scrivo a mano (circa)

    return prereqValue + 'L\'opzione di multiclasse con ' + className + ' conferisce le seguenti competenze:\n' + profValue + choiceValue; 
    //return JSON.stringify(multiclassing);
    //return choiceValue;
  }

  static displayStartingEquipment(className,startingEquipment) {
    let retValue = className + ' dispone del seguente equipaggiamento di partenza:\n'
    for (const el of startingEquipment) {
      retValue = retValue + '\n- ' + el.equipment?.name + ' x' + el.quantity;
    }

    return startingEquipment.length === 0 ? undefined : retValue;
  }

  static displayStartigEquipmentOptions(className,equipOpt) {
    let retValue = className + ' dispone delle seguenti opzioni di scelta di equipaggiamento:\n'
    
    for (const opt of equipOpt) {
        //for (const item of opt.option_set?.options_array) {
          retValue = retValue + '\n- ' + opt.option_set?.desc + ' - Choose: ' + opt.option_set?.choose;
        //}
    }
    
    // ci perdo le speranze, non capisco come flattarlo
    return JSON.stringify(equipOpt);
    //return retValue;
  }

  //c'è qualche problema con spellcasting

  static displaySpells(className,spells) {
    let retValue = 'Lista incantesimi semplificata di ' + className + ':\n';

    for (const item of spells) {
      retValue = retValue + '\n- ' + item.name + '  - Level: ' + item.level;
    }

    return retValue;
  } 

  static displaySubclasses(className,subclasses) {
    let retValue = 'Sottoclassi disponibili di ' + className + ':\n';

    for (const item of subclasses) {
      retValue = retValue + '\n- ' + item.name;
    }

    return retValue;
  }

  constructor(public popoverController: PopoverController, private router: Router, private classDisplayer: CharacterManagementService) {
    this.classDisplayer
    .displayClasses()
    .subscribe({
      next: (value: any) => {
        this.classesArray = value.classes.map(function (item: any) {
          return {
            imageURL: undefined,
            value: item.name + " accordion",
            title: item.name,
            hit_die: item.hit_die, 
            desc: 'descrizione placeholder',
            content: [
              { value: "proficiencies accordion",  title: "Competenze", content: ClassSelectionPage.displayProficiencies(item.name,item.proficiencies)},
              { value: "saving_throws accordion",  title: "Tiri salvezza", content: ClassSelectionPage.displaySavingThrows(item.name,item.saving_throws)},
              { value: "proficiency_choices accordion",  title: "Competenze a scelta", content: ClassSelectionPage.displayProficiencyChoices(item.name, item.proficiency_choices)},
              { value: "multiclassing accordion",  title: "Opzioni di multiclasse", content: ClassSelectionPage.displayMulticlassing(item.name,item.multiclassing)},
              //livelli da mettere qui, per ora provo senza
              { value: "starting_equipment accordion",  title: "Equipaggiamento di partenza", content: ClassSelectionPage.displayStartingEquipment(item.name,item.starting_equipment)},
              { value: "starting_equipment_options accordion",  title: "Equipaggiamento di partenza a scelta", content: ClassSelectionPage.displayStartigEquipmentOptions(item.name,item.starting_equipment_options)},
              { value: "spellcasting accordion",  title: "Caratteristiche da incantatore", content: JSON.stringify(item.spellcasting)},
              { value: "spell accordion",  title: "Lista possibili incantesimi", content: ClassSelectionPage.displaySpells(item.name,item.spells)},
              { value: "subclasses accordion",  title: "Sottoclassi possibili", content: ClassSelectionPage.displaySubclasses(item.name,item.subclasses)},
            ]
          };
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // [{"idx":"light-armor","name":"Light Armor"},
  

  ngOnInit() {}

}
