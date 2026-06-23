import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { Card } from 'src/app/components/card/Card';
import { Navigate } from 'src/app/core/core';
import { Router } from '@angular/router';
import { CharacterInstance } from '../Character creation pipeline/CharacterInformation';

@Component({
  selector: 'app-character-creation-info',
  templateUrl: './character-creation-info.page.html',
  styleUrls: ['./character-creation-info.page.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
  ]
})
export class CharacterCreationInfoPage implements OnInit {

  buttonCallbacks = {
    nextPage: {onClick: () => {
      CharacterInstance.unsetAll();
      Navigate.toPath(this.router,'class-selection')();
    }}
  };
  
  @Input() cards: Card[] = [
    {
      imageURL: 'https://i.pinimg.com/1200x/68/9b/59/689b594cf67d0a37ada67687ea99bd33.jpg',
      title: "Create a character... ",
      subtitle: " ...with our tools.",
      content: "And start playing!"
    },
    {
      imageURL: 'https://i.pinimg.com/736x/c9/22/7c/c9227c37b1a9e905863e3d1471c15278.jpg',
      title: "Basic rules",
      subtitle: "Why do I need a character",
      content: "As a player, your character is the key to interact with the world and the stories created by your dungeon master."
    },
    {
      imageURL: 'https://i.redd.it/7e1ewocvy8721.jpg',
      title: "Basic rules",
      subtitle: "How is a character made: CLASS",
      content: "Every character has a player class (and starting from level 3 a subclass) which determines the general fantasy and powers of your character. For example you could be a Wizard that studies magic from a young age or a Druid that loves and protects nature."
    },
    {
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThouEoYKD-mRjAxqyOL4fSs6Tll2NA11JbB3pinOAyxQ&s=10',
      title: "Basic rules",
      subtitle: "How is a character made: SPECIES",
      content: "Every character has a species (and in some cases a subspecies) they belong to. The species describes, as the name intends, the type of humanoid the character is. Your character could be a noble elf or an hard-working dwarf!"
    },
    {
      imageURL: 'https://i.pinimg.com/1200x/07/59/bc/0759bcbf392cc5dfce90b60260e3925f.jpg',
      title: "Basic rules",
      subtitle: "How is a character made: BACKGROUND",
      content: "Every character has a background, which describes the place they come from or the people that raised them."
    },
    {
      imageURL: 'https://i.pinimg.com/1200x/6d/7e/a0/6d7ea0428a1541d8460681894e216dd0.jpg',
      title: "Basic rules",
      subtitle: "How is a character made: STATISTICS",
      content: "There are 6 statistics in the game: Strength, Dexterity, Constitution, Intelligence, Wisdom and Charisma. Each of them has to range from a minimum of 1 to a maximum of 20. Every statistic is tied to different abilities and checks and every class may prefer a statistic over another."
    },
    {
      imageURL: 'https://i.pinimg.com/1200x/99/be/44/99be440beadd890dbf02cf75166a0ede.jpg',
      title: "Basic rules",
      subtitle: "How is a character made: EQUIPMENT and SPELLS",
      content: "As a closing note, every character has an equipment they carry with them. Some classes also know how to cast spells! The classes with spellcasting abilities are Bard, Cleric, Druid, Paladin, Ranger, Sorcerer, Warlock, Wizard."
    },
  ];

  goBack = () => this.router.navigate(['/characters']);
  currentCard = signal<number>(this.cards[0] !== undefined ? 0 : -1);

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public advance(amount: number) {
    const i = this.currentCard();
    if(i < 0 || i + amount < 0 || i + amount >= this.cards.length) return;
    this.currentCard.set(
      this.currentCard() + amount
    );
  }

}
