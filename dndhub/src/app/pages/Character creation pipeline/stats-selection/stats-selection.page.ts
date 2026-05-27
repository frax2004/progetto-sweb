import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonRow, IonCol, IonLabel } from '@ionic/angular/standalone';
import { RadioButtonComponent } from "src/app/components/radio-button/radio-button.component";
import { ButtonComponent } from "src/app/components/button/button.component";
import { DragEntryComponent } from "src/app/components/drag-entry/drag-entry.component";

@Component({
  selector: 'app-stats-selection',
  templateUrl: './stats-selection.page.html',
  styleUrls: ['./stats-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonGrid, IonRow, RadioButtonComponent, IonCol, IonLabel, ButtonComponent, DragEntryComponent]
})
export class StatsSelectionPage implements OnInit {
  manualSelection: Boolean = true;
  stdArray: Boolean = false;
  randomSelection: Boolean = false;

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


  constructor() { }

  ngOnInit() {
  }

}
