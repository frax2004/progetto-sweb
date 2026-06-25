import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonItem, IonCheckbox, IonCol, IonLabel, PopoverController, InfiniteScrollCustomEvent } from '@ionic/angular/standalone';
import { Alerts, currentGlobalCharacterName, Navigate, Popups } from 'src/app/core/core';
import { Router } from '@angular/router';
import { ButtonComponent } from "src/app/components/button/button.component";
import { CharacterSheetPage } from '../character-sheet/character-sheet.page';
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { UserUtilitiesService } from 'src/app/services/user.utilities.service';
import { IonInfiniteScroll, IonInfiniteScrollContent, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-character-spells',
  templateUrl: './character-spells.page.html',
  styleUrls: ['./character-spells.page.scss'],
  standalone: true,
  imports: [IonContent, IonCheckbox, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonItem, IonCol, ButtonComponent, IonLabel, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent]
})
export class CharacterSpellsPage implements OnInit {

  private mapSpell(item: any) {
    return {
      name: item.name,
      level: item.level,
      school: item.school,
      classes: item.classes,
      action_type: item.actionType,
      concentration: item.concentration,
      ritual: item.ritual,
      range: item.range,
      components: item.components?.replace(/\$\$\$/g, ' - '),
      material: item.material,
      duration: item.duration,
      description: item.description,
      cantrip_upgrade: item.cantripUpgrade,
      higher_level_slot: item.higherLevelSlot,
      casting_trigger: item.castingTrigger,
      casting_time: item.castingTime,
    };
  }

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
  idx_personaggio: string;

  toggleChange: boolean = false;
  selectedSpellToReplace = signal<any | null>(null); 
  availableSpells = signal<any[]>([]); // questo è l'array per le spell che compaiono a schermo
  currentPrefix = signal<string>(""); // questa sarebbe la barra di ricerca 

  private static SPELLS_LOADER_THRESHOLD = 5; //quantità che viene caricata dal db e dirgli tipo
  // carica solo 5 spell per volta, non tutte insieme se no scoppia il mondo 

  private filterAvailableSpells(spells: any[]) { // il filtro per non fare prendere le spell che non
    //  hanno o la stessa classe oppure già presenti nella spell list del pg
    const possesedSpell = new Set(this.characterSpells.map(s => s.name));

    return spells.filter(spell => { // qua applico il filtro alle spell perché succedevano porcherie
      const isOwned = possesedSpell.has(spell.name);

      const sameClass = !spell.classes || spell.classes.includes(this.characterInfo.class);

      return !isOwned && sameClass;
    });
  }

  private resetSpellChange() {
    this.selectedSpellToReplace.set(null); //questa serve per ritornare allo stato iniziale prima del cambio
    this.currentPrefix.set("");
    this.availableSpells.set([]);
  }

  selectOldSpell(spell: any) { //  qua mi prendo la spell da cambiare
    this.selectedSpellToReplace.set(spell);
    this.currentPrefix.set("");
    this.availableSpells.set([]);
    this.loadMoreSpells(); // appena viene selezionato la spell carico dal db la lista con la quale cambiare 
  }

  loadMoreSpells(callback?: () => void) { //questo invece prende le spell da caricare col 
    // prendo il livello dello spell che tolgo 
    const queryInfo = {
      limit: CharacterSpellsPage.SPELLS_LOADER_THRESHOLD,
      offset: this.availableSpells().length,
      regex: this.currentPrefix() ? `${this.currentPrefix()}%` : "",
      level: this.selectedSpellToReplace()?.level ?? null,
      className: this.characterInfo.class

    };

    this.characterServices.loadSpells(queryInfo).subscribe({ // chiamo il backend poi gli passo 
      // query info (non so a cosa gli serve queryinfo) e 
      //  chiama i metodo loadSpells dal backend che si occupa di prendere le spell da 
      // fare vedere a schermo 
      next: (res: any) => {
        const spells = this.filterAvailableSpells(res.spells ?? []); // applico il filtro alle spell del db
        this.availableSpells.update(curr => [...curr, ...spells]); // una volta filtrata la aggiorno 
        callback?.(); // questo invece serve a dire a ionic se mi hai passato una funzione eseguila
      },
      error: (err) => Alerts.error(err.error)
    });
  }

  onSearchEnter = (e: Event) => { 
    const target = e.target as HTMLIonSearchbarElement;
    this.currentPrefix.set(target.value ?? "");
    this.availableSpells.set([]);
    this.loadMoreSpells();
  };

  onScrollForMore = (e: InfiniteScrollCustomEvent) => { // quando arrivi in fondo fa caricare le altre spell
    this.loadMoreSpells(() => {
      setTimeout(() => e.target.complete(), 300);
    });
  };

  replaceSpell = (newSpell: any) => { // questa è quella che si occupa di cambiare le spell
    const oldSpell = this.selectedSpellToReplace();

    if (!oldSpell) {
      Alerts.message("Seleziona prima lo spell da sostituire"); // questo mi sa che non worka benissimo
      return;
    }

    this.characterServices.replaceSpell({ // vabbe chiamo il service per cambiare le spell 
      // gli passo per le robe per le query
      idx_personaggio: this.idx_personaggio,
      oldSpell: oldSpell.name,
      newSpell: newSpell.name
    }).subscribe({ // 
      next: () => {
        const mappedNewSpell = this.mapSpell(newSpell);
        this.characterSpells = this.characterSpells.map(s => s.name === oldSpell.name ? mappedNewSpell : s);
        // uso map perché aggiornando l'array non aggiorna l'ui quindi praticamente ne creo uno nuovo
        // gli dico che tutti i valori che ora si chiamano s se trova uno con il nome di oldsPELL deve diventare
        //newSpell
        // questo serve a dirgli di cambiare solo quella spell seleizonata
        this.resetSpellChange(); //reset
      },
      error: (err) => Alerts.error(err.error)
    });
  };
  buttonCallbacks = {
    indietro: { onClick: Navigate.toPath(this.router, 'character-sheet') },
  };

  toggleSelectionMode() {
    this.toggleChange = !this.toggleChange;
  }

  toggleCallbacks = {
    changeSpells: {
      onClick: () => this.toggleSelectionMode()
    }
  };



  // spellselection(spellName:string){ troppo complicato mi siddia fare sta roba non mi worka, 
  // volevo dare l'opportunita di togliere spell e aggiungerle in maniera separate
  //   const index=this.selectedSpells.indexOf(spellName);

  //   if(index >=0)
  //   {
  //     this.selectedSpells.splice(index, 1);
  //   }
  //   else{
  //     this.selectedSpells.push(spellName);
  //   }
  //    this.selectedSpells = [...this.selectedSpells];
  // }


  static generateSpellcastingUtilities(stats: any[], className: string, profBonus: number) {
    let spellcastingAbility: string;
    if (className === 'wizard') spellcastingAbility = 'intelligence';
    else if (className === 'druid' || className === 'cleric' || className === 'ranger') spellcastingAbility = 'wisdom';
    else if (className === 'bard' || className === 'paladin' || className === 'sorcerer' || className === 'warlock') spellcastingAbility = 'charisma';
    else return {
      spellcastingAbility: 'error',
      spellcastingModifier: 'error',
      spellcastingDC: 'error',
      spellAttBonus: 'error',
    };

    for (const stat of stats) {
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
    if (cantrip_upgrade !== undefined && cantrip_upgrade !== null) return desc + '\n\n' + 'Cantrip upgrade: ' + cantrip_upgrade;
    if (higher_level !== undefined && higher_level !== null) return desc + '\n\n' + 'At higher spell slot level: ' + higher_level;

    return desc;
  }

  createSpellPopup(spellName: string, desc: string, cantrip_upgrade: string, higher_level: string, event: Event) {
    (Popups.ofSimpleText(this.popoverController, this.spellDescription(desc, cantrip_upgrade, higher_level)))(event);
  }

  init = async () => {
    try {
      this.characterName = currentGlobalCharacterName();
      // ?? da levare dopo tests
      const playerIDvalues = (await CharacterSheetPage.toPromise(this.userServices.getPlayerID())).utente_giocatore;
      this.playerID = playerIDvalues === undefined ? '(giocatore): giovanniDM@gmail.com' : playerIDvalues;
      this.idx_personaggio = `${this.characterName} @ ${this.playerID}`;

      const characterValues = await CharacterSheetPage.toPromise(this.characterServices.getCharacterByIdx(this.idx_personaggio));
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
      const scoresValues = await CharacterSheetPage.toPromise(this.characterServices.getCharacterAbilityScores(this.idx_personaggio));
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
          stat_value: CharacterSheetPage.getStatValueByIndex(item.index, this.characterStats),
          stat_modifier: CharacterSheetPage.getStatModifierByIndex(item.index, this.characterStats),
        };
      });

      const spellValues = await CharacterSheetPage.toPromise(this.characterServices.getCharacterSpells(this.idx_personaggio));
      this.characterSpells = spellValues.spells.map((item: any) => this.mapSpell(item));

      const app = CharacterSpellsPage.generateSpellcastingUtilities(this.abilityScoresInfos, this.characterInfo.class, this.characterInfo.proficiency_bonus);
      this.spellcastingAbility = app.spellcastingAbility;
      this.spellcastingDC = app.spellcastingDC;
      this.spellcastingModifier = app.spellcastingModifier;
      this.spellAttBonus = app.spellAttBonus;
    }
    catch (err) {
      Alerts.message(err.error.message);
    }
  }

  constructor(private router: Router, public popoverController: PopoverController, private userServices: UserUtilitiesService, private characterServices: CharacterManagementService) {
    this.init();
  }

  ngOnInit() {
  }

}
