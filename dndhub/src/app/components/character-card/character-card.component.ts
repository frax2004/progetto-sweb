import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card/Card';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  imports: [ButtonComponent],
})
export class CharacterCardComponent  implements OnInit {

  @Input() card: Card;

  constructor() { }
  ngOnInit() {}


}
