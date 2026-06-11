import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TitleComponent } from "src/app/components/title/title.component";
import { CharacterManagementService } from 'src/app/services/character.management.service';

@Component({
  selector: 'app-option-selection',
  templateUrl: './option-selection.page.html',
  styleUrls: ['./option-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TitleComponent]
})
export class OptionSelectionPage implements OnInit {
  classChoices;


  constructor(private choicesDiplayer: CharacterManagementService) {
    this.choicesDiplayer
    .displayClasses()
    .subscribe({
      next: (value: any) => {
        this.choicesDiplayer = value.classes.map(function (item: any) {
          return {
            name: item.name,
            
          }
        });
      },
      error: (err) => alert(err)
    })
  }

  ngOnInit() {
  }

}
