import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonList } from '@ionic/angular/standalone';
import { TitleComponent } from "src/app/components/title/title.component";
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { LabelComponent } from "src/app/components/label/label.component";
import { CharacterInstance } from '../CharacterInformation';
import { dnd } from 'dbserver/database.queries';

@Component({
  selector: 'app-option-selection',
  templateUrl: './option-selection.page.html',
  styleUrls: ['./option-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TitleComponent, LabelComponent, IonLabel, IonList]
})
export class OptionSelectionPage implements OnInit {
  simpleWeapons = ['club','dagger','greatclub','handaxe','javelin','light hammer','mace','quarterstaff','sickle','spear','dart','light crossbow','shortbow','sling'];
  musicalInstruments = ['Bagpipes','Drum','Dulcimer','Flute','Lyre','Horn','Pan flute','Shawm','Viol'];
  classChoices;
  speciesChoices;
  backgroundChoices;
  classContent;
  c: dnd.APIReference

  getFromOptions(choice) {
    return choice.from.options;
  }

  static displayClassProficiencyChoices(choices: dnd.Choice[]) {
    let retArray = [];
    for (const choice of choices) {
      for (const opt of choice.from.options) {
        retArray.push(opt.reference_item);
      }
    }

    return retArray;
  }

  static displayStartingEquipmentOptions(choices: dnd.Choice[]) {
    if (choices === undefined) return undefined;

    let retArray = [];
    for (const choice of choices) {
      const arrEl = {
        choose: choice.desc.split(/\([abcd]\)/).filter(el => el !== '' && el !== ' ' && el !== null),
        quantity: choice.choose,
      }
      retArray.push(arrEl);
    }

    return retArray;
  }

  constructor(private choicesDiplayer: CharacterManagementService) {
    this.choicesDiplayer
    .displayClassByName(
      // scritto così per testing, da levare || quando finiremo coi test
      CharacterInstance.selectedClass || 'bard'
    )
    .subscribe({
      next: (value: any) => {
        // faccio [0] perché torna un solo oggetto ma il retrieve lo conta come array
        this.classChoices = {
            name: value.classes[0].name,
            value: value.classes[0].name + ' value',
            // value.classes[0].proficiency_choices || 'placeholder'
            content: [
              { value: value.classes[0].name + ' proficiency_choices value', title: 'Proficiency choices', content: OptionSelectionPage.displayClassProficiencyChoices(value.classes[0].proficiency_choices)},
              { value: value.classes[0].name + ' starting_equipment_options value', title: 'Starting equipment options', content: OptionSelectionPage.displayStartingEquipmentOptions(value.classes[0].starting_equipment_options)},
              { value: value.classes[0].name + ' subclasses value', title: 'Subclasses', content: value.classes[0].subclasses},
            ],
          };
        this.classContent = this.classChoices.content;
        this.choicesDiplayer
        .displaySpeciesByName(
          CharacterInstance.selectedSpecies || 'elf'
        )
        .subscribe({
          next: (value: any) => {
            this.speciesChoices = {
              name: value.species[0].name,
              value: value.species[0].name + ' value',
              content: [
                { value: value.species[0].name + ' ability_bonus_options', title: 'Ability bonus options', content: JSON.stringify(value.species[0].ability_bonus_options) || 'placeholder'},
                { value: value.species[0].name + ' starting_proficiency_options', title: 'Starting proficiency options', content: JSON.stringify(value.species[0].starting_proficiency_options) || 'placeholder'},
                { value: value.species[0].name + ' languages_options', title: 'Languages options', content: JSON.stringify(value.species[0].languages_options) || 'placeholder'},
                { value: value.species[0].name + ' subspecies_options', title: 'Subspecies', content: JSON.stringify(value.species[0].subraces) || 'placeholder'},
              ],
            };
            this.choicesDiplayer
            .displayBackgroundByName(
              CharacterInstance.selectedBackground || 'acolyte'
            )
            .subscribe({
              next: (value: any) => {
                this.backgroundChoices = {
                  name: value.background[0].name,
                  value: value.background[0].name + ' value',
                  content: [
                    { value: value.background[0].name + ' language_options', title: 'Language options', content: JSON.stringify(value.background[0].language_options) || 'placeholder'},
                    { value: value.background[0].name + ' starting_equipment_options', title: 'Starting equipment options', content: JSON.stringify(value.background[0].starting_equipment_options) || 'placeholder'},
                  ]
                }
              },
              error: (err) => alert(err)
            });
          },
          error: (err) => alert(err)
        })
      },
      error: (err) => alert(err)
    })
  }

  ngOnInit() {
  }

}
