import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonList } from '@ionic/angular/standalone';
import { TitleComponent } from "src/app/components/title/title.component";
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { LabelComponent } from "src/app/components/label/label.component";
import { CharacterInstance } from '../CharacterInformation';
import { dnd } from 'dbserver/database.queries';
import { Alerts, Navigate } from 'src/app/core/core';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Router } from '@angular/router';
import { DragEntryComponent } from "src/app/components/drag-entry/drag-entry.component";

@Component({
  selector: 'app-option-selection',
  templateUrl: './option-selection.page.html',
  styleUrls: ['./option-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TitleComponent, LabelComponent, IonLabel, IonList, ButtonComponent, DragEntryComponent]
})
export class OptionSelectionPage implements OnInit {
  simpleWeapons = ['club','dagger','greatclub','handaxe','javelin','light hammer','mace','quarterstaff','sickle','spear','dart','light crossbow','shortbow','sling'];
  simpleMeleeWeapons = ['club','dagger','greatclub','handaxe','javelin','light hammer','mace','quarterstaff','sickle','spear'];
  martilWeapons = ['battleaxe','flail','glaive','greataxe','greatsword','halberd','lance','longsword','maul','morningstar','pike','rapier','scimitar','trident','war pick','warhammer','whip','blowgun','hand-crossbow','heavy-crossbow','longbow','net'];
  musicalInstruments = ['Bagpipes','Drum','Dulcimer','Flute','Lyre','Horn','Pan flute','Shawm','Viol'];
  //
  classChoices;
  speciesChoices;
  backgroundChoices;
  // attributi di utility
  classContent;
  speciesContent;
  backgroundContent;
  className;
  speciesName;
  backgroundName;
  //
  statsToChoose = signal<number>(0);
  strMax = signal<number>(0);
  dexMax = signal<number>(0);
  conMax = signal<number>(0);
  intMax = signal<number>(0);
  wisMax = signal<number>(0);
  chaMax = signal<number>(0);
  maxStats: number;
  // @ViewChild('strengthDragEntry') private strengthDragEntry: DragEntryComponent; 
  // @ViewChild('dexterityDragEntry') private dexterityDragEntry: DragEntryComponent; 
  // @ViewChild('constitutionDragEntry') private constitutionDragEntry: DragEntryComponent; 
  // @ViewChild('intelligenceDragEntry') private intelligenceDragEntry: DragEntryComponent; 
  // @ViewChild('wisdomDragEntry') private wisdomDragEntry: DragEntryComponent; 
  // @ViewChild('charismaDragEntry') private charismaDragEntry: DragEntryComponent; 
  //
  regularProfToChoose: number;
  regularProfArray = [];
  //
  extraProfToChoose: number | undefined;
  extraProfArray = [];
  //
  optEquip = [];
  //
  // charLevel settato a 3 per testing, levare non appena non serve più
  charLevel = CharacterInstance.chosenLevel = 3;
  chosenSubclass: string | undefined = undefined;
  //
  abBonusToChoose: number | undefined;
  chosenAbBonus = [];
  //
  languagestoChoose: number | undefined;
  chosenLanguages = [];
  //
  hasSubspecies: boolean;
  chosenSubspecies: string | undefined = undefined;
  //
  BACKGROUNDlanguagesToChoose: number | undefined;
  BACKGROUNDchosenLanguages = [];
  //
  BACKGROUNDoptEquip = [];

  addStatStr = (amount: number) => {
    this.statsToChoose.set(this.statsToChoose() - amount);
    this.strMax.set(this.strMax() + amount);
  }

  addStatDex = (amount: number) => {
    this.statsToChoose.set(this.statsToChoose() - amount);
    this.dexMax.set(this.dexMax() + amount);
  }

  addStatCon = (amount: number) => {
    this.statsToChoose.set(this.statsToChoose() - amount);
    this.conMax.set(this.conMax() + amount);
  }

  addStatInt = (amount: number) => {
    this.statsToChoose.set(this.statsToChoose() - amount);
    this.intMax.set(this.intMax() + amount);
  }

  addStatWis = (amount: number) => {
    this.statsToChoose.set(this.statsToChoose() - amount);
    this.wisMax.set(this.wisMax() + amount);
  }
  addStatCha = (amount: number) => {
    this.statsToChoose.set(this.statsToChoose() - amount);
    this.chaMax.set(this.chaMax() + amount);
  }

  nextPage = () => {
    //controlli per andare avanti
    const validateRegularProf: boolean = this.regularProfToChoose===0;
    const validateExtraProf: boolean = this.extraProfToChoose===0;
    const validateOptEquipment: boolean = this.optEquip.length === this.classContent[1].content.length;
    const validateSubclass: boolean = (this.charLevel>=3 && this.chosenSubclass!==undefined) || (this.charLevel<3 && this.chosenSubclass===undefined);
    const validateAbilityBonuses: boolean = this.abBonusToChoose===0;
    const validateLanguages: boolean = this.languagestoChoose===0;
    const validateSubspecies: boolean = (this.hasSubspecies===true && this.chosenSubspecies!==undefined) || (!this.hasSubspecies===false && this.chosenSubspecies===undefined);
    const validateBGlanguages: boolean = this.BACKGROUNDlanguagesToChoose===0;
    const validateBGoptEquipment: boolean = this.BACKGROUNDoptEquip.length === this.backgroundContent[1].content.length;
    const validateASI: boolean = this.statsToChoose() === 0;
    const className = CharacterInstance.chosenClass.toLowerClass();
    const validateSpellSelection = (className!==undefined) && (className === 'bard' || className === 'cleric' || className === 'druid' || className === 'paladin' || className === 'ranger' || className === 'sorcerer' || className === 'warlock' || className === 'wizard');
    if (
      validateRegularProf &&
      validateExtraProf &&
      validateOptEquipment &&
      validateSubclass &&
      validateAbilityBonuses &&
      validateLanguages &&
      validateSubspecies &&
      validateBGlanguages &&
      validateBGoptEquipment &&
      validateASI
    ) {
      CharacterInstance.chosenRegularProficiencies = this.regularProfArray;
      CharacterInstance.chosenExtraProficiencies = this.extraProfArray;
      CharacterInstance.chosenOptionalEquipment = this.optEquip;
      CharacterInstance.chosenSubclass = this.chosenSubclass;
      CharacterInstance.chosenAbilityBonuses = this.chosenAbBonus;
      CharacterInstance.chosenSubspecies = this.chosenSubspecies;
      CharacterInstance.chosenBackgroundLanguages = this.BACKGROUNDchosenLanguages;
      CharacterInstance.chosenBackgroundEquipment = this.BACKGROUNDoptEquip;
      // setto le statistiche
      // forza
      CharacterInstance.setStatistics('strength',CharacterInstance.getStatisticValue('strength') + this.strMax());
      // destrezza
      CharacterInstance.setStatistics('dexterity',CharacterInstance.getStatisticValue('dexterity') + this.dexMax());
      //costituzione
      CharacterInstance.setStatistics('constitution',CharacterInstance.getStatisticValue('constitution') + this.conMax());
      // intelligenza
      CharacterInstance.setStatistics('intelligence',CharacterInstance.getStatisticValue('intelligence') + this.intMax());
      // saggezza
      CharacterInstance.setStatistics('wisdom',CharacterInstance.getStatisticValue('wisdom') + this.wisMax());
      // carisma
      CharacterInstance.setStatistics('charisma',CharacterInstance.getStatisticValue('charisma') + this.chaMax());
      if (validateSpellSelection) this.router.navigate(['spell-selection']);
      else this.router.navigate(['overview']);
    }
    else {
      Alerts.personalizedMessage('There are still abilities to be chosen.','Not done!');
      // alert(`validateRegularProf = ${validateRegularProf}
      //        validateExtraProf = ${validateExtraProf}
      //        validateOptEquipment = ${validateOptEquipment}
      //        validateSubclass = ${validateSubclass}
      //        validateAbilityBonuses = ${validateAbilityBonuses}
      //        validateLanguages = ${validateLanguages}
      //        validateSubspecies = ${validateSubspecies}
      //        validateBGlanguages = ${validateBGlanguages} 
      //        validateBGoptEquipment = ${validateBGoptEquipment}`);
    }
  }

  buttonCallbacks = {
    previousPage: { onClick: Navigate.toPath(this.router,'stats-selection')},
    nextPage: { onClick: this.nextPage},
  };

 

  addRegularProficiency(profName: string, boxID: string) {
    if (this.regularProfArray.includes(profName)) {
      this.regularProfArray.splice(this.regularProfArray.indexOf(profName),1);
      this.regularProfToChoose++;
    }
    else {
      if (this.regularProfToChoose === 0) {
        Alerts.personalizedMessage('You can\'t choose any more proficiencies from this group, uncheck a box from this group to choose a new one', 'Too many proficiencies');
        const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
        box.checked = false;
      }
      else {
        this.regularProfArray.push(profName);
        this.regularProfToChoose--;
      }
    }
  }

  addExtraProficiency(profName: string, boxID: string) {
    if (this.extraProfArray.includes(profName)) {
      this.extraProfArray.splice(this.extraProfArray.indexOf(profName),1);
      this.extraProfToChoose++;
    }
    else {
      if (this.extraProfToChoose===0) {
        Alerts.personalizedMessage('You can\'t choose any more proficiencies from this group, uncheck a box from this group to choose a new one', 'Too many proficiencies');
        const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
        box.checked = false;
      }
      else {
        this.extraProfArray.push(profName);
        this.extraProfToChoose--;
      }
    }
  }

  addOptionalEquipment(equipName: string, index: number, boxID: string) {
    if (this.optEquip.includes(equipName)) {
      this.optEquip.splice(this.optEquip.indexOf(equipName),1);
      this.classContent[1].content[index].leftToChoose++;
    }
    else {
      if(this.classContent[1].content[index].leftToChoose===0) {
        Alerts.personalizedMessage('\n\nYou can\'t choose any more pieces of equipment from this group, uncheck a box from this group to choose a new one', 'Too many pieces of equipment');
        const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
        box.checked = false;
      }
      else {
        this.optEquip.push(equipName);
        this.classContent[1].content[index].leftToChoose--;
      }
    }
  }

  addOptionalEquipmentFromBackground(equipName: string, index: number, boxID: string) {
    if (this.BACKGROUNDoptEquip.includes(equipName)) {
      this.BACKGROUNDoptEquip.splice(this.optEquip.indexOf(equipName),1);
      this.backgroundContent[1].content[index].leftToChoose++;
    }
    else {
      if(this.backgroundContent[1].content[index].leftToChoose===0) {
        Alerts.personalizedMessage('\n\nYou can\'t choose any more pieces of equipment from this group, uncheck a box from this group to choose a new one', 'Too many pieces of equipment');
        const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
        box.checked = false;
      }
      else {
        this.BACKGROUNDoptEquip.push(equipName);
        this.backgroundContent[1].content[index].leftToChoose--;
      }
    }
  }

  addSubclass(subName: string, boxID: string) {
    if(this.charLevel<3) {
      Alerts.personalizedMessage('L\'utente non dovrebbe essere in grado di selezionare una sottoclasse dato che il suo livello è inferiore al tre','Errore con la scelta sottoclasse');
      const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
      box.checked = false;
    }
    if (this.chosenSubclass === subName) {
      this.chosenSubclass = undefined
    }
    else {
      if(this.chosenSubclass === undefined) {
        this.chosenSubclass = subName;
      }
      else {
        Alerts.personalizedMessage('A subclass has already been selected, please uncheck the selected subclass to choose a new one', 'Subclass already selected');
        const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
        box.checked = false;
      }
    }
  }

  addSubspecies(subName: string, boxID: string) {
    if (this.chosenSubspecies === subName) {
      this.chosenSubspecies = undefined
    }
    else {
      if(this.chosenSubspecies === undefined) {
        this.chosenSubspecies = subName;
      }
      else {
        Alerts.personalizedMessage('A subspecies has already been selected, please uncheck the selected subspecies to choose a new one', 'Subspecies already selected');
        const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
        box.checked = false;
      }
    }
  }

  containsAbilityBonus(abilityName: string) {
    for(const abBonus of this.chosenAbBonus) {
      if (abBonus.abilityName === abilityName) return true;
    }

    return false;
  }

  addAbilityBonus(abilityName: string, bonus: number, boxID: string) {
    abilityName = abilityName === 'Strength (STR)' ? 'strength' :
                  abilityName === 'Dexterity (DEX)' ? 'dexterity' :
                  abilityName === 'Constitution (CON)'? 'constitution' :
                  abilityName === 'Wisdom (WIS)' ? 'wisdom' :
                  abilityName === 'Intelligence (INT)' ? 'intelligence' :
                  abilityName === 'Charisma (CHA)' ? 'charisma' : abilityName;
    if (this.abBonusToChoose === undefined) {
      Alerts.personalizedMessage('L\'utente non dovrebbe essere in grado di selezionare un bonus alle proprie statistiche, la sua specie non glielo permette','Errore con la scelta deli bonus');
      const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
      box.checked = false;
    }
    if (this.containsAbilityBonus(abilityName)) {
      this.chosenAbBonus.splice(this.chosenAbBonus.indexOf(abilityName),1);
      this.abBonusToChoose++;
    }
    else {
      if (this.abBonusToChoose===0) {
        Alerts.personalizedMessage(this.chosenAbBonus[0].abilityName + this.chosenAbBonus[1].abilityName + ' \n\nYou can\'t choose any more bonuses from this group, uncheck a box from this group to choose a new one', 'Too many bonuses');
        const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
        box.checked = false;
      }
      else {
        this.chosenAbBonus.push({
          abilityName: abilityName,
          bonus: bonus,
        });
        this.abBonusToChoose--;
      }
    }
  }

  addLanguage(langName: string, boxID: string) {
    if (this.languagestoChoose === undefined) {
      Alerts.personalizedMessage('L\'utente non dovrebbe essere in grado di selezionare delle lingue addizionali, la sua specie non glielo permette','Errore con la scelta delle lingue');
      const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
      box.checked = false;
    }
    if (this.chosenLanguages.includes(langName)) {
      this.chosenLanguages.splice(this.chosenLanguages.indexOf(langName),1);
      this.languagestoChoose++;
    }
    else {
      if (this.languagestoChoose===0) {
        Alerts.personalizedMessage('You can\'t choose any more languages from this group, uncheck a box from this group to choose a new one', 'Too many languages');
        const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
        box.checked = false;
      }
      else {
        this.chosenLanguages.push(langName);
        this.languagestoChoose--;
      }
    }
  }

  addBACKGROUNDlanguage(langName: string, boxID: string) {
    if (this.BACKGROUNDlanguagesToChoose === undefined) {
      Alerts.personalizedMessage('L\'utente non dovrebbe essere in grado di selezionare delle lingue addizionali, il suo background non glielo permette','Errore con la scelta delle lingue');
      const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
      box.checked = false;
    }
    if (this.BACKGROUNDchosenLanguages.includes(langName)) {
      this.BACKGROUNDchosenLanguages.splice(this.BACKGROUNDchosenLanguages.indexOf(langName),1);
      this.BACKGROUNDlanguagesToChoose++;
    }
    else {
      if (this.BACKGROUNDlanguagesToChoose===0) {
        Alerts.personalizedMessage('You can\'t choose any more languages from this group, uncheck a box from this group to choose a new one', 'Too many languages');
        const box = document.getElementById(`#${boxID}`) as HTMLInputElement;
        box.checked = false;
      }
      else {
        this.BACKGROUNDchosenLanguages.push(langName);
        this.BACKGROUNDlanguagesToChoose--;
      }
    }
  }

  getFromOptions(choice) {
    return choice.from.options;
  }

  static displayClassProficiencyChoices(choices: dnd.Choice[]) {
    if (choices === undefined || choices === null) return undefined;
    let regularProfArray = [];
    let extraProfArray = [];
    for (const choice of choices) {
      for (const opt of choice.from.options) {
        if (opt.reference_item.name.includes('Skill:')) {
          regularProfArray.push(opt.reference_item.name);
        }
        else extraProfArray.push(opt.reference_item.name)
      }
    }

    return {
      quantity: choices[0].choose,
      regularProficiencies: regularProfArray,
      extraProficiencies: extraProfArray,
    };
  }

  static displayStartingEquipmentOptions(choices: dnd.Choice[]) {
    if (choices === undefined) return undefined;

    let retArray = [];
    let indexGenerator = 0;
    for (const choice of choices) {
      let arrEl = {
        choose: choice.desc.replace(/\\n/, '').replace(/a /, '').replace(/ or/, '').replace(/an /, '').replace(/, or/, '').replace(/, /, '')
        .replace(/a longsword,/, 'longsword').replace(/armorlongbow/, 'armor, longbow')
        .split(/\([abcd]\)/).filter(el => el !== '' && el !== ' ' && el !== null).map(el => el),
        quantity: choice.choose,
        leftToChoose: choice.choose,
        index: indexGenerator,
      };
      indexGenerator++;
      retArray.push(arrEl);
    }

    return retArray;
  }

  static displayAbilityBonusOptions(choice: dnd.Choice) {
    if (choice === undefined || choice === null) return undefined;
    let retArray = [];
    for (const opt of choice.from.options) {
      const abName = opt.ability_score_bonus.name === 'STR' ? 'Strength (STR)' :
                     opt.ability_score_bonus.name === 'DEX' ? 'Dexterity (DEX)' :
                     opt.ability_score_bonus.name === 'CON' ? 'Constitution (CON)' :
                     opt.ability_score_bonus.name === 'WIS' ? 'Wisdom (WIS)' :
                     opt.ability_score_bonus.name === 'INT' ? 'Intelligence (INT)' : 'Charisma (CHA)';
      retArray.push(abName);
    }

    return {
      bonus: choice.from.options[0].bonus,
      choose: choice.choose,
      abilities: retArray,
    };
  }

  static displayLanguageOptions(choice: dnd.Choice, allLanguages?: boolean) {
    if (choice === undefined || choice === null) return undefined;
    if(allLanguages !== undefined && allLanguages === true) {
      let allLanguages= ['Common','Common Sign Language','Draconic','Dwarvish','Elvish','Giant','Gnomish','Goblin','Halfling','Orc','Abyssal','Celestial','Deep Speech','Druidic','Infernal','Primordial','Sylvan','Thieves Cant','Undercommon'];
      if(CharacterInstance.chosenLanguages !== undefined) {
        for(const lang of CharacterInstance.chosenLanguages) {
          if(allLanguages.includes(lang)) allLanguages.splice(allLanguages.indexOf(lang),1);
        }
      }
      return {
        choose: choice.choose,
        languages: allLanguages,
      }
    }
    let retArray = [];
    for(const opt of choice.from.options) {
      retArray.push(opt.reference_item.name);
    }

    return {
      choose: choice.choose,
      languages: retArray,
    };
  }

  static displayStartingEquipmentFromBg(choices: dnd.Choice[]) {
    if (choices === undefined) return undefined;

    let retArray = [];
    let indexGenerator = 0;
    for (const choice of choices) {
      const arrEl = {
        choose: choice.from.equipment_category.name,
        quantity: choice.choose,
        leftToChoose: choice.choose,
        index: indexGenerator,
      }
      indexGenerator++;
      retArray.push(arrEl);
    }

    return retArray;
  }

  constructor(private router: Router, private choicesDiplayer: CharacterManagementService) {
    //inizializzo stats too choose
    // this.statsToChoose = CharacterInstance.chosenASI * 2;
    //da levare, è così solo per i test
    this.statsToChoose.set(6);
    this.maxStats = this.statsToChoose()

    this.choicesDiplayer
    .displayClassByName(
      // scritto così per testing, da levare || quando finiremo coi test
      CharacterInstance.chosenClass || 'fighter'
    )
    .subscribe({
      next: (value: any) => {
        // faccio [0] perché torna un solo oggetto ma il retrieve lo conta come array
        this.classChoices = {
            name: value.classes[0].name,
            value: value.classes[0].name + ' value',
            // value.classes[0].proficiency_choices || 'placeholder'
            content: [
              { value: value.classes[0].name + ' proficiency_choices value', title: 'Proficiency choices', content: OptionSelectionPage.displayClassProficiencyChoices(value.classes[0].proficiency_choices)},
              { value: value.classes[0].name + ' starting_equipment_options value', title: 'Starting equipment options', content: OptionSelectionPage.displayStartingEquipmentOptions(value.classes[0].starting_equipment_options)},
              { value: value.classes[0].name + ' subclasses value', title: 'Subclasses', content: value.classes[0].subclasses},
            ],
          };
        this.className = this.classChoices.name;
        this.classContent = this.classChoices.content;
        console.log(JSON.stringify(value.classes[0].starting_equipment_options,null,2));
        this.regularProfToChoose = value.classes[0].proficiency_choices[0].choose;
        this.extraProfToChoose = OptionSelectionPage.displayClassProficiencyChoices(value.classes[0].proficiency_choices).extraProficiencies.length === 0 ? 0 : this.regularProfToChoose;
        this.choicesDiplayer
        .displaySpeciesByName(
          CharacterInstance.chosenSpecies || 'half-elf'
        )
        .subscribe({
          next: (value: any) => {
            this.speciesChoices = {
              name: value.species[0].name,
              value: value.species[0].name + ' value',
              content: [
                { value: value.species[0].name + ' ability_bonus_options', title: 'Ability bonus options', content: OptionSelectionPage.displayAbilityBonusOptions(value.species[0].ability_bonus_options)},
                //{ value: value.species[0].name + ' starting_proficiency_options', title: 'Starting proficiency options', content: JSON.stringify(value.species[0].starting_proficiency_options) || undefined},
                { value: value.species[0].name + ' languages_options', title: 'Language options', content: OptionSelectionPage.displayLanguageOptions(value.species[0].language_options)},
                { value: value.species[0].name + ' subspecies_options', title: 'Subspecies', content: value.species[0].subraces === null  ? undefined : value.species[0].subraces === undefined ? undefined : value.species[0].subraces},
              ],
            };
            this.speciesName = this.speciesChoices.name;
            this.speciesContent = this.speciesChoices.content;
            this.hasSubspecies = (value.species[0].subraces !== null && value.species[0].subraces !== undefined);
            this.abBonusToChoose = value.species[0].ability_bonus_options?.choose === undefined ? 0 : value.species[0].ability_bonus_options.choose;
            this.languagestoChoose = value.species[0].language_options?.choose === undefined ? 0 : value.species[0].language_options.choose;
            this.choicesDiplayer
            .displayBackgroundByName(
              CharacterInstance.chosenBackground || 'acolyte'
            )
            .subscribe({
              next: (value: any) => {
                this.backgroundChoices = {
                  name: value.background[0].name,
                  value: value.background[0].name + ' value',
                  content: [
                    { value: value.background[0].name + ' language_options', title: 'Language options', content: OptionSelectionPage.displayLanguageOptions(value.background[0].language_options,true)},
                    { value: value.background[0].name + ' starting_equipment_options', title: 'Starting equipment options', content: OptionSelectionPage.displayStartingEquipmentFromBg(value.background[0].starting_equipment_options)},
                  ]
                };
                this.backgroundName = this.backgroundChoices.name;
                this.backgroundContent = this.backgroundChoices.content;
                this.BACKGROUNDlanguagesToChoose = OptionSelectionPage.displayLanguageOptions(value.background[0].language_options,true).choose === undefined ? 0 : OptionSelectionPage.displayLanguageOptions(value.background[0].language_options,true).choose; 
              },
              error: (err) => alert(err)
            });
          },
          error: (err) => alert(err)
        })
      },
      error: (err) => alert(err)
    })
  }

  ngOnInit() {
  }

}
