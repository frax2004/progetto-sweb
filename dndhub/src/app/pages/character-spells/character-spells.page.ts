import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonItem, IonCheckbox ,IonCol, IonLabel, PopoverController } from '@ionic/angular/standalone';
import { Alerts, Navigate, Popups } from 'src/app/core/core';
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
  characterName = 'Maurone';
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
  spellcastingCD: number;
  spellAttBonus: number;
  characterSpells: any[];
  
  buttonCallbacks = {
    indietro: { onClick: Navigate.toPath(this.router,'character-sheet')},
  };

  incantesimiWarlock = [
    {nome: 'Witch bolt', livello: '1', tmpLanc: 'Azione', durata: 'Istantaneo', gittata: 'un miliardo', concentrazione: 'no', componenti: 'M,V,S', scMag: 'Invocazione', descrizione: Popups.ofSimpleText(this.popoverController,'HOLLOW PURPLE')},
    {nome: 'Hex', livello: '1', tmpLanc: 'Azione', durata: 'Istantaneo', gittata: 'un miliardo', concentrazione: 'no', componenti: 'M,V,S', scMag: 'Invocazione', descrizione: Popups.ofSimpleText(this.popoverController,'HOLLOW PURPLE')},
  ]

  incantesimiMago = [
    {nome: 'Chromatic Orb', livello: '1', tmpLanc: 'Azione', durata: 'Istantaneo', gittata: 'un miliardo', concentrazione: 'no', componenti: 'M,V,S', scMag: 'Invocazione', descrizione: Popups.ofSimpleText(this.popoverController,'HOLLOW PURPLE')},
    {nome: 'Divinazione', livello: '99', tmpLanc: 'istantaneo o rituale', durata: '5o giorni', gittata: 'si', concentrazione: 'si' , componenti: '', scMag: 'Necromanzia', descrizione:  Popups.ofSimpleText(this.popoverController,'Si')},
    {nome: 'Palla di fuoco', livello: '3', tmpLanc: 'Azione', durata: 'istantaneo', gittata: 'assai', concentrazione: 'no', componenti: 'M,S,V', scMag: 'Esplosioni', descrizione:  Popups.ofSimpleText(this.popoverController,'Non ho chiesto quanto è grande la stanza')},
  ];

  incantesimiChierico = [
    {nome: 'Curare Ferite', livello: '1' , tmpLanc: 'Azione', durata: 'Istantanea', gittata: 'Tocco', concentrazione: 'no', componenti: 'V,S', scMag: 'Cura', descrizione: Popups.ofSimpleText(this.popoverController,'Viva gesù')},
  ];

  incantesimi = {
    mago: this.incantesimiMago,
    chierico: this.incantesimiChierico, 
    warlock: this.incantesimiWarlock,
  };


  

  init = async () => {
    try {
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
