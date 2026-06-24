import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel as IonLabel, IonCheckbox } from '@ionic/angular/standalone';
import { TitleComponent } from "src/app/components/title/title.component";
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { CharacterInstance, StatModifierNumber } from '../CharacterInformation';
import { LabelComponent } from "src/app/components/label/label.component";
import { dnd } from 'dbserver/database.queries';
import { Alerts, Navigate, Popups } from 'src/app/core/core';
import { PopoverController } from '@ionic/angular/standalone';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-spell-selection',
  templateUrl: './spell-selection.page.html',
  styleUrls: ['./spell-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TitleComponent, LabelComponent, IonList, IonLabel, IonCheckbox, ButtonComponent]
})
export class SpellSelectionPage implements OnInit {
  levelRow;
  spells;
  displayableSpells;
  maxLevel: number;
  spellLevels = ['0','1','2','3','4','5','6','7','8','9'];
  cantripsToChoose;
  spellsToChoose;
  // due di questi array mi servono per gli oggetti incantesimi, gli altri due per controlli
  chosenCantrips = [];
  chosenSpells = [];
  checkedCantrips = [];
  checkedSpells = [];

  
  nextPage = () => {
    if(this.cantripsToChoose !==0 ) {
      Alerts.personalizedMessage('You still have ' + this.cantripsToChoose + ' cantrips to choose', 'Not enough cantrips!');
    }
    else if (this.spellsToChoose !==0) {
      Alerts.personalizedMessage('You still have ' + this.spellsToChoose + ' spells to choose', 'Not enough spells!');
    }
    else {
      CharacterInstance.chosenCantrips = this.chosenCantrips;
      CharacterInstance.chosenSpells = this.chosenSpells
      //
      this.router.navigate(['/overview']);
    }
  }
  
  buttonCallbacks = {
    previousPage: { onClick: Navigate.toPath(this.router,'option-selection')},
    nextPage: { onClick: this.nextPage},
  };
  static SPELLS_LOADER_THRESHOLD: any;

  
  static calcMaxSpellSlotLevel(levelRow: dnd.Level): number {
    if (levelRow.spell_slots_level_9 !== 0 && levelRow.spell_slots_level_9 !== undefined && levelRow.spell_slots_level_9 !== null) return 9;
    if (levelRow.spell_slots_level_8 !== 0 && levelRow.spell_slots_level_8 !== undefined && levelRow.spell_slots_level_8 !== null) return 8;
    if (levelRow.spell_slots_level_7 !== 0 && levelRow.spell_slots_level_7 !== undefined && levelRow.spell_slots_level_7 !== null) return 7;
    if (levelRow.spell_slots_level_6 !== 0 && levelRow.spell_slots_level_6 !== undefined && levelRow.spell_slots_level_6 !== null) return 6;
    if (levelRow.spell_slots_level_5 !== 0 && levelRow.spell_slots_level_5 !== undefined && levelRow.spell_slots_level_5 !== null) return 5;
    if (levelRow.spell_slots_level_4 !== 0 && levelRow.spell_slots_level_4 !== undefined && levelRow.spell_slots_level_4 !== null) return 4;
    if (levelRow.spell_slots_level_3 !== 0 && levelRow.spell_slots_level_3 !== undefined && levelRow.spell_slots_level_3 !== null) return 3;
    if (levelRow.spell_slots_level_2 !== 0 && levelRow.spell_slots_level_2 !== undefined && levelRow.spell_slots_level_2 !== null) return 2;

    return 1;
  }

  static getDisplayableSpells(allSpells: any[], maxLevel: number) {
    // lo so che è brutto ma per qualche motivo un dizionario non funziona
    let lvl0 = [];
    let lvl1 = [];
    let lvl2 = [];
    let lvl3 = [];
    let lvl4 = [];
    let lvl5 = [];
    let lvl6 = [];
    let lvl7 = [];
    let lvl8 = [];
    let lvl9 = [];
    for(const spell of allSpells) {
      if(spell.level<=maxLevel) {
        if (spell.level===0) lvl0.push(spell); 
        if (spell.level===1) lvl1.push(spell); 
        if (spell.level===2) lvl2.push(spell); 
        if (spell.level===3) lvl3.push(spell); 
        if (spell.level===4) lvl4.push(spell); 
        if (spell.level===5) lvl5.push(spell); 
        if (spell.level===6) lvl6.push(spell); 
        if (spell.level===7) lvl7.push(spell); 
        if (spell.level===8) lvl8.push(spell); 
        if (spell.level===9) lvl9.push(spell); 
      }
    }

    return [lvl0,lvl1,lvl2,lvl3,lvl4,lvl5,lvl6,lvl7,lvl8,lvl9];
  }

  static getLevelRow(levelRowDisplayer: CharacterManagementService) {
    return new Promise((resolve,reject) =>{
      levelRowDisplayer
      .displayLevelRowByClassAndLevel(
        CharacterInstance.chosenLevel || 20,
        CharacterInstance.chosenClass || 'Wizard'
      )
      .subscribe({
        next: (value: any) => {
          resolve({
            name: value.level.name,
            level: value.level.level,
            cantrips_known: value.level.cantrips_known,
            spell_slots_level_1: value.level.spell_slots_level_1,
            spell_slots_level_2: value.level.spell_slots_level_2,
            spell_slots_level_3: value.level.spell_slots_level_3,
            spell_slots_level_4: value.level.spell_slots_level_4,
            spell_slots_level_5: value.level.spell_slots_level_5,
            spell_slots_level_6: value.level.spell_slots_level_6,
            spell_slots_level_7: value.level.spell_slots_level_7,
            spell_slots_level_8: value.level.spell_slots_level_8,
            spell_slots_level_9: value.level.spell_slots_level_9,
            spells_known: value.level.spells_known,
          });
      },
      error: (err) => reject(err)
      });
    });
  }

  displaySpellDescription(spell) {
    const desc = `Action Type: ${spell.action_type}\nCasting Time: ${spell.casting_time}\nCasting Trigger: ${spell.casting_trigger}\nRange: ${spell.range}\nComponents: ${spell.components}\nMaterial: ${spell.material}\nDuration: ${spell.duration}\nConcentration: ${spell.concentration}\nRitual: ${spell.ritual}\n\n${spell.description}\n\nAt Higher Levels: ${spell.higher_level_slot}`;
    return Popups.ofSimpleText(this.popoverController,desc);
  }

  displayCantripDescription(spell) {
    const desc = `Casting Time: ${spell.action_type}\nCasting Time: ${spell.casting_time}\nCasting Trigger: ${spell.casting_trigger}\nRange: ${spell.range}\nComponents: ${spell.components}\nMaterial: ${spell.material}\nDuration: ${spell.duration}\nConcentration: ${spell.concentration}\nRitual: ${spell.ritual}\n\n${spell.description}\n\nCantrip Upgrade: ${spell.cantrip_upgrade}`;
    return Popups.ofSimpleText(this.popoverController,desc);
  }

  static getSpellsToChoose(className: string,level: number,spells_known: number | null) {
    if (spells_known !== null) return spells_known;
    else {
      className = className.toLowerCase();
      if (className === 'cleric' || className === 'druid') {
        let newValue = CharacterInstance.getStatisticValue('wisdom') + 
        CharacterInstance.speciesAbilityBonus['wisdom'] + 
        CharacterInstance.chosenSpeciesAbilityBonuses['wisdom'] + 
        CharacterInstance.chosenAbilityScoreIncrements['wisdom'];
        newValue = newValue > 20 ? 20 : newValue;
        return (level + StatModifierNumber[newValue]) > 1 ? level + StatModifierNumber[newValue] : 1;
      }
      if (className === 'paladin') {
        let newValue = CharacterInstance.getStatisticValue('charisma') + 
        CharacterInstance.speciesAbilityBonus['charisma'] +
        CharacterInstance.chosenSpeciesAbilityBonuses['charisma'] +
        CharacterInstance.chosenAbilityScoreIncrements['charisma'];
        newValue = newValue > 20 ? 20 : newValue;
        return (Math.floor(level/2) + StatModifierNumber[newValue]) > 1 ? Math.floor(level/2) + StatModifierNumber[newValue] : 1;
      }
      if (className === 'wizard') {
        let newValue = CharacterInstance.getStatisticValue('intelligence') +
        CharacterInstance.speciesAbilityBonus['intelligence'] +
        CharacterInstance.chosenSpeciesAbilityBonuses['intelligence'] +
        CharacterInstance.chosenAbilityScoreIncrements['intelligence'];
        newValue = newValue > 20 ? 20 : newValue;
        return (level + StatModifierNumber[newValue]) > 1 ? level + StatModifierNumber[newValue] : 1;
      }
    }
  }

  addCantrip(cantrip,boxValue) {
    if (this.checkedCantrips.includes(boxValue)) {
      this.checkedCantrips.splice(this.checkedCantrips.indexOf(boxValue),1);
      this.cantripsToChoose++;
    }
    else {
      if (this.cantripsToChoose === 0) {
        Alerts.personalizedMessage(this.checkedCantrips + '\n\nYou can\'t choose any more cantrips, uncheck a cantrip to choose a new one', 'Too many cantrips');
        const box = document.getElementById(`#${boxValue}`) as HTMLInputElement;
        box.checked = false;
      }
      else {
        this.checkedCantrips.push(boxValue);
        this.chosenCantrips.push(cantrip);
        this.cantripsToChoose--;
      }
    }
  }

  addSpell(spell,boxValue) {
    if (this.checkedSpells.includes(boxValue)) {
      this.checkedSpells.splice(this.checkedSpells.indexOf(boxValue),1);
      this.spellsToChoose++;
    }
    else {
      if (this.spellsToChoose === 0) {
        Alerts.personalizedMessage(this.checkedSpells + '\n\nYou can\'t choose any more spells, uncheck a spell to choose a new one', 'Too many spells!');
        const box = document.getElementById(`#${boxValue}`) as HTMLInputElement;
        box.checked = false;
      }
      else {
        this.checkedSpells.push(boxValue);
        // ricorda che questi incantesimi hanno un sacco di attributi (vedi sotto), sono di tipo dnd.Spell
        this.chosenSpells.push(spell);
        this.spellsToChoose--;
      }
    }
  }

  constructor(private router: Router, private levelRowDisplayer: CharacterManagementService, public popoverController: PopoverController) {
    //metto degli or ai fini del testing, da levare quando finiremo col sito
    this.levelRowDisplayer
    .displayLevelRowByClassAndLevel(
      CharacterInstance.chosenLevel, 
      CharacterInstance.chosenClass
    )
    .subscribe({
      next: (value: any) => {
        this.levelRow = {
            name: value.level.name,
            level: value.level.level,
            cantrips_known: value.level.cantrips_known,
            spell_slots_level_1: value.level.spell_slots_level_1,
            spell_slots_level_2: value.level.spell_slots_level_2,
            spell_slots_level_3: value.level.spell_slots_level_3,
            spell_slots_level_4: value.level.spell_slots_level_4,
            spell_slots_level_5: value.level.spell_slots_level_5,
            spell_slots_level_6: value.level.spell_slots_level_6,
            spell_slots_level_7: value.level.spell_slots_level_7,
            spell_slots_level_8: value.level.spell_slots_level_8,
            spell_slots_level_9: value.level.spell_slots_level_9,
            spells_known: value.level.spells_known,
          };
          this.levelRowDisplayer
          .displaySpellsByClass(
            CharacterInstance.chosenClass
          )
          .subscribe({
            next: (value: any) => {
              this.spells = value.spells.map(function (item: any) {
                return {
                  name: item.name,
                  level: item.level,
                  action_type: item.action_type,
                  concentration: item.concentration,
                  ritual: item.ritual,
                  range: item.range,
                  material: item.material,
                  duration: item.duration,
                  description: item.description,
                  components: item.components,
                  cantrip_upgrade: item.cantrip_upgrade,
                  higher_level_slot: item.higher_level_slot,
                  casting_trigger: item.casting_trigger,
                  casting_time: item.casting_time,
                  magic_school: { value: 'magic_school value', title: 'Magic School', content: item.magic_school},
                };
              });
              this.maxLevel = SpellSelectionPage.calcMaxSpellSlotLevel(this.levelRow);
              this.displayableSpells = SpellSelectionPage.getDisplayableSpells(this.spells,this.maxLevel);
              this.cantripsToChoose = this.levelRow.cantrips_known === null ? 0 : this.levelRow.cantrips_known === undefined ? 0 : this.levelRow.cantrips_known;
              this.spellsToChoose = SpellSelectionPage.getSpellsToChoose(this.levelRow.name,this.levelRow.level,this.levelRow.spells_known);
              CharacterInstance.cantripsKnown = this.levelRow.cantrips_known;
              CharacterInstance.spellsKnown = this.spellsToChoose;
            },
            error: (err) => alert(err)
          });
      },
      error: (err) => alert(err)
    });

    // alert(this.levelRow.length);
    // maxSpellSlots = 

    // SpellSelectionPage
    // .getLevelRow(this.levelRowDisplayer)
    // .catch(err => alert(err))
    // .then(value => this.levelRow = value);
  }


  ngOnInit() {
  }

}
