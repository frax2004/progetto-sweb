import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonItem, IonCol, IonLabel, PopoverController } from '@ionic/angular/standalone';
import { Navigate, Popups } from 'src/app/core/core';
import { Router } from '@angular/router';
import { ButtonComponent } from "src/app/components/button/button.component";

@Component({
  selector: 'app-character-spells',
  templateUrl: './character-spells.page.html',
  styleUrls: ['./character-spells.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonItem, IonCol, ButtonComponent, IonLabel]
})
export class CharacterSpellsPage implements OnInit {
  buttonCallbacks = {
    indietro: { onClick: Navigate.toPath(this.router,'character-sheet')},
    mago: { onClick: this.toggleClass('Mago')},
    chierico: { onClick: this.toggleClass('Chierico')},
    warlock: { onClick: this.toggleClass('Warlock')},
  };

  incantesimiWarlock = [
    {nome: 'Witch bolt', livello: '1', tmpLanc: 'Azione', durata: 'Istantaneo', gittata: 'un miliardo', concentrazione: 'no', componenti: 'M,V,S', scMag: 'Invocazione', descrizione: Popups.ofSimpleText(this.popoverController,'HOLLOW PURPLE')},
    {nome: 'Hex', livello: '1', tmpLanc: 'Azione', durata: 'Istantaneo', gittata: 'un miliardo', concentrazione: 'no', componenti: 'M,V,S', scMag: 'Invocazione', descrizione: Popups.ofSimpleText(this.popoverController,'HOLLOW PURPLE')},
  ]

  incantesimiMago = [
    {nome: 'Chromatic Orb', livello: '1', tmpLanc: 'Azione', durata: 'Istantaneo', gittata: 'un miliardo', concentrazione: 'no', componenti: 'M,V,S', scMag: 'Invocazione', descrizione: Popups.ofSimpleText(this.popoverController,'HOLLOW PURPLE')},
    {nome: 'Divinazione', livello: '99', tmpLanc: 'istantaneo o rituale', durata: '5o giorni', gittata: 'si', concentrazione: 'si' , componenti: '', scMag: 'Necromanzia', descrizione:  Popups.ofSimpleText(this.popoverController,'Si')},
    {nome: 'Palla di fuoco', livello: '3', tmpLanc: 'Azione', durata: 'istantaneo', gittata: 'assai', concentrazione: 'no', componenti: 'M,S,V', scMag: 'Esplosioni', descrizione:  Popups.ofSimpleText(this.popoverController,'Non ho chiesto quanto è grande la stanza')},
  ];

  incantesimiChierico = [
    {nome: 'Curare Ferite', livello: '1' , tmpLanc: 'Azione', durata: 'Istantanea', gittata: 'Tocco', concentrazione: 'no', componenti: 'V,S', scMag: 'Cura', descrizione: Popups.ofSimpleText(this.popoverController,'Viva gesù')},
  ];

  incantesimi = {
    mago: this.incantesimiMago,
    chierico: this.incantesimiChierico, 
    warlock: this.incantesimiWarlock,
  };

  currClass: String = 'Mago'
  currAbility: String = 'Intelligenza';
  currModifier: String = '+9';
  currCD: String = '18';
  currAttBonus: String = '+15';
  currIncantesimi: any = this.incantesimi['mago'];

  toggleClass(className: String) {
    const f = () => {
        if (className==='Mago') {
        this.currClass = 'Mago';
        this.currAbility = 'Intelligenza';
        this.currModifier = '+9';
        this.currCD = '18'; // ovviamente questi parametri dipenderanno dal db
        this.currAttBonus = '+15';
        this.currIncantesimi = this.incantesimi['mago'];
        //più avanti pensare a disattivare il bottone una volta che viene cliccato
      }
      else if (className==='Chierico') {
        this.currClass = 'Chierico';
        this.currAbility = 'Saggezza';
        this.currModifier = '+8'
        this.currCD = '13';
        this.currAttBonus = '+36'
        this.currIncantesimi = this.incantesimi['chierico'];
      }
      else if (className==='Warlock') {
        this.currClass = 'Warlock';
        this.currAbility = 'Carisma';
        this.currModifier = '+7'
        this.currCD = '16';
        this.currAttBonus = '+0'
        this.currIncantesimi = this.incantesimi['warlock'];
      }
    } 

    return f;
  }


  constructor(private router: Router, public popoverController: PopoverController) { }

  ngOnInit() {
  }

}
