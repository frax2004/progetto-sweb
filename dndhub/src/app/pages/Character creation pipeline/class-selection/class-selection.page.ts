import { Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonLabel, PopoverController, IonCol, IonRow, IonFooter, IonAccordionGroup, IonAccordion, IonThumbnail, IonButton, IonAlert } from '@ionic/angular/standalone';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { Accordion } from 'src/app/components/accordion/Accordion';
import { TextAreaComponent } from "src/app/components/text-area/text-area.component";
import { ButtonComponent } from 'src/app/components/button/button.component';
import { expand } from 'rxjs';
import { Button } from 'src/app/components/button/Button';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { Alerts, Navigate, Popups } from 'src/app/core/core';
import { DragEntryComponent } from "src/app/components/drag-entry/drag-entry.component";
import { Router } from '@angular/router';
import { TitleComponent } from "src/app/components/title/title.component";
import { LabelComponent } from "src/app/components/label/label.component";
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { dnd } from 'dbserver/database.queries';
import { AfterViewInit } from '@angular/core';
import { CharacterInstance } from '../CharacterInformation';
import { resolve } from 'dns';
import { rejects } from 'assert';

@Component({
  selector: 'app-class-selection',
  templateUrl: './class-selection.page.html',
  styleUrls: ['./class-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonGrid, AccordionComponent, IonLabel, TextAreaComponent, IonCol, ButtonComponent, IonRow, IonFooter, DragEntryComponent, TitleComponent, LabelComponent, IonAccordionGroup, IonAccordion, IonThumbnail, IonButton, IonAlert]
})
export class ClassSelectionPage implements OnInit, AfterViewInit {

  chosenClass: string;
  nextPageAlertOpen = false;

  setOpen(isOpen: boolean) {
    this.nextPageAlertOpen = isOpen;
  }

  nextPage = () => {
    // alert(this instanceof ClassSelectionPage);
    CharacterInstance.chosenLevel = this.levelEntry.value;
    const validClass: boolean = this.chosenClass !== undefined;
    if (CharacterInstance.chosenLevel>0 && validClass) {
      for (const _class of this.classesArray) {
        if (CharacterInstance.chosenClass === _class.title) {
          CharacterInstance.baseEquipment = _class.base_equipment;
          CharacterInstance.baseProficiencies = _class.base_proficiencies;
          CharacterInstance.baseSavingThrows = _class.base_saving_throws;
          CharacterInstance.hitDie = _class.hit_die;
        }
      }
      CharacterInstance.chosenClass = this.chosenClass;
      CharacterInstance.levelSpecifics = this.getLevelSpecifics();
      CharacterInstance.chosenASI = this.getNumberOfASI();
      this.router.navigate(['/species-selection']);
    }
    else this.setOpen(true);
  }


  buttonCallbacks = {
    // manca la pagina precedente a cui linkare il primo bottone
    nextPage: { onClick: this.nextPage},
    previousPage: {onClick: () => {
      CharacterInstance.unsetAll();
      Navigate.toPath(this.router,'character-creation-info')();
    }}
  }


  @ViewChild('levelEntry') private levelEntry: DragEntryComponent;

  getNumberOfASI() {
    if (this.levelEntry.value === 0 || CharacterInstance.chosenClass === undefined) return 0;
    const className = CharacterInstance.chosenClass.toLowerCase();
    for(const level of ClassSelectionPage.lvlsArray) {
      if (level.idx===className) {
        return level.content[this.levelEntry.value-1].ability_score_bonuses;
      }
    }

    return 0;
  }

  getLevelSpecifics() {
    if (this.levelEntry.value === 0 || CharacterInstance.chosenClass === undefined) return undefined;
    const className = CharacterInstance.chosenClass.toLowerCase();
    let featArray = [];
    for(const level of ClassSelectionPage.lvlsArray) {
      if (level.idx===className) {
        for(let i=0; i<this.levelEntry.value; i++) {
          for(const feat of level.content[i].features) {
            if (feat.name !== 'Ability Score Improvement') featArray.push(feat.index);
          }
        }
        return {
          feats: featArray,
          class_specific: level.content[this.levelEntry.value-1].class_specific,
          proficiency_bonus: level.content[this.levelEntry.value-1].prof_bonus,
          cantrips_known: level.content[this.levelEntry.value-1].cantrips_known,
          spell_slots_level_1 : level.content[this.levelEntry.value-1].spell_slots_level_1,
          spell_slots_level_2 : level.content[this.levelEntry.value-1].spell_slots_level_2,
          spell_slots_level_3 : level.content[this.levelEntry.value-1].spell_slots_level_3,
          spell_slots_level_4 : level.content[this.levelEntry.value-1].spell_slots_level_4,
          spell_slots_level_5 : level.content[this.levelEntry.value-1].spell_slots_level_5,
          spell_slots_level_6 : level.content[this.levelEntry.value-1].spell_slots_level_6,
          spell_slots_level_7 : level.content[this.levelEntry.value-1].spell_slots_level_7,
          spell_slots_level_8 : level.content[this.levelEntry.value-1].spell_slots_level_8,
          spell_slots_level_9 : level.content[this.levelEntry.value-1].spell_slots_level_9,
          aura_range: level.content[this.levelEntry.value-1].aura_range,
        };        
      }
    }

    return undefined;
  }

  static generateBaseEquipment(startingEquipment: dnd.StartingEquipment[]) {
    let retArray = [];
    for (const el of startingEquipment) {
      let retEl = {
        index: el.equipment.index,
        name: el.equipment.name,
        quantity: el.quantity
      };
      retArray.push(retEl);
    }

    return retArray;
  }

  static generateBaseProficiencies(proficiencies: dnd.APIReference[]) {
    let retArray = [];
    for (const el of proficiencies) {
      if(!el.name.includes('Saving Throw')) {
        retArray.push({
          index: el.index,
          name: el.name
        });
      }
    }

    return retArray;
  }

  static generateBaseSavingThrows(savingThrows: dnd.APIReference[]) {
    let retArray = [];
    for (const el of savingThrows) {
      retArray.push({
        index: el.index,
        name: el.name,
      })
    }

    return retArray;
  }


  classesArray = [];
  static lvlsArray = [];
  classesNames = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
  static classesDescriptions = {
    'Barbarian' : { text: `Barbarians are mighty warriors who are powered by primal forces of the multiverse that manifest as a Rage. More than a mere emotion—and not limited to anger—this Rage is an incarnation of a predator's ferocity, a storm's fury, and a sea's turmoil.
                    \nSome Barbarians personify their Rage as a fierce spirit or revered forebear. Others see it as a connection to the pain and anguish of the world, as an impersonal tangle of wild magic, or as an expression of their own deepest self. 
                    \nFor every Barbarian, their Rage is a power that fuels not just battle prowess, but also uncanny reflexes and heightened senses.
                    \nBarbarians often serve as protectors and leaders in their communities. They charge headlong into danger so those under their protection don't have to. Their courage in the face of danger makes Barbarians perfectly suited for adventure.`},
    
    'Bard': {text: `Invoking magic through music, dance, and verse, Bards are expert at inspiring others, soothing hurts, disheartening foes, and creating illusions. Bards believe the multiverse was spoken into existence and that remnants of its Words of Creation still resound and glimmer on every plane of existence. Bardic magic attempts to harness those words, which transcend any language.
                    \nAnything can inspire a new song or tale, so Bards are fascinated by almost everything. They become masters of many things, including performing music, working magic, and making jests.
                    \nA Bard's life is spent traveling, gathering lore, telling stories, and living on the gratitude of audiences, much like any other entertainer. But Bards' depth of knowledge and mastery of magic sets them apart.`},
    
    'Cleric': {text: `Clerics draw power from the realms of the gods and harness it to work miracles. Blessed by a deity, a pantheon, or another immortal entity, a Cleric can reach out to the divine magic of the Outer Planes—where gods dwell—and channel it to bolster people and battle foes.
                      \nBecause their power is a divine gift, Clerics typically associate themselves with temples dedicated to the deity or other immortal force that unlocked their magic. Harnessing divine magic doesn't rely on specific training, yet Clerics might learn prayers and rites that help them draw on power from the Outer Planes.
                      \nNot every member of a temple or shrine is a Cleric. Some priests are called to a simple life of temple service, carrying out their devotion through prayer and rituals, not through magic. Many mortals claim to speak for the gods, but few can marshal the power of those gods the way a Cleric can.` }, 
    
    'Druid': {text: `Druids belong to ancient orders that call on the forces of nature. Harnessing the magic of animals, plants, and the four elements, Druids heal, transform into animals, and wield elemental destruction.
                     \nRevering nature above all, individual Druids gain their magic from nature, a nature deity, or both, and they typically unite with other Druids to perform rites that mark the passage of the seasons and other natural cycles.
                     \nDruids are concerned with the delicate ecological balance that sustains plant and animal life and with the need for people to live in harmony with nature. Druids often guard sacred sites or watch over regions of unspoiled nature, but when a significant danger arises, Druids take a more active role as adventurers who combat the threat.` }, 
    
    'Fighter': {text: `Fighters rule many battlefields. Questing knights, royal champions, elite soldiers, and hardened mercenaries—as Fighters, they all share an unparalleled prowess with weapons and armor. And they are well acquainted with death, both meting it out and defying it.
                       \nFighters master various weapon techniques, and a well-equipped Fighter always has the right tool at hand for any combat situation. Likewise, a Fighter is adept with every form of armor. Beyond that basic degree of familiarity, each Fighter specializes in certain styles of combat. Some concentrate on archery, some on fighting with two weapons at once, and some on augmenting their martial skills with magic. This combination of broad ability and extensive specialization makes Fighters superior combatants.` }, 
    
    'Monk': {text: `Monks use rigorous combat training and mental discipline to align themselves with the multiverse and focus their internal reservoirs of power. Different Monks conceptualize this power in various ways: as breath, energy, life force, essence, or self, for example. Whether channeled as a striking display of martial prowess or as a subtler manifestation of defense and speed, this power infuses all that a Monk does.
                    \nMonks focus their internal power to create extraordinary, even supernatural, effects. They channel uncanny speed and strength into their attacks, with or without the use of weapons. In a Monk's hands, even the most basic weapons can become sophisticated implements of combat mastery.
                    \nMany Monks find that a structured life of ascetic withdrawal helps them cultivate the physical and mental focus they need to harness their power. Other Monks believe that immersing themselves in the vibrant confusion of life helps to fuel their determination and discipline.
                    \nMonks generally view adventures as tests of their physical and mental development. They are driven by a desire to accomplish a greater mission than merely slaying monsters and plundering treasure; they strive to turn themselves into living weapons.` }, 
    
    'Paladin': {text: `Paladins are united by their oaths to stand against the forces of annihilation and corruption. Whether sworn before a god's altar, in a sacred glade before nature spirits, or in a moment of desperation and grief with the dead as the only witnesses, a Paladin's oath is a powerful bond. It is a source of power that turns a devout warrior into a blessed champion.
                       \nPaladins train to learn the skills of combat, mastering a variety of weapons and armor. Even so, their martial skills are secondary to the magical power they wield: power to heal the injured, smite their foes, and protect the helpless and those who fight at their side.
                       \nAlmost by definition, the life of a Paladin is an adventuring life, for every Paladin lives on the front lines of the cosmic struggle against annihilation. Fighters are rare enough among the ranks of a world's armies, but even fewer people can claim the calling of a Paladin. When they do receive the call, these blessed folk turn from their former occupations and take up arms and magic.` }, 
    
    'Ranger': {text: `Far from bustling cities, amid the trees of trackless forests and across wide plains, Rangers keep their unending watch in the wilderness. Rangers learn to track their quarry as a predator does, moving stealthily through the wilds and hiding themselves in brush and rubble.
                      \nThanks to their connection with nature, Rangers can also cast spells that harness primal powers of the wilderness. A Ranger's talents and magic are honed with deadly focus to protect the world from the ravages of monsters and tyrants.` }, 
    
    'Rogue': {text: `Rogues rely on cunning, stealth, and their foes' vulnerabilities to get the upper hand in any situation. They have a knack for finding the solution to just about any problem. A few even learn magical tricks to supplement their other abilities. Many Rogues focus on stealth and deception, while others refine skills that help them in a dungeon environment, such as climbing, finding and disarming traps, and opening locks.
                     \nIn combat, Rogues prioritize subtle strikes over brute strength. They would rather make one precise strike than wear an opponent down with a barrage of blows.
                     \nSome Rogues began their careers as criminals, while others used their cunning to fight crime. Whatever a Rogue's relation to the law, no common criminal or officer of the law can match the subtle brilliance of the greatest Rogues.` },
    
    'Sorcerer': {text: `Sorcerers wield innate magic that is stamped into their being. Some Sorcerers can't name the origin of their power, while others trace it to strange events in their personal or family history. The blessing of a dragon or a dryad at a baby's birth or the strike of lightning from a clear sky might spark a Sorcerer's gift. So too might the gift of a deity, exposure to the strange magic of another plane of existence, or a glimpse into the inner workings of reality. Whatever the origin, the result is an indelible mark on the Sorcerer, a churning magic that can be passed down through generations.
                        \nSorcerers don't learn magic; the raw, roiling power of magic is part of them. The essential art of a Sorcerer is learning to harness and channel that innate magic, allowing the Sorcerer to discover new and staggering ways to unleash their power. As Sorcerers master their innate magic, they grow more attuned to its origin, developing distinct powers that reflect its source.
                        \nSorcerers are rare. Some family lines produce exactly one Sorcerer in every generation, but most of the time, the talents of sorcery appear as a fluke. People who have this magical power soon discover that it doesn't like to stay quiet. A Sorcerer's magic wants to be wielded.`}, 
    
    'Warlock': {text: `Warlocks quest for knowledge that lies hidden in the fabric of the multiverse. They often begin their search for magical power by delving into tomes of forbidden lore, dabbling in invocations meant to attract the power of extraplanar beings, or seeking places of power where the influence of these beings can be felt. In no time, each Warlock is drawn into a binding pact with a powerful patron. Drawing on the ancient knowledge of beings such as angels, archfey, demons, devils, hags, and alien entities of the Far Realm, Warlocks piece together arcane secrets to bolster their own power.
                       \nWarlocks view their patrons as resources, as means to the end of achieving magical power. Some Warlocks respect, revere, or even love their patrons; some serve their patrons grudgingly; and some seek to undermine their patrons even as they wield the power their patrons have given them.
                       \nOnce a pact is made, a Warlock's thirst for knowledge and power can't be slaked with mere study. Most Warlocks spend their days pursuing greater power and deeper knowledge, which typically means some kind of adventure.` }, 
    
    'Wizard': {text: `Wizards are defined by their exhaustive study of magic's inner workings. They cast spells of explosive fire, arcing lightning, subtle deception, and spectacular transformations. Their magic conjures monsters from other planes of existence, glimpses the future, or forms protective barriers. Their mightiest spells change one substance into another, call meteors from the sky, or open portals to other worlds.
                      \nMost Wizards share a scholarly approach to magic. They examine the theoretical underpinnings of magic, particularly the categorization of spells into schools of magic. Renowned Wizards such as Bigby, Tasha, Mordenkainen, and Yolande have built on their studies to invent iconic spells now used across the multiverse.
                      \nThe closest a Wizard is likely to come to an ordinary life is working as a sage or lecturer. Other Wizards sell their services as advisers, serve in military forces, or pursue lives of crime or domination.
                      \nBut the lure of knowledge calls even the most unadventurous Wizards from the safety of their libraries and laboratories and into crumbling ruins and lost cities. Most Wizards believe that their counterparts in ancient civilizations knew secrets of magic that have been lost to the ages, and discovering those secrets could unlock the path to a power greater than any magic available in the present age.`},  
  };

  


  // le funzioni display devono essere static altrimenti non possono essere accedute all'interno del costruttore
  static displayProficiencies(className, proficiencies) {
    let retValue = '';
    for(const prof of proficiencies) {
      if (!prof.name.includes('Saving Throw')) {
        retValue = retValue + '\n- ' + prof.name;
      }
    }

    return className + ' ha compentenza in\n' + retValue;
  }

  static displaySavingThrows(className,savingThrows) {
    let retValue = '';
    for(const prof of savingThrows) {
      let tmp = prof.name === 'STR' ? 'Strength (STR)' :
                prof.name === 'DEX' ? 'Dexterity (DEX)' :
                prof.name === 'CON' ? 'Constitution (CON)' :
                prof.name === 'WIS' ? 'Wisdom (WIS)' :
                prof.name === 'INT' ? 'Intelligence (INT)' : 'Charisma (CHA)' 
      retValue = retValue + '\n- ' + tmp;
    }
    return className + ' ha compentenza nei seguenti tiri salvezza\n' + retValue;
  }

  static displayProficiencyChoices(className,choices) {
    // forse abbiamo flattato un po' troppa roba...
    let retValue = '';
    for (const el of choices) {
      if (el.desc !== undefined && el.desc !== null) retValue = retValue + '\n- ' + el.desc;
    }

    return className + ' puo\' scegliere tra le seguenti competenze\n' + retValue;
  }

  static displayMulticlassing(className, multiclassing: dnd.MultiClassing) {
    let profValue = '';
    let prereqValue = '';
    let choiceValue = '';
    for (const item of multiclassing.prerequisites) {
      let tmp = item.ability_score?.name === 'STR' ? 'Strength (STR)' :
                item.ability_score?.name === 'DEX' ? 'Dexterity (DEX)' :
                item.ability_score?.name === 'CON' ? 'Constitution (CON)' :
                item.ability_score?.name === 'WIS' ? 'Wisdom (WIS)' :
                item.ability_score?.name === 'INT' ? 'Intelligence (INT)' : 'Charisma (CHA)';
      prereqValue = prereqValue + 'Multiclassare con questa classe richiede un ' + tmp + ' minimo di: ' + item.minimum_score + '\n'; 
    }
    for (const item of multiclassing.proficiencies) {
      profValue = profValue + '\n- ' + item.name;
    }
    if(className === 'Bard') {
      choiceValue = choiceValue + '\n\nInoltre guadagni competenza in una delle abilita\' seguenti e una competenza con uno strumento qualsiasi:\n'
    }
    else if (className === 'Rogue' || className === 'Ranger') {
      choiceValue = choiceValue + '\n\nInoltre guadagni competenza in una delle abilita\' seguenti';
    }

    for (const itemChoice of multiclassing.proficiency_choices) {
      for (const set of itemChoice.from?.options) {
        choiceValue = choiceValue + '\n- ' + set.reference_item?.name;
      }
    }

    // c'è qualche errore nel db, la parte opzionale la scrivo a mano (circa)

    return prereqValue + 'L\'opzione di multiclasse con ' + className + ' conferisce le seguenti competenze:\n' + profValue + choiceValue; 
    //return JSON.stringify(multiclassing);
    //return choiceValue;
  }

  static displayStartingEquipment(className, startingEquipment: dnd.StartingEquipment[]) {
    let retValue = className + ' dispone del seguente equipaggiamento di partenza:\n';

    for (const el of startingEquipment) {
      retValue = retValue + '\n- ' + el.equipment?.name + ' x' + el.quantity;
    }

    return startingEquipment.length === 0 ? undefined : retValue;
  }

  static displayStartigEquipmentOptions(className: string,equipOpt: dnd.Choice[]) {
    let retValue = className + ' dispone delle seguenti opzioni di scelta di equipaggiamento:\n'
    for (const opt of equipOpt) {
      if (
        opt.choose !== null && 
        opt.desc !== null 
      ) {
        retValue = retValue + '\n- ' + opt.desc + ' - Choose: ' + opt.choose;
      }
      // for (const item of opt.from.options){
      //   if (item.choice?.desc !== undefined && item.choice?.choose !==undefined) {
      //     retValue = retValue + '\n- ' + item.choice.desc + ' - Choose: ' + item.choice.choose;
      //   }
      // }
    }
    
    // ci perdo le speranze, non capisco come flattarlo
    //return JSON.stringify(equipOpt);
    return retValue;
  }

  //Spellcasting funziona male quindi mi sto prendendo qualche libertà per scriverla di sana pianta
  static displaySpellcasting(className: string) {
    if (className === 'Wizard') {
      return `Spellcasting ability: INT
              \nSpell save DC = 8 + your proficiency bonus + your Intelligence modifier.
              \nSpell attack modifier = your proficiency bonus + your Intelligence modifier.
              
              \nCantrips known and spell slots at each level are specified in the respective level info.

              \nAt 1st level, you have a spellbook containing six 1st- level wizard spells of your choice. Your spellbook is the repository of the wizard spells you know, except your cantrips, which are fixed in your mind.
              \nEach time you gain a level as a wizard, you can add two wizard spells for free to your spellbook

              \nYou prepare the list of wizard spells that are available for you to cast. To do so, choose a number of wizard spells from your spellbook equal to your Intelligence modifier + your wizard level (minimum of one spell). The spells must be of a level for which you have spell slots.
              \nYou can change your list of prepared spells when you finish a long rest. Preparing a new list of wizard spells requires time spent studying your spellbook and memorizing the incantations and gestures you must make to cast the spell: at least 1 minute per spell level for each spell on your list.
              
              \nAs a Wizard you can cast a wizard spell as a ritual if that spell has the ritual tag and you have the spell in your spellbook. You don't need to have the spell prepared.
              \nFurthermore, You can use an arcane focus as a spellcasting focus for your wizard spells.
              `;
    }
    else if (className === 'Bard') {
      return `Spellcasting ability: Charisma (CHA).
              \nSpell save DC = 8 + your proficiency bonus + your Charisma modifier.
              \nSpell attack modifier = your proficiency bonus + your Charisma modifier.

              \nCantrips you know, spell slots and how many spells you know at each level are specified in the respective level info.
              \nAdditionally, when you gain a level in this class, you can choose one of the bard spells you know and replace it with another spell from the bard spell list, which also must be of a level for which you have spell slots.

              \nAs a Bard you can cast any bard spell you know as a ritual if that spell has the ritual tag.
              \nFurthermore, you can use a musical instrument as spellcasting focus for your bard spells
              `;
    }
    else if (className === 'Cleric') {
      return `Spellcasting ability: Wisdom (WIS)
              \nSpell save DC = 8 + your proficiency bonus + your Wisdom modifier.
              \nSpell attack modifier = your proficiency bonus + your Wisdom modifier.
              
              \nCantrips known and spell slots at each level are specified in the respective level info.

              \nYou prepare the list of cleric spells that are available for you to cast, choosing from the cleric spell list. When you do so, choose a number of cleric spells equal to your Wisdom modifier + your cleric level (minimum of one spell). The spells must be of a level for which you have spell slots.
              \nYou can change your list of prepared spells when you finish a long rest. Preparing a new list of cleric spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.

              \nAs a Cleric You can cast a cleric spell as a ritual if that spell has the ritual tag and you have the spell prepared.
              \nFurthermore, You can use a holy symbol as a spellcasting focus for your cleric spells.
              `;
    }
    else if (className === 'Druid') {
      return `Spellcasting ability: Wisdom (WIS)
              \nSpell save DC = 8 + your proficiency bonus + your Wisdom modifier.
              \nSpell attack modifier = your proficiency bonus + your Wisdom modifier.
              
              \nCantrips known and spell slots at each level are specified in the respective level info.

              \nYou prepare the list of druid spells that are available for you to cast, choosing from the druid spell list. When you do so, choose a number of druid spells equal to your Wisdom modifier + your druid level (minimum of one spell). The spells must be of a level for which you have spell slots.
              \nYou can also change your list of prepared spells when you finish a long rest. Preparing a new list of druid spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.

              \nAs a Druid You can cast a druid spell as a ritual if that spell has the ritual tag and you have the spell prepared.
              \nFurthermore, You can use a druidic focus as a spellcasting focus for your druid spells.
              `;
    }
    else if (className === 'Ranger') {
      return `Spellcasting ability: Wisdom (WIS)
              \nSpell save DC = 8 + your proficiency bonus + your Wisdom modifier.
              \nSpell attack modifier = your proficiency bonus + your Wisdom modifier.
              
              \nSpell slots and spells known at each level are specified in the respective level info.
              \nAdditionally, when you gain a level in this class, you can choose one of the ranger spells you know and replace it with another spell from the ranger spell list, which also must be of a level for which you have spell slots.
              `;
    }
    else if (className === 'Paladin') {
      return `Spellcasting ability: Charisma (CHA)
              \nSpell save DC = 8 + your proficiency bonus + your Charisma modifier.
              \nSpell attack modifier = your proficiency bonus + your Charisma modifier.
              
              \nSpell slots at each level are specified in the respective level info.
              
              \nYou prepare the list of paladin spells that are available for you to cast, choosing from the paladin spell list. When you do so, choose a number of paladin spells equal to your Charisma modifier + half your paladin level, rounded down (minimum of one spell). The spells must be of a level for which you have spell slots.
              \nYou can change your list of prepared spells when you finish a long rest. Preparing a new list of paladin spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.

              \nFurthermore, You can use a holy symbol as a spellcasting focus for your cleric spells.
              `;
    }
    else if (className === 'Sorcerer') {
      return `Spellcasting ability: Charisma (CHA).
              \nSpell save DC = 8 + your proficiency bonus + your Charisma modifier.
              \nSpell attack modifier = your proficiency bonus + your Charisma modifier.

              \nCantrips you know, spell slots and how many spells you know at each level are specified in the respective level info.
              \nAdditionally, when you gain a level in this class, you can choose one of the sorcerer spells you know and replace it with another spell from the sorcerer spell list, which also must be of a level for which you have spell slots.
              
              \nFurthermore, You can use an arcane focus as a spellcasting focus for your sorcerer spells.
              `;
    }
    else if (className === 'Warlock') {
      return `Spellcasting ability: Charisma (CHA).
              \nSpell save DC = 8 + your proficiency bonus + your Charisma modifier.
              \nSpell attack modifier = your proficiency bonus + your Charisma modifier.

              \nCantrips you know, spell slots and how many spells you know at each level are specified in the respective level info.
              \nAdditionally, when you gain a level in this class, you can choose one of the warlock spells you know and replace it with another spell from the warlock spell list, which also must be of a level for which you have spell slots.

              \nFurthermore, You can use an arcane focus as a spellcasting focus for your warlock spells.
              `;
    }

    return undefined;
  }

  static displaySpells(className,spells) {
    let retValue = 'Lista incantesimi semplificata di ' + className + ':\n';

    for (const item of spells) {
      retValue = retValue + '\n- ' + item.name + '  - Level: ' + item.level;
    }

    return retValue === 'Lista incantesimi semplificata di ' + className + ':\n' ? undefined : retValue;
  } 

  static displaySubclasses(className,subclasses) {
    let retValue = 'Sottoclassi disponibili di ' + className + ':\n';

    for (const item of subclasses) {
      retValue = retValue + '\n- ' + item.name;
    }

    return retValue;
  }

  static assignlevelsToClass(className: string) {
    let classLvls = [];
    let lowercaseName = className.toLowerCase();
    for (let i=0; i<ClassSelectionPage.lvlsArray.length; i++) {
      if (ClassSelectionPage.lvlsArray[i].idx == lowercaseName) {
        return ClassSelectionPage.lvlsArray[i].content;
      }
    }

    return 'C\'è stato qualche errore';
  }

  generateClassLevels = (name) => {
    return new Promise<any>((resolve: (x: void) => void,reject: (x:any) => void) => {
      this.classDisplayer
      .displaySpecificLevel(name)
      .subscribe({
        next: (value: any) => {
          console.log('sono nel subscribe --> ', name);
          ClassSelectionPage.lvlsArray.push({
            idx: value.levels[0].name,
            content: value.levels,
          });
          resolve();
        },
        error: (err: any) => reject(err)
      });
    });   
  }


  retrieveAllClassLevels = async () => {

    for (const name of this.classesNames) {
      try {
        await this.generateClassLevels(name);
      }
      catch (err) {Alerts.error(err);}
    }

    // this.chosenClass = '';
    const classesButtons = {
    'Barbarian': {
      button: { text: 'Select this class', expand: ''},
      context: (event: Event) => {
        this.chosenClass = 'Barbarian';
      }
    },
    'Bard': {
      button: { text: 'Select this class', expand: ''},
      context: (event: Event) => {
        this.chosenClass = 'Bard';
      }
    }, 
    'Cleric': {
      button: { text: 'Select this class', expand: ''},
      context: (event: Event) => {
        this.chosenClass = 'Cleric';
      }
    }, 
    'Druid': {
      button: { text: 'Select this class', expand: ''},
      context: (event: Event) => {
        this.chosenClass = 'Druid';
      }
    }, 
    'Fighter': {
      button: { text: 'Select this class', expand: ''},
      context: (event: Event) => {
        this.chosenClass = 'Fighter';
      }
    }, 
    'Monk': {
      button: { text: 'Select this class', expand: ''},
      context: (event: Event) => {
        this.chosenClass = 'Monk';
      }
    }, 
    'Paladin': {
      button: { text: 'Select this class', expand: ''},
      context: (event: Event) => {
        this.chosenClass = 'Paladin';
      }
    }, 
    'Ranger': {
      button: { text: 'Select this class', expand: ''},
      context: (event: Event) => {
        this.chosenClass = 'Ranger';
      }
    }, 
    'Rogue': {
      button: { text: 'Select this class', expand: ''},
      context: (event: Event) => {
        this.chosenClass = 'Rogue';
      }
    }, 
    'Sorcerer': {
      button: { text: 'Select this class', expand: ''},
      context: (event: Event) => {
        this.chosenClass = 'Sorcerer';
      }
    }, 
    'Warlock': {
      button: { text: 'Select this class', expand: ''},
      context: (event: Event) => {
        this.chosenClass = 'Warlock';
      }
    }, 
    'Wizard': {
      button: { text: 'Select this class', expand: ''},
      context: (event: Event) => {
        this.chosenClass = 'Wizard';
      }
    }
  }

    this.classDisplayer
    .displayClasses()
    .subscribe({
      next: (value: any) => {
        this.classesArray = value.classes.map(function (item: any) {
          return {
            imageURL: "../assets/icon/classes_icons/" + item.name.toLowerCase() + ".svg",
            desc: ClassSelectionPage.classesDescriptions[item.name].text,
            value: item.name + " accordion",
            choiceButton: classesButtons[item.name],
            title: item.name,
            hit_die: item.hit_die, 
            base_equipment: ClassSelectionPage.generateBaseEquipment(item.starting_equipment),
            base_proficiencies: ClassSelectionPage.generateBaseProficiencies(item.proficiencies),
            base_saving_throws: ClassSelectionPage.generateBaseSavingThrows(item.saving_throws),
            content: [
              { value: "proficiencies accordion",  title: "Competenze", content: ClassSelectionPage.displayProficiencies(item.name,item.proficiencies)},
              { value: "saving_throws accordion",  title: "Tiri salvezza", content: ClassSelectionPage.displaySavingThrows(item.name,item.saving_throws)},
              { value: "proficiency_choices accordion",  title: "Competenze a scelta", content: ClassSelectionPage.displayProficiencyChoices(item.name, item.proficiency_choices)},
              { value: "multiclassing accordion",  title: "Opzioni di multiclasse", content: ClassSelectionPage.displayMulticlassing(item.name,item.multiclassing)},
              { value: "starting_equipment accordion",  title: "Equipaggiamento di partenza", content: ClassSelectionPage.displayStartingEquipment(item.name,item.starting_equipment)},
              { value: "starting_equipment_options accordion",  title: "Equipaggiamento di partenza a scelta", content: ClassSelectionPage.displayStartigEquipmentOptions(item.name,item.starting_equipment_options)},
              { value: "spellcasting accordion",  title: "Caratteristiche da incantatore", content: ClassSelectionPage.displaySpellcasting(item.name)},
              { value: "spell accordion",  title: "Lista possibili incantesimi", content: ClassSelectionPage.displaySpells(item.name,item.spells)},
              { value: "subclasses accordion",  title: "Sottoclassi possibili", content: ClassSelectionPage.displaySubclasses(item.name,item.subclasses)},
              //{ value: "levels accordion",  title: "Livelli possibili", content: JSON.stringify(item.levels)},
            ],
            levels: ClassSelectionPage.assignlevelsToClass(item.name),
          };
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  constructor(public popoverController: PopoverController, private router: Router, private classDisplayer: CharacterManagementService) {
    this.retrieveAllClassLevels();
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  
}
