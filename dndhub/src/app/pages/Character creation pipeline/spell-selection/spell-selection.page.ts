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
            
          }
        });
      },
      error: (err) => console.log(err)
    });
  }

  ngOnInit() {
  }

}
