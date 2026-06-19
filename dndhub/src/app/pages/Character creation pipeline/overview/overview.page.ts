import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonRow, IonCol, IonGrid, IonLabel, IonInput, PopoverController, IonList, IonTextarea } from '@ionic/angular/standalone';
import { ScrollBarComponent } from "src/app/components/scrollbar/scrollbar.component";
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { EntryComponent } from "src/app/components/entry/entry.component";
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from "src/app/components/button/button.component";
import { Navigate, Popups } from 'src/app/core/core';
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
  classDetails;
  allEquipmentArray = [];
  //
  averageHP: boolean = true;
  manualHP: boolean = false;
  constitutionMod: number = +3;
  lvl: number = 7;
  HPdice: number = 8;
  avHPlabel: String = this.constitutionMod>0 ? 
  'I punti ferita del personaggio saranno: ' + this.calcAverageHP() + ' + ' + (StatModifierNumber[this.finalStatistics['constitution']] * CharacterInstance.chosenLevel) + ' = ' + (this.calcAverageHP() + (StatModifierNumber[this.finalStatistics['constitution']] * CharacterInstance.chosenLevel))
  :
  'I punti ferita del personaggio saranno: ' + this.calcAverageHP() + ' - ' + ((StatModifierNumber[this.finalStatistics['constitution']] * CharacterInstance.chosenLevel) * (-1)) + ' = ' + (this.calcAverageHP() + (StatModifierNumber[this.finalStatistics['constitution']] * CharacterInstance.chosenLevel));

  previousPage = () => {
    const className = CharacterInstance.chosenClass.toLowerClass();
    const validateSpellSelection = (className!==undefined) && (className === 'bard' || className === 'cleric' || className === 'druid' || className === 'paladin' || className === 'ranger' || className === 'sorcerer' || className === 'warlock' || className === 'wizard');
    if (validateSpellSelection) this.router.navigate(['spell-selection']);
    else this.router.navigate(['option-selection']);
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
    completeChar: { onClick: Popups.ofSimpleText(this.popoverController,'Pagina non ancora implementata')},
    previousPage: { onClick: this.previousPage}
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

  minHP() {
    return CharacterInstance.hitDie + (CharacterInstance.chosenLevel - 1) + (StatModifierNumber[this.finalStatistics['constitution']] * CharacterInstance.chosenLevel);
  }

  maxHP() {
    return CharacterInstance.hitDie + ((CharacterInstance.chosenLevel - 1) * CharacterInstance.hitDie) + (StatModifierNumber[this.finalStatistics['constitution']] * CharacterInstance.chosenLevel);
  }

  HPrange() {
    return '(' + this.minHP() + '-' + this.maxHP() + ')'; 
  }

  calcAverageHP() {
    return Math.ceil((CharacterInstance.hitDie/2 + 0.5)*CharacterInstance.chosenLevel);
  }

  static getFinalStatistic(statName) {
    if(CharacterInstance.speciesAbilityBonus === undefined) return 0;
    return CharacterInstance.getStatisticValue(statName) +
           CharacterInstance.speciesAbilityBonus[statName] +
           CharacterInstance.chosenSpeciesAbilityBonuses[statName] +
           CharacterInstance.chosenAbilityScoreIncrements[statName];
  }

  static generateAllEquipment() {
    //da finire
    CharacterInstance.backgroundEquipment.array.forEach(element => console.log(element));
    console.log('\n-----------\n');
    CharacterInstance.baseEquipment.array.forEach(element => console.log(element));
    console.log('\n-----------\n');
    CharacterInstance.chosenOptionalEquipment.array.forEach(element => console.log(element));
    console.log('\n-----------\n');
    CharacterInstance.chosenBackgroundEquipment.array.forEach(element => console.log(element));
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
    }

    
    this.characterManagement
    .displayClassByName(
      CharacterInstance.chosenClass || 'fighter'
    )
    .subscribe({
      next: (value: any) => {
        this.classDetails = {
          name: value.classes.name,
          hit_die: value.classes.hit_die,
          proficiencies: value.classes.proficiencies,
          saving_throws: value.classes.saving_throws,
          starting_equipment: value.classes.starting_equipment
        };
      },
      error: (err) => alert(err)
    })
  }

  ngOnInit() {
  }

}
