import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, PopoverController, IonItem, IonFooter, IonButton, IonAccordionGroup, IonAccordion, IonLabel, IonThumbnail } from '@ionic/angular/standalone';
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

@Component({
  selector: 'app-species-selection',
  templateUrl: './species-selection.page.html',
  styleUrls: ['./species-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, AccordionComponent, IonFooter, ButtonComponent, TitleComponent, LabelComponent, IonButton, IonAccordionGroup, IonAccordion, IonLabel, IonThumbnail]
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

  buttonCallbacks = {
    nextPage: { onClick: Navigate.toPath(this.router,'background-selection')},
    previousPage: { onClick: Navigate.toPath(this.router,'class-selection')},
  } 

  placeholderAlert(event: Event) {alert('Ancora da implementare');}

  speciesArray = [];

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
            imageURL: "../assets/icon/d20.svg",
            value: item.name + ' accordion',
            name: item.name,
            speed: item.speed,
            alignment: item.alignment,
            age: item.age,
            size: item.size,
            size_description: item.size_description,
            language_desc: item.language_desc,
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
