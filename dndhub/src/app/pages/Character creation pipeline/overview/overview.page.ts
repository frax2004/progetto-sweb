import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonRow, IonCol, IonGrid, IonLabel, IonInput, PopoverController } from '@ionic/angular/standalone';
import { ScrollBarComponent } from "src/app/components/scrollbar/scrollbar.component";
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { EntryComponent } from "src/app/components/entry/entry.component";
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from "src/app/components/button/button.component";
import { Popups } from 'src/app/core/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ScrollBarComponent, IonItem, IonRow, IonCol, IonGrid, IonLabel, AccordionComponent, IonInput, EntryComponent, TextAreaComponent, ButtonComponent]
})
export class OverviewPage implements OnInit {
  averageHP: boolean = true;
  manualHP: boolean = false;
  constitutionMod: number = +3;
  lvl: number = 7;
  HPdice: number = 8;
  avHPlabel: String = this.constitutionMod>0 ? 
  'I punti ferita del personaggio saranno: ' + this.calcAverageHP(this.lvl,this.HPdice) + ' + ' + this.constitutionMod + ' = ' + (this.calcAverageHP(this.lvl,this.HPdice) + this.constitutionMod)
  :
  'I punti ferita del personaggio saranno: ' + this.calcAverageHP(this.lvl,this.HPdice) + ' - ' + (this.constitutionMod * (-1)) + ' = ' + (this.calcAverageHP(this.lvl,this.HPdice) + this.constitutionMod);

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
    completeChar: { onClick: Popups.ofSimpleText(this.popoverController,'Pagina non ancora implementata')}
  };

  accordions = [
    {  value:'classAcc', title: 'Classe', content: 'Descrizione relativa all\'identità della classe e le sue abilità'},
    {  value:'speciesAcc', title: 'Specie', content: 'Descrizione relativa all\'identità della specie e le sue abilità'},
    {  value:'talentsAcc', title: 'Talenti', content: 'Descrizione relativa ai talenti del personaggio'},
    {  value:'equipAcc', title: 'Equipaggiamento', content: 'Equipaggiamenti del personaggio + relative quantità'},
    { value: 'spellsAcc', title: 'Incantesimi', content: 'Quali incantesimi ha il personaggio + lvl dell\'incantesimo + slot incantesimo'},
    {  value:'languageAcc', title: 'Lingue parlate', content: 'Quali lingue parla il personaggio'},
    {  value:'statsAcc', title: 'Statistiche', content: 'Statistiche pg + modificatori + tiri salvezza'},
    {  value:'profAcc', title: 'Competenze', content: 'Competenze del personaggio'},
    // mi dimentico qualcosa?
  ];

  HPrange(lvl: number, HPdice: number) {
    return '(' + lvl.toString() + '-' + (HPdice*lvl).toString() + ')'; 
  }

  calcAverageHP(lvl: number, HPdice: number) {
    return Math.ceil((HPdice/2 + 0.5)*lvl);
  }

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

}
