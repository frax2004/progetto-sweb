import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, PopoverController, IonFooter, IonAccordionGroup, IonAccordion, IonThumbnail, IonLabel, IonButton, IonAlert } from '@ionic/angular/standalone';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { Accordion } from 'src/app/components/accordion/Accordion';
import { Button } from 'src/app/components/button/Button';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { Navigate, Popups } from 'src/app/core/core';
import { Router } from '@angular/router';
import { TitleComponent } from "src/app/components/title/title.component";
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { LabelComponent } from "src/app/components/label/label.component";
import { dnd } from 'dbserver/database.queries';
import { CharacterInstance } from '../CharacterInformation';

@Component({
  selector: 'app-background-selection',
  templateUrl: './background-selection.page.html',
  styleUrls: ['./background-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, AccordionComponent, IonFooter, ButtonComponent, TitleComponent, IonAccordionGroup, IonAccordion, IonThumbnail, IonLabel, LabelComponent, IonButton, IonAlert]
})
export class BackgroundSelectionPage implements OnInit {

  showClass: string;
  showLevel: number;
  showSpecies: string;
  nextPageAlertOpen: boolean = false;

  nextPage = () => {
    if (this.selectedBackground !== undefined) {
      for (const background of this.backgroundsArray) {
        if (background.name.toLowerCase() === this.selectedBackground.toLowerCase()){
          CharacterInstance.backgroundEquipment = background.equipment;
          CharacterInstance.backgroundFeature = background.feature;
          CharacterInstance.backgroundStartingGold = background.starting_gold;
          CharacterInstance.backgroundProficiencies = background.starting_proficiencies;
        }
      }
      CharacterInstance.chosenBackground = this.selectedBackground;
      this.router.navigate(['/stats-selection']);
    }
    else this.setOpenAlert(true);
  }

  setOpenAlert(isOpen: boolean) {
    this.nextPageAlertOpen = isOpen;
  } 

  buttonCallbacks = {
    nextPage: { onClick: this.nextPage},
    previousPage: { onClick: Navigate.toPath(this.router,'species-selection')},
  }

  static bgsDescription = {
    'Acolyte': 'You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric—performing sacred rites is not the same thing as channeling divine power.',
  };
  backgroundsArray = [];

  selectedBackground: string = undefined;
  placeholderAlert(event: Event) {alert('Non ancora implementato');}

  static displayProficiencies(bgName,stProf: dnd.APIReference[]) {
    if(stProf.length === 0) return undefined;
    let retValue = bgName + ' grants the following proficiencies:\n';

    for (const prof of stProf) {
      retValue = retValue + '\n- ' + prof.name;
    }

    return retValue;
  }

  // per qualche motivo le lingue non fungono quindi le sto scrivendo a mano

  static allLanguages= [
  'Common',
  'Common Sign Language',
  'Draconic',
  'Dwarvish',
  'Elvish',
  'Giant',
  'Gnomish',
  'Goblin',
  'Halfling',
  'Orc',
  'Abyssal',
  'Celestial',
  'Deep Speech',
  'Druidic',
  'Infernal',
  'Primordial',
  'Sylvan',
  'Thieves Cant',
  'Undercommon',
  ]

  static generateBaseEquipment(startingEquipment: dnd.StartingEquipment[]) {
    let retArray = [];
    for (const el of startingEquipment) {
      let retEl = {
        index: el.equipment.index,
        name: el.equipment.name,
        quantity: el.quantity
      };
      retArray.push(retEl);
    }

    return retArray;
  }

  static generateProficiencies(proficiencies: dnd.APIReference[]) {
    let retArray = [];
    for (const el of proficiencies) {
      retArray.push({
        index: el.index,
        name: el.name,
      });
    }

    return retArray;
  }

  static displayLanguages(bgName, languages: dnd.Choice) {
    let retValue = bgName + ' can choose ' + languages.choose + ' languages among the following:\n';
    for(const lang of this.allLanguages) {
      retValue = retValue + '\n- ' + lang;
    }

    return retValue;
  }

  static displayStartingEquipment(bgName, equip: dnd.StartingEquipment[]) {
    let retValue = bgName + ' grants the following starting equipment:\n';
    for (const eq of equip) {
      retValue = retValue + '\n- ' + eq.equipment.name + ' x' + eq.quantity;
    }

    return retValue;
  }

  static displayStartingEquipmentOptions(bgName: string, equipOpt: dnd.Choice[]) {
    if (equipOpt.length === 0) return undefined;
    let retValue = bgName + ' lets you choose the following equipment:\n';
    for (const eq of equipOpt) {
      retValue = retValue + '\n- ' + eq.from.equipment_category.name + ' x' + eq.choose;
    }

    return retValue;
  }

  constructor(public popoverController: PopoverController, private router: Router, private bgsDisplayer: CharacterManagementService) {
    this.showClass = CharacterInstance.chosenClass;
    this.showLevel = CharacterInstance.chosenLevel;
    this.showSpecies = CharacterInstance.chosenSpecies;

    const createButton = (name) => {
      return (event: Event) => this.selectedBackground = name;
    }

    this.bgsDisplayer
    .displayBackgrounds()
    .subscribe({
      next: (value: any) => {
        this.backgroundsArray = value.backgrounds.map(function (item: any){
          return {
            desc: BackgroundSelectionPage.bgsDescription[item.name],
            value: item.name + ' accordion',
            imageURL: "../assets/icon/d20.svg",
            name: item.name,
            btnCtx: createButton(item.name),
            starting_gold: item.starting_gold,
            starting_proficiencies: BackgroundSelectionPage.generateProficiencies(item.starting_proficiencies),
            feature: item.feature,
            equipment: BackgroundSelectionPage.generateBaseEquipment(item.starting_equipment),
            content: [
              { value: "starting_gold accordion",  title: "Starting Gold", content: item.name + ` has ` + item.starting_gold.quantity + ` ` + item.starting_gold.unit},
              { value: "feature accordion",  title: "Feature: " + item.feature.name, content: item.feature.desc},
              { value: "starting_proficiencies accordion",  title: "Starting Proficiencies", content: BackgroundSelectionPage.displayProficiencies(item.name,item.starting_proficiencies)},
              { value: "language_options accordion",  title: "Language Options", content: BackgroundSelectionPage.displayLanguages(item.name,item.language_options)},
              { value: "starting_equipment accordion",  title: "Starting Equipment", content: BackgroundSelectionPage.displayStartingEquipment(item.name,item.starting_equipment)},
              { value: "starting_equipment_options accordion",  title: "Starting Equipment Options", content: BackgroundSelectionPage.displayStartingEquipmentOptions(item.name,item.starting_equipment_options)},              
              //ideals, bond, flaws e personality traits non li sto mettendo perchè sono (parzialmente) legati all'alignment che stiamo saltando
            ],
          };
        });
      },
      error: (err) => console.log(err)
    });
  }

  ngOnInit() {
  }

}
