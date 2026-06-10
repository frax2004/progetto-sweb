import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TitleComponent } from "src/app/components/title/title.component";
import { CharacterManagementService } from 'src/app/services/character.management.service';
import { CharacterInstance } from '../CharacterInformation';

@Component({
  selector: 'app-spell-selection',
  templateUrl: './spell-selection.page.html',
  styleUrls: ['./spell-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TitleComponent]
})
export class SpellSelectionPage implements OnInit {
  levelRow;


  constructor(private levelRowDisplayer: CharacterManagementService) {
    this.levelRowDisplayer
    .displayLevelRowByClassAndLevel(
      CharacterInstance.selectedLevel,
      CharacterInstance.selectedClass
    )
    .subscribe({
      next:(value: any) => {
        this.levelRow = value.level.map(function (item: any) {
          return {
            name: item.name,
            level: item.level,
            cantrips_known: item.cantrips_known,
            spell_slots_level_1: item.spell_slots_level_1,
            spell_slots_level_2: item.spell_slots_level_2,
            spell_slots_level_3: item.spell_slots_level_3,
            spell_slots_level_4: item.spell_slots_level_4,
            spell_slots_level_5: item.spell_slots_level_5,
            spell_slots_level_6: item.spell_slots_level_6,
            spell_slots_level_7: item.spell_slots_level_7,
            spell_slots_level_8: item.spell_slots_level_8,
            spell_slots_level_9: item.spell_slots_level_9,
            spells_known: item.spells_known,
          }
        });
      },
      error: (err) => console.log(err)
    });
  }

  ngOnInit() {
  }

}
