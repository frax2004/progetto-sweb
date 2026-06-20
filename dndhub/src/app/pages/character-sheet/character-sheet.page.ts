import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCheckbox, IonItem, IonGrid, IonCol, IonRow, IonLabel, IonList, PopoverController, IonAccordionGroup, IonAccordion, IonThumbnail } from '@ionic/angular/standalone';
import { CheckboxComponent } from "src/app/components/checkbox/checkbox.component";
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { UnorderedListElementComponent } from "src/app/components/unordered-list-element/unordered-list-element.component";
import { Alerts, Navigate, Popups } from 'src/app/core/core';
import { EntryComponent } from "src/app/components/entry/entry.component";
import { Router } from '@angular/router';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { AlertController } from '@ionic/angular';
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { UserUtilitiesService } from 'src/app/services/user.utilities.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.page.html',
  styleUrls: ['./character-sheet.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCheckbox, CommonModule, FormsModule, IonItem, IonGrid, IonCol, IonRow, IonLabel, CheckboxComponent, AccordionComponent, IonList, UnorderedListElementComponent, EntryComponent, ButtonComponent, IonAccordionGroup, IonAccordion, IonThumbnail]
})
export class CharacterSheetPage implements OnInit {

  playerID;
  // characterName in teoria dovrà essere passato da fuori
  characterName = 'Maurone';
  currHealth: number = 0;
  //devo definirlo così altrimenti ho problemi
  characterInfo: any = {
    health: undefined,
    proficiency_bonus: undefined,
    class: undefined,
    subclasse: undefined,
    species: undefined,
    subspecies: undefined,
    background: undefined,
    level: undefined,
    gold_quantity: undefined,
    speed: undefined,
    size: undefined,
    extra_abilities: undefined,
    character_description: undefined,
    image: undefined,
  };
  characterStats = [];
  characterProficiencies: any[];
  abilityScoresInfos: any[];

  accordions = {
    // per qualche motivo \n non va a capo e neanche <br/>
    forza: { value: 'Strength accordion', title: 'FORZA - 10', content: 'Tiro salvezza: +0\nAtletica: +0'},
    destrezza: { value: 'Dexterity accordion', title: 'DESTREZZA - 86', content: 'Tiro salvezza: +10\nAcrobazia: +100 (competenza)\nVelocità di mano: -30\nFurtività: +1000 (maestria)'},
    costituzione: { value: 'Constitution accordion', title: 'COSTITUZIONE - 9', content: 'Tiro salvezza: -1000'},
    intelligenza: { value: 'Intelligence accordion', title: 'INTELLIGENZA - 34', content:'Tiro salvezza: +80 (competenza)\nArcano: +0\nStoria: +9\nInvestigare: +7\nNatura: +80\nReligione: +7'},
    saggezza: { value: 'Wisdom accordion', title: 'SAGGEZZA - 120', content:'Tiro salvezza: +1Milione (competenza)\nAddestrare animali: +50(maestria)\nIntuire: +0\nMedicina: +4\nPercezione: assai\nSopravvivenza: -5'},
    carisma: { value: 'Charisma accordion', title: 'CARISMA - 90', content:'Tiro salvezza: bho (competenza)\nInganno: +5\nIntimidire: -20 (competenza)\nIntrattenere: +9\nPersuasione: no'},
  };

  abilityAccordions = {
    abilita: { value: 'Ability accordion', title: 'Abilità e talenti', content:'dofcnsdlkndlfnqwoeiubscklsbelwksjandxlkjsnklcjsnbqwlkjdlksajd.khjslkhjsdlkjsd'},
    inventario: { value: 'Inventary accordion', title: 'Inventario', content:'200 monete d\'oro Genitore 1 genitore 2'},
  }

  buttonCallbacks = {
    placeholder: { onClick: Navigate.toPath(this.router,'character-spells')},
  };

  deleteCallback ={
    deletePG:{onClick: Alerts.notImplemetedError}
  }

changeCallback={
  changes:{onClick: Alerts.notImplemetedError}
}
  
  static generateSavingThrowValues(statModifier: number, profBonus: number, statName: string, proficiencies: string[]) {
    for(const el of proficiencies) {
      if (el.includes(statName.toLowerCase()) && el.includes('saving throw')) return statModifier + profBonus; 
    }

    return statModifier;
  }

  static getStatModifierByIndex(index: string, statsArray: any[]) {
    for (const el of statsArray) {
      if (el.index === index) return el.stat_modifier;
    }

    return 0;
  }

  public static toPromise = (subscription: Observable<any>) => {
    const executor = (resolve: (value: any) => void,reject: (value: any) => void) => {
      subscription.subscribe({
        next: resolve,
        error: reject
      });
    };
    
    return new Promise<any>(executor);
  }

  init = async () => {
    try {
      // ?? da levare dopo tests
      const playerIDvalues = (await CharacterSheetPage.toPromise(this.userServices.getPlayerID())).utente_giocatore;
      this.playerID = playerIDvalues === undefined ? '(giocatore): giovanniDM@gmail.com' : playerIDvalues;
      const idx_personaggio = `${this.characterName} @ ${this.playerID}`;


      //prendo character
      const characterValues = await CharacterSheetPage.toPromise(this.characterServices.getCharacterByIdx(idx_personaggio));
      this.characterInfo = {
        health: characterValues.character.punti_vita,
        proficiency_bonus: characterValues.character.bonus_competenza,
        class: characterValues.character.classe,
        subclass: characterValues.character.sottoclasse || 'none',
        species: characterValues.character.specie,
        subspecies: characterValues.character.subspecies,
        background: characterValues.character.background,
        level: characterValues.character.livello,
        gold_quantity: characterValues.character.quantita_oro,
        //incharacterValues non mi servono incantesimi
        speed: characterValues.character.velocita,
        size: characterValues.character.taglia,
        extra_abilities: characterValues.character.abilita_extra,
        character_description: characterValues.character.descrizione_personaggio,
        image: characterValues.character.imgURL,
      };
      this.currHealth = this.characterInfo.health;

      //prendo statistiche pg
      const scoresValues = await CharacterSheetPage.toPromise(this.characterServices.getCharacterAbilityScores(idx_personaggio));
      this.characterStats = scoresValues.stats.map((item: any) => {
        return {
          index: item.stat_idx,
          stat_value: item.stat_value,
          stat_modifier: item.stat_modifier
        };
      });

      //prendo competenze pg
      const charProficiencies = await CharacterSheetPage.toPromise(this.characterServices.getCharacterProficiencies(idx_personaggio));
      this.characterProficiencies = charProficiencies.proficiencies.map(item => item.proficiency);


      const abilityScores = await CharacterSheetPage.toPromise(this.characterServices.getAbilityScores());
      this.abilityScoresInfos = abilityScores.ability_scores.map((item: any) => {
        return {
          index: item.index,
          name: item.name,
          full_name: item.full_name,
          saving_throw_value: CharacterSheetPage.generateSavingThrowValues(
            CharacterSheetPage.getStatModifierByIndex(item.index,this.characterStats),
            this.characterInfo.proficiency_bonus,
            item.full_name,
            this.characterProficiencies
          ),
          //ricorda che è un array di APIreference con index e name
          skills: item.skills,
          imageURL: undefined,
        };
      });
    
    
    } catch (err) {
      Alerts.error(err);
    } 

  }


  constructor(public popoverController: PopoverController, private router: Router, private characterServices: CharacterManagementService, private userServices: UserUtilitiesService) {
    this.init()
  }
  
  ngOnInit() {
  }

}


