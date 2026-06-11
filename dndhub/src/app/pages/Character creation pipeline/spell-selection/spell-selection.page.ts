import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel as IonLabel } from '@ionic/angular/standalone';
import { TitleComponent } from "src/app/components/title/title.component";
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { CharacterInstance } from '../CharacterInformation';
import { LabelComponent } from "src/app/components/label/label.component";
import { dnd } from 'dbserver/database.queries';
import { Popups } from 'src/app/core/core';
import { PopoverController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-spell-selection',
  templateUrl: './spell-selection.page.html',
  styleUrls: ['./spell-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TitleComponent, LabelComponent, IonList, IonLabel]
})
export class SpellSelectionPage implements OnInit {
  levelRow;
  spells;
  displayableSpells;
  maxLevel: number;
  spellLevels = ['0','1','2','3','4','5','6','7','8','9'];

  static calcMaxSpellSlotLevel(levelRow: dnd.Level): number {
    if (levelRow.spell_slots_level_9 !== 0) return 9;
    if (levelRow.spell_slots_level_8 !== 0) return 8;
    if (levelRow.spell_slots_level_7 !== 0) return 7;
    if (levelRow.spell_slots_level_6 !== 0) return 6;
    if (levelRow.spell_slots_level_5 !== 0) return 5;
    if (levelRow.spell_slots_level_4 !== 0) return 4;
    if (levelRow.spell_slots_level_3 !== 0) return 3;
    if (levelRow.spell_slots_level_2 !== 0) return 2;

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
        CharacterInstance.selectedLevel || 20,
        CharacterInstance.selectedClass || 'Wizard'
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
    const desc = `Casting Time: ${spell.action_type}\nRange: ${spell.range}\nComponents: ${spell.components}\nMaterial: ${spell.material}\nDuration: ${spell.duration}\nConcentration: ${spell.concentration}\nRitual: ${spell.ritual}\n\n${spell.description}`;
    return Popups.ofSimpleText(this.popoverController,desc);
  }

  displayCantripDescription(spell) {
    const desc = `Casting Time: ${spell.action_type}\nRange: ${spell.range}\nComponents: ${spell.components}\nMaterial: ${spell.material}\nDuration: ${spell.duration}\nConcentration: ${spell.concentration}\nRitual: ${spell.ritual}\n\n${spell.description}\n\nCantrip Upgrade: ${spell.cantrip_upgrade}`;
    return Popups.ofSimpleText(this.popoverController,desc);
  }

  constructor(private levelRowDisplayer: CharacterManagementService, public popoverController: PopoverController) {
    //metto degli or ai fini del testing, da levare quando finiremo col sito
    this.levelRowDisplayer
    .displayLevelRowByClassAndLevel(
      CharacterInstance.selectedLevel || 20,
      CharacterInstance.selectedClass || 'Wizard'
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
            CharacterInstance.selectedClass || 'Wizard'
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
                  magic_school: { value: 'magic_school value', title: 'Magic School', content: item.magic_school},
                };
              });
              this.maxLevel = SpellSelectionPage.calcMaxSpellSlotLevel(this.levelRow);
              this.displayableSpells = SpellSelectionPage.getDisplayableSpells(this.spells,this.maxLevel);
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
