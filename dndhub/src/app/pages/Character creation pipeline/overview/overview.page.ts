import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonRow, IonCol, IonGrid, IonLabel, IonInput, PopoverController, IonList, IonTextarea } from '@ionic/angular/standalone';
import { ScrollBarComponent } from "src/app/components/scrollbar/scrollbar.component";
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { EntryComponent } from "src/app/components/entry/entry.component";
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from "src/app/components/button/button.component";
import { Alerts, Navigate, Popups } from 'src/app/core/core';
import { TitleComponent } from "src/app/components/title/title.component";
import { LabelComponent } from "src/app/components/label/label.component";
import { UnorderedListElementComponent } from "src/app/components/unordered-list-element/unordered-list-element.component";
import { Router } from '@angular/router';
import { CharacterInstance, StatModifierNumber } from '../CharacterInformation';
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { DragEntryComponent } from "src/app/components/drag-entry/drag-entry.component";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ScrollBarComponent, IonItem, IonRow, IonCol, IonGrid, IonLabel, AccordionComponent, IonInput, EntryComponent, TextAreaComponent, ButtonComponent, TitleComponent, LabelComponent, IonList, UnorderedListElementComponent, IonTextarea, DragEntryComponent]
})
export class OverviewPage implements OnInit {
  showLevel: number;
  showBackground: string;
  showClass: string;
  showSpecies: string;
  showSubspecies: string;
  showSubclass: string;
  showSize: string;
  showSpeed: string;
  finalStatistics = [
    { statName: 'strength', value: 0},
    { statName: 'dexterity', value: 0},
    { statName: 'constitution', value: 0},
    { statName: 'intelligence', value: 0},
    { statName: 'wisdom', value: 0},
    { statName: 'charisma', value: 0},
  ];
  conValue: number = 0;
  classDetails;
  //
  allEquipmentArray = [];
  allProficienciesArray = [];
  allLanguagesArray = [];
  //
  imgURL: string;
  characterName: string;
  //
  averageHP: boolean = true;
  manualHP: boolean = false;
  @ViewChild('hpEntry') private hpEntry: DragEntryComponent;
  chosenHP: number = 0;

  previousPage = () => {
    const className = CharacterInstance.chosenClass.toLowerClass();
    const validateSpellSelection = (className!==undefined) && (className === 'bard' || className === 'cleric' || className === 'druid' || className === 'paladin' || className === 'ranger' || className === 'sorcerer' || className === 'warlock' || className === 'wizard');
    if (validateSpellSelection) this.router.navigate(['spell-selection']);
    else this.router.navigate(['option-selection']);
  }


  completeChar = () => {
    if (this.averageHP === true) {
      this.chosenHP = this.calcAverageHP();
    }
    else {
      if (this.hpEntry.value>=this.minHP() && this.hpEntry.value<=this.maxHP()) {
        this.chosenHP = this.hpEntry.value;
      }
      else {
        Alerts.personalizedMessage('The inserted Hit Points value is not valid, please insert a value within range','Chosen Hit Points invalid')
        return undefined;
      }
    }

    for (const stat of this.finalStatistics) {
      CharacterInstance.setStatistics(stat.statName,stat.value);
    }

    this.characterManagement
    .insertCharacter(
      this.characterName,
      this.chosenHP,
      this.imgURL,
      CharacterInstance.chosenClass,
      CharacterInstance.chosenSubclass,
      CharacterInstance.chosenSpecies,
      CharacterInstance.chosenSubspecies,
      CharacterInstance.chosenBackground,
      CharacterInstance.chosenLevel,
      CharacterInstance.levelSpecifics,
      this.allEquipmentArray,
      this.allProficienciesArray,
      this.allLanguagesArray,
      CharacterInstance.speciesTraits,
      CharacterInstance.speciesSpeed,
      CharacterInstance.speciesSize,
      CharacterInstance.backgroundStartingGold,
      CharacterInstance.backgroundFeature,
      CharacterInstance.statistics,
      CharacterInstance.spellsKnown,
      CharacterInstance.cantripsKnown,
      CharacterInstance.chosenSpells,
      CharacterInstance.chosenCantrips
    ).subscribe({
      next: (value: any) => {
        Alerts.personalizedMessage('GOOOOOOODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOQOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO','PERSONAGGIO CARICATO!');
      },
      error: (err) => {
        Alerts.message(err.error.message);
      }
    });
  }

  buttonCallbacks = {
    avHP: { onClick: () => {
        this.averageHP = true;
        this.manualHP = false;
      }
    },
    manHP: { onClick: () => {
        this.averageHP = false;
        this.manualHP = true;
      }
    },
    completeChar: { onClick: this.completeChar},
    previousPage: { onClick: this.previousPage}
  };

  minHP() {
    return CharacterInstance.hitDie + (CharacterInstance.chosenLevel - 1) + (StatModifierNumber[this.conValue] * CharacterInstance.chosenLevel);
  }

  maxHP() {
    return CharacterInstance.hitDie + ((CharacterInstance.chosenLevel - 1) * CharacterInstance.hitDie) + (StatModifierNumber[this.conValue] * CharacterInstance.chosenLevel);
  }

  HPrange() {
    return '(' + this.minHP() + '-' + this.maxHP() + ')'; 
  }

  calcAverageHP() {
    return CharacterInstance.hitDie + Math.ceil((CharacterInstance.hitDie/2 + 0.5)*(CharacterInstance.chosenLevel - 1)) + (StatModifierNumber[this.conValue] * CharacterInstance.chosenLevel);
  }

  static getFinalStatistic(statName) {
    if(CharacterInstance.speciesAbilityBonus === undefined) return 0;
    return CharacterInstance.getStatisticValue(statName) +
           CharacterInstance.speciesAbilityBonus[statName] +
           CharacterInstance.chosenSpeciesAbilityBonuses[statName] +
           CharacterInstance.chosenAbilityScoreIncrements[statName];
  }

  static generateAllEquipment() {
    let equipArray = [];
    //da finire
    for(const equip of CharacterInstance.backgroundEquipment) {
      equipArray.push({
        idx: equip.index.trim(),
        quantity: equip.quantity,
      });
    }

    for(const equip of CharacterInstance.baseEquipment) {
      equipArray.push({
        idx: equip.index.trim(),
        quantity: equip.quantity,
      });
    }

    for(const equip of CharacterInstance.backgroundEquipment) {
      equipArray.push({
        idx: equip.index.trim(),
        quantity: equip.quantity,
      });
    }

    //questi ultimi due array sono salvati in maniera diversa
    for(const equip of CharacterInstance?.chosenOptionalEquipment) {
      if (equip.includes('+')) {
        for (const subEquip of equip.split('+')) {
          equipArray.push({
            idx: subEquip.toLowerCase().trim(),
            quantity: 1,
          });    
        }
      }
      else {
        equipArray.push({
          idx: equip.toLowerCase().trim(),
          quantity: 1,
        });
      }
    }

    for(const equip of CharacterInstance?.chosenBackgroundEquipment) {
      equipArray.push({
        idx: equip.toLowerCase().trim(),
        quantity: 1,
      });
    }

    return equipArray;
  }

  static generateAllProficiencies() {
    let profArray = [];

    for(const prof of CharacterInstance.baseProficiencies) {
      profArray.push({
        idx: prof.index.trim(),
        name: prof.name,
      });
    }

    for(const prof of CharacterInstance.baseSavingThrows) {
      profArray.push({
        idx: prof.index.trim(),
        name: prof.fullName,
      });
    }

    for(const prof of CharacterInstance.chosenRegularProficiencies) {
      profArray.push({
        idx: prof.toLowerCase().trim(),
        name: prof,
      });
    }

    for(const prof of CharacterInstance.chosenExtraProficiencies) {
      profArray.push({
        idx: prof.toLowerCase().trim(),
        name: prof,
      });
    }

    return profArray;
  }

  static generateAllLanguages() {
    let langArray = [];

    for (const language of CharacterInstance.speciesLanguages) {
      langArray.push(language.index.trim());
    }

    for (const language of CharacterInstance.chosenLanguages) {
      langArray.push(language.toLowerCase().trim());
    }

    for (const language of CharacterInstance.chosenBackgroundLanguages) {
      langArray.push(language.toLowerCase().trim());
    }

    return langArray;
  }

  constructor(private router: Router, public popoverController: PopoverController, private characterManagement: CharacterManagementService) { 
    this.showLevel = CharacterInstance.chosenLevel;
    this.showBackground = CharacterInstance.chosenBackground;
    this.showClass = CharacterInstance.chosenClass;
    this.showSpecies = CharacterInstance.chosenSpecies;
    this.showSubspecies = CharacterInstance.chosenSubspecies;
    this.showSubclass = CharacterInstance.chosenSubclass;
    this.showSpeed = CharacterInstance.speciesSpeed;
    this.showSize = CharacterInstance.speciesSize;
    for(let i=0; i<this.finalStatistics.length; i++) {
      this.finalStatistics[i].value = OverviewPage.getFinalStatistic(this.finalStatistics[i].statName);
      this.finalStatistics[i].value = this.finalStatistics[i].value > 20 ? 20 : this.finalStatistics[i].value;
      if (this.finalStatistics[i].statName==='constitution') this.conValue = this.finalStatistics[i].value; 
    }
    
    this.allEquipmentArray = OverviewPage.generateAllEquipment();
    this.allProficienciesArray = OverviewPage.generateAllProficiencies();
    this.allLanguagesArray =OverviewPage.generateAllLanguages();
  }

  ngOnInit() {
  }

}
