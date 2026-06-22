import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonItem, IonCheckbox ,IonCol, IonLabel, PopoverController } from '@ionic/angular/standalone';
import { Alerts, currentGlobalCharacterName, Navigate, Popups } from 'src/app/core/core';
import { Router } from '@angular/router';
import { ButtonComponent } from "src/app/components/button/button.component";
import { CharacterSheetPage } from '../character-sheet/character-sheet.page';
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { UserUtilitiesService } from 'src/app/services/user.utilities.service';
import { range } from 'rxjs';

@Component({
  selector: 'app-character-spells',
  templateUrl: './character-spells.page.html',
  styleUrls: ['./character-spells.page.scss'],
  standalone: true,
  imports: [IonContent, IonCheckbox, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonItem, IonCol, ButtonComponent, IonLabel]
})
export class CharacterSpellsPage implements OnInit {

  // da cambiare dopo i tests
  characterName: string;
  playerID: string;
  characterInfo = {
    proficiency_bonus: undefined,
    class: undefined,
    level: undefined,
    spellsNumber: undefined,
    cantripsNumber: undefined,
    slot_lvl_1: undefined,
    slot_lvl_2: undefined,
    slot_lvl_3: undefined,
    slot_lvl_4: undefined,
    slot_lvl_5: undefined,
    slot_lvl_6: undefined,
    slot_lvl_7: undefined,
    slot_lvl_8: undefined,
    slot_lvl_9: undefined,
  };
  characterStats: any[];
  abilityScoresInfos: any[];
  spellcastingAbility: string;
  spellcastingModifier: number;
  spellcastingDC: number;
  spellAttBonus: number;
  characterSpells: any[];
  
  buttonCallbacks = {
    indietro: { onClick: Navigate.toPath(this.router,'character-sheet')},
  };



  static generateSpellcastingUtilities(stats: any[], className: string, profBonus: number) {
    let spellcastingAbility: string;
    if(className==='wizard') spellcastingAbility = 'intelligence';
    else if (className === 'druid' || className === 'cleric' || className === 'ranger') spellcastingAbility = 'wisdom';
    else if (className === 'bard' || className === 'paladin' || className === 'sorcerer' || className === 'warlock') spellcastingAbility = 'charisma';
    else return {
      spellcastingAbility: 'error',
      spellcastingModifier: 'error',
      spellcastingDC: 'error',
      spellAttBonus: 'error',
    };

    for(const stat of stats) {
      if (stat.full_name.toLowerCase() === spellcastingAbility) {
        return {
          spellcastingAbility: spellcastingAbility,
          spellcastingModifier: stat.stat_modifier,
          spellcastingDC: stat.stat_modifier + profBonus + 8,
          spellAttBonus: stat.stat_modifier + profBonus,
        };
      }
    }

    return {
      spellcastingAbility: 'error',
      spellcastingModifier: 'error',
      spellcastingDC: 'error',
      spellAttBonus: 'error',
    };
  }
  

  spellDescription(desc: string, cantrip_upgrade: string, higher_level: string) {
    if (cantrip_upgrade !== undefined && cantrip_upgrade !== null) return desc + '\n\n' + 'Cantrip upgrade: '+ cantrip_upgrade;
    if (higher_level !== undefined && higher_level !== null) return  desc + '\n\n' + 'At higher spell slot level: '+ higher_level;

    return desc;
  }

  createSpellPopup(spellName: string, desc: string, cantrip_upgrade: string, higher_level: string, event: Event) {
    (Popups.ofSimpleText(this.popoverController,this.spellDescription(desc, cantrip_upgrade, higher_level)))(event);
  } 

  init = async () => {
    try {
      this.characterName = currentGlobalCharacterName();
      // ?? da levare dopo tests
      const playerIDvalues = (await CharacterSheetPage.toPromise(this.userServices.getPlayerID())).utente_giocatore;
      this.playerID = playerIDvalues === undefined ? '(giocatore): giovanniDM@gmail.com' : playerIDvalues;
      const idx_personaggio = `${this.characterName} @ ${this.playerID}`;

      const characterValues = await CharacterSheetPage.toPromise(this.characterServices.getCharacterByIdx(idx_personaggio));
      this.characterInfo = {
        proficiency_bonus: characterValues.character.bonus_competenza,
        class: characterValues.character.classe,
        level: characterValues.character.livello,
        spellsNumber: characterValues.character.numero_incantesimi,
        cantripsNumber: characterValues.character.numero_trucchetti,
        slot_lvl_1: characterValues.character.slot_livello_1,
        slot_lvl_2: characterValues.character.slot_livello_2,
        slot_lvl_3: characterValues.character.slot_livello_3,
        slot_lvl_4: characterValues.character.slot_livello_4,
        slot_lvl_5: characterValues.character.slot_livello_5,
        slot_lvl_6: characterValues.character.slot_livello_6,
        slot_lvl_7: characterValues.character.slot_livello_7,
        slot_lvl_8: characterValues.character.slot_livello_8,
        slot_lvl_9: characterValues.character.slot_livello_9,
      };

      //prendo statistiche pg
      const scoresValues = await CharacterSheetPage.toPromise(this.characterServices.getCharacterAbilityScores(idx_personaggio));
      this.characterStats = scoresValues.stats.map((item: any) => {
        return {
          index: item.stat_idx,
          stat_value: item.stat_value,
          stat_modifier: item.stat_modifier
        };
      });

      const abilityScores = await CharacterSheetPage.toPromise(this.characterServices.getAbilityScores());
      this.abilityScoresInfos = abilityScores.ability_scores.map((item: any) => {
        return {
          index: item.index,
          name: item.name,
          full_name: item.full_name,
          stat_value: CharacterSheetPage.getStatValueByIndex(item.index,this.characterStats),
          stat_modifier: CharacterSheetPage.getStatModifierByIndex(item.index,this.characterStats),
        };
      });

      const spellValues = await CharacterSheetPage.toPromise(this.characterServices.getCharacterSpells(idx_personaggio));
      this.characterSpells = spellValues.spells.map((item: any) => {
        return {
          name: item.name,
          level: item.level,
          school: item.school,
          classes: item.classes,
          action_type: item.actionType,
          concentration: item.concentration,
          ritual: item.ritual,
          range: item.range,
          components: item.components?.replace('$$$', ' - ')?.replace('$$$', ' - '),
          material: item.material,
          duration: item.duration,
          description: item.description,
          cantrip_upgrade: item.cantripUpgrade,
          higher_level_slot: item.higherLevelSlot,
          casting_trigger: item.castingTrigger,
          casting_time: item.castingTime,
        };
      });

      const app = CharacterSpellsPage.generateSpellcastingUtilities(this.abilityScoresInfos,this.characterInfo.class,this.characterInfo.proficiency_bonus);
      this.spellcastingAbility = app.spellcastingAbility;
      this.spellcastingDC = app.spellcastingDC;
      this.spellcastingModifier = app.spellcastingModifier;
      this.spellAttBonus = app.spellAttBonus;
    }
    catch (err) {
      Alerts.message(err.error.message);
    }
  }

  constructor(private router: Router, public popoverController: PopoverController,private userServices: UserUtilitiesService ,private characterServices: CharacterManagementService) {
    this.init();
  }

  ngOnInit() {
  }

}
