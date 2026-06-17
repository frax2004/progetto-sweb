import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, PopoverController, IonItem, IonFooter, IonButton, IonAccordionGroup, IonAccordion, IonLabel, IonThumbnail, IonAlert } from '@ionic/angular/standalone';
import { Accordion } from 'src/app/components/accordion/Accordion';
import { Button } from 'src/app/components/button/Button';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ButtonContext } from 'src/app/components/button/ButtonContext';
import { Navigate, Popups } from 'src/app/core/core';
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { Router } from '@angular/router';
import { TitleComponent } from "src/app/components/title/title.component";
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { LabelComponent } from "src/app/components/label/label.component";
import { dnd } from 'dbserver/database.queries';
import { CharacterInstance } from '../CharacterInformation';

@Component({
  selector: 'app-species-selection',
  templateUrl: './species-selection.page.html',
  styleUrls: ['./species-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, AccordionComponent, IonFooter, ButtonComponent, TitleComponent, LabelComponent, IonButton, IonAccordionGroup, IonAccordion, IonLabel, IonThumbnail, IonAlert]
})
export class SpeciesSelectionPage implements OnInit {
  b1_button: Button = { text: 'clicca qui', expand: ''};
    b1_context: ButtonContext = { onClick: Popups.ofSimpleText(this.popoverController, "Hai scelto questa specie")};
    b1: ButtonComponent = {
      button: this.b1_button, context: this.b1_context,
      // questa riga sotto l'ha aggiunta automaticamente l'estensione, non so perché
      ngOnInit: function (): void {
        throw new Error('Function not implemented.');
      }
    }

  b2_context: ButtonContext = { onClick: Popups.ofSimpleText(this.popoverController, "Andiamo les go les go milano")};

  nextPageAlertOpen: boolean = false;

  nextPage = () => {
    if (SpeciesSelectionPage.selectedSpecies !== undefined) {
      for(const species of this.speciesArray) {
        if (species.name.toLowerCase() === SpeciesSelectionPage.selectedSpecies.toLowerCase()) {
          CharacterInstance.speciesSize = species.size;
          CharacterInstance.speciesSpeed = species.speed;
          CharacterInstance.speciesAbilityBonus = species.species_ability_bonuses;
          CharacterInstance.speciesLanguages = species.species_languages;
          CharacterInstance.speciesTraits = species.species_traits;
        }
      }
      CharacterInstance.chosenSpecies = SpeciesSelectionPage.selectedSpecies;
      this.router.navigate(['/background-selection']);
    }
    else this.setOpenAlert(true);
  }



  setOpenAlert(isOpen: boolean) {
    this.nextPageAlertOpen = isOpen;
  } 


  buttonCallbacks = {
    nextPage: { onClick: this.nextPage },
    previousPage: { onClick: Navigate.toPath(this.router,'class-selection')},
  } 

  placeholderAlert(event: Event) {alert('Ancora da implementare');}

  speciesArray = [];
  static selectedSpecies: string = undefined;

  static speciesButton = {
    'Dwarf': {
      button: { text: 'Select this species', expand: ''},
      context: (event: Event) => {
        SpeciesSelectionPage.selectedSpecies = 'Dwarf';
      }
    },
    'Elf': {
      button: { text: 'Select this species', expand: ''},
      context: (event: Event) => {
        SpeciesSelectionPage.selectedSpecies = 'Elf';
      }
    },
    'Halfling': {
      button: { text: 'Select this species', expand: ''},
      context: (event: Event) => {
        SpeciesSelectionPage.selectedSpecies = 'Halfling';
      }
    },
    'Human': {
      button: { text: 'Select this species', expand: ''},
      context: (event: Event) => {
        SpeciesSelectionPage.selectedSpecies = 'Human';
      }
    },
    'Dragonborn': {
      button: { text: 'Select this species', expand: ''},
      context: (event: Event) => {
        SpeciesSelectionPage.selectedSpecies = 'Dragonborn';
      }
    },
    'Half-Elf': {
      button: { text: 'Select this species', expand: ''},
      context: (event: Event) => {
        SpeciesSelectionPage.selectedSpecies = 'Half-elf';
      }
    },
    'Half-Orc': {
      button: { text: 'Select this species', expand: ''},
      context: (event: Event) => {
        SpeciesSelectionPage.selectedSpecies = 'Half-orc';
      }
    },
    'Gnome': {
      button: { text: 'Select this species', expand: ''},
      context: (event: Event) => {
        SpeciesSelectionPage.selectedSpecies = 'Gnome';
      }
    },
    'Tiefling': {
      button: { text: 'Select this species', expand: ''},
      context: (event: Event) => {
        SpeciesSelectionPage.selectedSpecies = 'Tiefling';
      }
    },
  }

  static speciesDescription = {
    'Dwarf': `Kingdoms rich in ancient grandeur, halls carved into the roots of mountains, the echoing of picks and hammers in deep mines and blazing forges, a commitment to clan and tradition, and a burning hatred of goblins and orcs—these common threads unite all dwarves.`,
    'Elf': `Elves are a magical people of otherworldly grace, living in the world but not entirely part of it. They live in places of ethereal beauty, in the midst of ancient forests or in silvery spires glittering with faerie light, where soft music drifts through the air and gentle fragrances waft on the breeze. Elves love nature and magic, art and artistry, music and poetry, and the good things of the world.`,
    'Halfling': `The comforts of home are the goals of most halflings’ lives: a place to settle in peace and quiet, far from marauding monsters and clashing armies; a blazing fire and a generous meal; fine drink and fine conversation. Though some halflings live out their days in remote agricultural communities, others form nomadic bands that travel constantly, lured by the open road and the wide horizon to discover the wonders of new lands and peoples. But even these wanderers love peace, food, hearth, and home, though home might be a wagon jostling along a dirt road or a raft floating downriver.`,
    'Human': `In the reckonings of most worlds, humans are the youngest of the common races, late to arrive on the world scene and short-lived in comparison to dwarves, elves, and dragons. Perhaps it is because of their shorter lives that they strive to achieve as much as they can in the years they are given. Or maybe they feel they have something to prove to the elder races, and that’s why they build their mighty empires on the foundation of conquest and trade. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.`,
    'Dragonborn': `Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension. Shaped by draconic gods or the dragons themselves, dragonborn originally hatched from dragon eggs as a unique race, combining the best attributes of dragons and humanoids. Some dragonborn are faithful servants to true dragons, others form the ranks of soldiers in great wars, and still others find themselves adrift, with no clear calling in life.`,
    'Half-Elf': `Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents: human curiosity, inventiveness, and ambition tempered by the refined senses, love of nature, and artistic tastes of the elves. Some half-elves live among humans, set apart by their emotional and physical differences, watching friends and loved ones age while time barely touches them. Others live with the elves, growing restless as they reach adulthood in the timeless elven realms, while their peers continue to live as children. Many half-elves, unable to fit into either society, choose lives of solitary wandering or join with other misfits and outcasts in the adventuring life.`,
    'Half-Orc': `Whether united under the leadership of a mighty warlock or having fought to a standstill after years of conflict, orc and human communities, sometimes form alliances. When these alliances are sealed by marriages, half-orcs are born. Some half-orcs rise to become proud leaders of orc communities. Some venture into the world to prove their worth. Many of these become adventurers, achieving greatness for their mighty deeds.`,
    'Gnome': `A constant hum of busy activity pervades the warrens and neighborhoods where gnomes form their close-knit communities. Louder sounds punctuate the hum: a crunch of grinding gears here, a minor explosion there, a yelp of surprise or triumph, and especially bursts of laughter. Gnomes take delight in life, enjoying every moment of invention, exploration, investigation, creation, and play.`,
    'Tiefling': `To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And to twist the knife, tieflings know that this is because a pact struck generations ago infused the essence of Asmodeus—overlord of the Nine Hells—into their bloodline. Their appearance and their nature are not their fault but the result of an ancient sin, for which they and their children and their children’s children will always be held accountable.`,
  }


  static generateSpeciesAbilityBonuses(abBonuses: dnd.AbilityBonus[]) {
    let abilityBonuses = {
      'strength': 0,
      'dexterity' : 0,
      'constitution' : 0,
      'wisdom' : 0,
      'intelligence' : 0,
      'charisma' : 0
    };

    for (const ab of abBonuses) {
      const abScoreName = ab.ability_score?.name === 'STR' ? 'strength' :
                          ab.ability_score?.name === 'DEX' ? 'dexterity' :
                          ab.ability_score?.name === 'CON' ? 'constitution' :
                          ab.ability_score?.name === 'WIS' ? 'wisdom' :
                          ab.ability_score?.name === 'INT' ? 'intelligence' : 'charisma';
      abilityBonuses[abScoreName] = abilityBonuses[abScoreName] + ab.bonus;
    }

    return abilityBonuses;
  }

  static generateTraits(traits: dnd.APIReference[]) {
    let retArray = [];

    for (const trait of traits) {
      retArray.push(trait.index);
    }

    return retArray;
  }

  static displayAbilityBonuses(specName: string,abBonuses: dnd.AbilityBonus[]) {
    let retValue = specName + ' gives the following bonuses to Ability Scores:\n';

    for (const ab of abBonuses) {
      const abScoreName = ab.ability_score?.name === 'STR' ? 'Strength (STR)' :
                          ab.ability_score?.name === 'DEX' ? 'Dexterity (DEX)' :
                          ab.ability_score?.name === 'CON' ? 'Constitution (CON)' :
                          ab.ability_score?.name === 'WIS' ? 'Wisdom (WIS)' :
                          ab.ability_score?.name === 'INT' ? 'Intelligence (INT)' : 'Charisma (CHA)';
      retValue = retValue + '\n +' + ab.bonus + ' to ' + abScoreName;
    } 

    return retValue;
  } 

  static displayLanguages(specName: string,languages: dnd.Language[]) {
    let retValue = specName + ' knows how to speak the following languages:\n';

    for (const language of languages) {
      retValue = retValue + '\n- ' + language.name;
    }

    return retValue;
  }

  static displayTraits(specName,traits: dnd.APIReference[]) {
    if (traits[0]?.name === undefined) return undefined;
    let retValue = specName + ' possesses the following traits:\n';

    for(const trait of traits) {
      retValue = retValue + '\n- ' + trait.name;
    }

    return retValue;
  }

  static displayOptionalLanguages(specName: string, languages: dnd.Choice) {
    if (languages?.from === undefined) return undefined;
    let retValue = specName + ' can choose ' + languages?.choose + ' language among the following:\n';

    for(const item of languages?.from?.options) {
      retValue = retValue + '\n- ' + item.reference_item.name;
    }

    return retValue;
    // return languages?.from === undefined ? undefined : JSON.stringify(languages.from);
  }

  static displayAbilityBonusOptions(specName: string) {
    if (specName.toLowerCase() !== 'half-elf') return undefined;
    //lo faccio così tanto solo il mezzelfo ha questa opzione
    return specName + ' also grants a bonus of +1 to 2 other ability scores of your choice between the following\n\n- Strength (STR)\n- Dexterity (DEX)\n- Constitution (CON)\n- Intelligence (INT)\n- Wisdom (WIS)';
  }

  constructor(public popoverController: PopoverController, private router: Router, private speciesSelector: CharacterManagementService ) {
    this.speciesSelector
    .displaySpecies()
    .subscribe({
      next: (value: any) =>{
        this.speciesArray = value.species.map(function (item: any){
          return {
            desc: SpeciesSelectionPage.speciesDescription[item.name],
            choiceButton: SpeciesSelectionPage.speciesButton[item.name],
            imageURL: "../assets/icon/d20.svg",
            value: item.name + ' accordion',
            name: item.name,
            speed: item.speed,
            alignment: item.alignment,
            age: item.age,
            size: item.size,
            size_description: item.size_description,
            language_desc: item.language_desc,
            species_ability_bonuses: SpeciesSelectionPage.generateSpeciesAbilityBonuses(item.ability_bonuses),
            species_languages: item.languages,
            species_traits: SpeciesSelectionPage.generateTraits(item.traits),
            content: [
              { value: "ability_bonuses accordion",  title: "Ability Bonus", content: SpeciesSelectionPage.displayAbilityBonuses(item.name,item.ability_bonuses)},
              { value: "ability_bonus_options accordion",  title: "Ability Bonus Options", content: SpeciesSelectionPage.displayAbilityBonusOptions(item.name)},
              { value: "languages accordion",  title: "Languages", content: SpeciesSelectionPage.displayLanguages(item.name,item.languages)},
              { value: "language_options accordion",  title: "Language Options", content: SpeciesSelectionPage.displayOptionalLanguages(item.name,item.language_options)},
              { value: "traits accordion",  title: "Traits", content: SpeciesSelectionPage.displayTraits(item.name,item.traits)},
            ],
            subspecies: item.subspecies, 
          }
        });
      },
      error: (err) => console.log(err)
    })
  }

  ngOnInit() {
  }

}
