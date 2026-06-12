import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonLabel, 
  IonItem, 
  IonFooter, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonAccordion, 
  IonAccordionGroup, 
  IonThumbnail, 
  IonList 
} from '@ionic/angular/standalone';
import { Card } from 'src/app/components/card/Card';
import { CarouselComponent } from "src/app/components/carousel/carousel.component";
import { CardComponent } from "src/app/components/card/card.component";
import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { LabelComponent } from "src/app/components/label/label.component";
import { UnorderedListElementComponent } from "src/app/components/unordered-list-element/unordered-list-element.component";
import { Router } from '@angular/router';
import { UserUtilitiesService } from 'src/app/services/user.utilities.service';
import { RouterLink } from '@angular/router';
import { State } from 'src/app/core/state';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, RouterLink ,IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonItem, CarouselComponent, IonFooter, CardComponent, IonGrid, IonRow, IonCol, AccordionComponent, IonAccordion, IonAccordionGroup, IonThumbnail, LabelComponent, IonList, UnorderedListElementComponent]
})
export class LandingPagePage implements OnInit {
  cards: Card[] = [
    { title:'GOHAN', subtitle:'Umano Mago lvl 999', imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL79C_DSgCRvMOtdv7FOgMbq7OOwNpVIBL7g&s" },
    { title:'io :]', subtitle:'Gnomo della foresta falegname lvl 1', imageURL: "https://images.findagrave.com/photos/2018/333/UNCEM_639484_c87bef55-735e-4594-ae70-005e6f2e4828.jpeg" },
    { title:'L\'uomo piu\' sexy di Lignano Sabbiadoro', subtitle:'Fata (trilli) bardo lvl 5', imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStbWsAJpOJ-za6GReXxAYlj-WYYPKqWtIpGw&s" },
  ]

  notLoggedListElements = [
    // { text: 'Login', onClick:  Navigate.toPath(this.router,'landing-page')()}
  ];

  logContext(event: Event) {
    return this.router.navigate(['landing-page']);
  }

  isLogged = State.User.isLogged;

  constructor(private router: Router, private userUtilities: UserUtilitiesService) { 
    // userUtilities
    // .isLogged()
    // .subscribe({
    //   next: (value) => {
    //     this.isLogged = value.isLogged;
    //     console.log(this.isLogged);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }

  ngOnInit() {
    // this.userUtilities.isLogged()
    // .subscribe({
    //   next: (value) => {
    //     this.isLogged = value.isLogged;
    //     console.log(this.isLogged);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }

}
