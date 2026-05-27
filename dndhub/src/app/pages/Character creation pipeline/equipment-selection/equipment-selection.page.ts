import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonItem, IonLabel, IonRow, IonGrid, IonFooter } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { PopoverController } from '@ionic/angular/standalone';
import { Popups } from 'src/app/core/core';
import { DragEntryComponent } from "src/app/components/drag-entry/drag-entry.component";

@Component({
  selector: 'app-equipment-selection',
  templateUrl: './equipment-selection.page.html',
  styleUrls: ['./equipment-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonItem, IonLabel, IonRow, IonGrid, ButtonComponent, IonFooter, DragEntryComponent]
})
export class EquipmentSelectionPage implements OnInit {
  budgetTotale: Number = 300;
  objects = [
    { nome: 'Spada lunga', costo: 15, descrizione: "1d8 danni taglienti, proprietà versatile, gittata 1,5 m e così via"},
    { nome: 'Spada corta', costo: 10, descrizione: "1d6 danni taglienti, proprietà versatile, gittata 1,5 m e così via"},
    { nome: 'Giavellotto', costo: 0.5, descrizione: "0.5 sta a indicare il fatto che costi 5 monete d'argento"},
  ];

  buttonCallbacks = {
    nextPage: { onClick: Popups.ofSimpleText(this.popoverController,'Pagina seguente non ancora implementata')},
  };


  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

}
