import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-species-selection',
  templateUrl: './species-selection.page.html',
  styleUrls: ['./species-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SpeciesSelectionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
