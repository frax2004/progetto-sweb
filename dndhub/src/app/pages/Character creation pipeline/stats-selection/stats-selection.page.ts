import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonRow, IonCol, IonLabel } from '@ionic/angular/standalone';
import { RadioButtonComponent } from "src/app/components/radio-button/radio-button.component";

@Component({
  selector: 'app-stats-selection',
  templateUrl: './stats-selection.page.html',
  styleUrls: ['./stats-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonGrid, IonRow, RadioButtonComponent, IonCol, IonLabel]
})
export class StatsSelectionPage implements OnInit {
  groupValue: String = 'pageRadio';
  radioPersonalChoice = [
    { listElementValue: 'radioPersonalChoice', text: '', class: 'pageRadio'},
  ];


  constructor() { }

  ngOnInit() {
  }

}
