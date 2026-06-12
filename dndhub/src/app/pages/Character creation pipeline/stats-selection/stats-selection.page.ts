import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonRow, IonCol, IonLabel, IonList } from '@ionic/angular/standalone';
import { RadioButtonComponent } from "src/app/components/radio-button/radio-button.component";
import { ButtonComponent } from "src/app/components/button/button.component";
import { DragEntryComponent } from "src/app/components/drag-entry/drag-entry.component";
import { Router } from '@angular/router';
import { Navigate } from 'src/app/core/core';

import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { TitleComponent } from "src/app/components/title/title.component";
import { LabelComponent } from "src/app/components/label/label.component";
import { StatModifierString } from '../CharacterInformation';

@Component({
  selector: 'app-stats-selection',
  templateUrl: './stats-selection.page.html',
  styleUrls: ['./stats-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonGrid, IonRow, RadioButtonComponent, IonCol, IonLabel, ButtonComponent, CheckboxComponent, DragEntryComponent, TitleComponent, LabelComponent, IonList]
})
export class StatsSelectionPage implements OnInit {
  manualSelection: Boolean = true;
  stdArray: Boolean = false;
  randomSelection: Boolean = false;
  
  @ViewChild('strenghtDragEntry') private strenghtDragEntry: DragEntryComponent; 
  @ViewChild('dexterityDragEntry') private dexterityDragEntry: DragEntryComponent; 
  @ViewChild('constitutionDragEntry') private constitutionDragEntry: DragEntryComponent; 
  @ViewChild('intelligenceDragEntry') private intelligenceDragEntry: DragEntryComponent; 
  @ViewChild('wisdomDragEntry') private wisdomDragEntry: DragEntryComponent; 
  @ViewChild('charismaDragEntry') private charismaDragEntry: DragEntryComponent; 
  statModifierDict = StatModifierString;
  
  nextPage = () => {
    //da sistemare 
    this.router.navigate(['/spell-selection']);
  }

  // da fare mi raccomando
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
      } 
    },
    previousPage: { onClick: Navigate.toPath(this.router,'option-selection')},
    nextPage: { onClick: this.nextPage},
  };


  radios = [
    { listElementValue: 'Array1', text: 'Array1: bla bla bòa', class: 'radio'},
    { listElementValue: 'Array2', text: 'Array2: bla bla bòa', class: 'radio'},
  ]

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  rollStats(): string {
    let arr: number[] = [this.getRandomInt(6) + 1, this.getRandomInt(6) + 1, this.getRandomInt(6) + 1, this.getRandomInt(6) + 1];
    let min = Math.min(...arr);
    let sum = 0;
    for (let i = 0; i<4; i++) {
      sum += arr[i];
    }
    sum -= min;
    return sum.toString();
  }

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
