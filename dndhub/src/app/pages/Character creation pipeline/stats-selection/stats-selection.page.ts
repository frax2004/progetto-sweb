import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonRow, IonCol, IonLabel, IonList, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';
import { RadioButtonComponent } from "src/app/components/radio-button/radio-button.component";
import { ButtonComponent } from "src/app/components/button/button.component";
import { DragEntryComponent } from "src/app/components/drag-entry/drag-entry.component";
import { Router } from '@angular/router';
import { Alerts, Navigate } from 'src/app/core/core';

import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { TitleComponent } from "src/app/components/title/title.component";
import { LabelComponent } from "src/app/components/label/label.component";
import { CharacterInstance, StatModifierString } from '../CharacterInformation';

@Component({
  selector: 'app-stats-selection',
  templateUrl: './stats-selection.page.html',
  styleUrls: ['./stats-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonGrid, IonRow, RadioButtonComponent, IonCol, IonLabel, ButtonComponent, CheckboxComponent, DragEntryComponent, TitleComponent, LabelComponent, IonList, IonRadioGroup, IonRadio]
})
export class StatsSelectionPage implements OnInit {
  manualSelection: Boolean = true;
  stdArray: Boolean = false;
  randomSelection: Boolean = false;
  showClass: any;
  showLevel: any;
  showSpecies: any;
  showBackground: any;

  currStats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  };

  arrayStandards = [
    [ { stat: 'strength', value: 15}, { stat: 'dexterity', value: 12}, { stat: 'constitution', value: 14}, {stat: 'intelligence', value: 8}, {stat: 'wisdom', value: 10}, {stat:'charisma', value: 13}], 
    [ { stat: 'strength', value: 8}, { stat: 'dexterity', value: 15}, { stat: 'constitution', value: 14}, {stat: 'intelligence', value: 13}, {stat: 'wisdom', value: 12}, {stat:'charisma', value: 10}], 
    [ { stat: 'strength', value: 14}, { stat: 'dexterity', value: 8}, { stat: 'constitution', value: 15}, {stat: 'intelligence', value: 12}, {stat: 'wisdom', value: 13}, {stat:'charisma', value: 8}], 
    [ { stat: 'strength', value: 8}, { stat: 'dexterity', value: 13}, { stat: 'constitution', value: 12}, {stat: 'intelligence', value: 15}, {stat: 'wisdom', value: 14}, {stat:'charisma', value: 10}], 
    [ { stat: 'strength', value: 14}, { stat: 'dexterity', value: 8}, { stat: 'constitution', value: 10}, {stat: 'intelligence', value: 13}, {stat: 'wisdom', value: 15}, {stat:'charisma', value: 12}], 
    [ { stat: 'strength', value: 10}, { stat: 'dexterity', value: 14}, { stat: 'constitution', value: 8}, {stat: 'intelligence', value: 13}, {stat: 'wisdom', value: 12}, {stat:'charisma', value: 15}], 
  ]
  
statColors: any = {
  strength: 'red',
  dexterity: 'green',
  constitution: 'brown',
  intelligence: 'blue',
  wisdom: 'purple',
  charisma: 'gold'
};

  stdArraySetStats(statsArray) {
    if (this.stdArray === false) return;
    for (const statistic of statsArray) {
      this.currStats[statistic.stat] = statistic.value;
    }
  }

   getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  rollStats(): number {
    let arr: number[] = [this.getRandomInt(6) + 1, this.getRandomInt(6) + 1, this.getRandomInt(6) + 1, this.getRandomInt(6) + 1];
    let min = Math.min(...arr);
    let sum = 0;
    for (let i = 0; i<4; i++) {
      sum += arr[i];
    }
    sum -= min;
    return sum;
  }

  randomizeStats() {
    if (this.randomSelection === false) return;
    this.currStats.strength = this.rollStats();
    this.currStats.dexterity = this.rollStats();
    this.currStats.constitution = this.rollStats();
    this.currStats.intelligence = this.rollStats();
    this.currStats.wisdom = this.rollStats();
    this.currStats.charisma = this.rollStats();
  }


  @ViewChild('strengthDragEntry') private strengthDragEntry: DragEntryComponent; 
  @ViewChild('dexterityDragEntry') private dexterityDragEntry: DragEntryComponent; 
  @ViewChild('constitutionDragEntry') private constitutionDragEntry: DragEntryComponent; 
  @ViewChild('intelligenceDragEntry') private intelligenceDragEntry: DragEntryComponent; 
  @ViewChild('wisdomDragEntry') private wisdomDragEntry: DragEntryComponent; 
  @ViewChild('charismaDragEntry') private charismaDragEntry: DragEntryComponent; 
  statModifierDict = StatModifierString;
  
  nextPage = () => {
    if (this.manualSelection === true) {
      this.currStats.strength = this.strengthDragEntry.value;
      this.currStats.dexterity = this.dexterityDragEntry.value;
      this.currStats.constitution = this.constitutionDragEntry.value;
      this.currStats.wisdom = this.wisdomDragEntry.value;
      this.currStats.intelligence = this.intelligenceDragEntry.value;
      this.currStats.charisma = this.charismaDragEntry.value;
    }
    const validateStrength: boolean = this.currStats.strength >0;
    const validateDexterity: boolean = this.currStats.dexterity >0;
    const validateConstitution: boolean = this.currStats.constitution >0;
    const validateIntelligence: boolean = this.currStats.intelligence >0;
    const validateWisdom: boolean = this.currStats.wisdom >0;
    const validateCharisma: boolean = this.currStats.charisma >0;
    if (
      validateStrength &&
      validateDexterity &&
      validateConstitution &&
      validateIntelligence &&
      validateWisdom &&
      validateCharisma
    ) {
      CharacterInstance.setStatistics('strength',this.currStats.strength);
      CharacterInstance.setStatistics('dexterity',this.currStats.dexterity);
      CharacterInstance.setStatistics('constitution',this.currStats.constitution);
      CharacterInstance.setStatistics('intelligence',this.currStats.intelligence);
      CharacterInstance.setStatistics('wisdom',this.currStats.wisdom);
      CharacterInstance.setStatistics('charisma',this.currStats.charisma);
      this.router.navigate(['option-selection']);
    }
    else {
      Alerts.personalizedMessage('There is still at least one statistic set to 0. Set your statistics to progress.','Unset statistic')
    }
  }

  // da fare mi raccomando
  //da levare parte randomica e array standard
  buttonCallbacks = {
    manual: { onClick: () => {
      this.manualSelection=true;
      this.stdArray=false;
      this.randomSelection=false;
      } 
    },

    stdArr: { onClick: () => {
      this.manualSelection=false;
      this.stdArray=true;
      this.randomSelection=false;
      } 
    },

    random: { onClick: () => {
      this.manualSelection=false;
      this.stdArray=false;
      this.randomSelection=true;
      this.randomizeStats();
      } 
    },
    previousPage: { onClick: Navigate.toPath(this.router,'background-selection')},
    nextPage: { onClick: this.nextPage},
  };

 

  lingue = [
    { name: 'Comune', id: 1, selector : false},
    { name: 'Elfico', id: 2, selector : false},
    { name: 'Nanico', id: 3, selector : false},
    { name: 'Orchesco', id: 4, selector : false},
    { name: 'Goblin', id: 5, selector : false},
    { name: 'Draconico', id: 6, selector : false},
  ];  

  LingueSelezionate: string[] = [];
  maxLingue = 3;

onLanguageSelect(lingua: any) {

  const name = lingua.name;

  const index = this.LingueSelezionate.indexOf(name);

  if (index !== -1) {
    this.LingueSelezionate.splice(index, 1);
    return;
  }

  if (this.LingueSelezionate.length < this.maxLingue) {
    this.LingueSelezionate.push(name);
  }
}

  constructor(private router: Router) {
    this.showClass = CharacterInstance.chosenClass;
    this.showLevel = CharacterInstance.chosenLevel;
    this.showSpecies = CharacterInstance.chosenSpecies;
    this.showBackground = CharacterInstance.chosenBackground;
   }

  ngOnInit() {
  }

}
