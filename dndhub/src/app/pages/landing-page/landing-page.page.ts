import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonFooter, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Card } from 'src/app/components/card/Card';
import { CarouselComponent } from "src/app/components/carousel/carousel.component";
import { CardComponent } from "src/app/components/card/card.component";
import { AccordionComponent } from "src/app/components/accordion/accordion.component";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonItem, CarouselComponent, IonFooter, CardComponent, IonGrid, IonRow, IonCol, AccordionComponent]
})
export class LandingPagePage implements OnInit {
  cards: Card[] = [
    { title:'GOHAN', subtitle:'Umano Mago lvl 999', imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL79C_DSgCRvMOtdv7FOgMbq7OOwNpVIBL7g&s" },
    { title:'io :]', subtitle:'Gnomo della foresta falegname lvl 1', imageURL: "https://images.findagrave.com/photos/2018/333/UNCEM_639484_c87bef55-735e-4594-ae70-005e6f2e4828.jpeg" },
    { title:'L\'uomo piu\' sexy di Lignano Sabbiadoro', subtitle:'Fata (trilli) bardo lvl 5', imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStbWsAJpOJ-za6GReXxAYlj-WYYPKqWtIpGw&s" },
  ]


  constructor() { }

  ngOnInit() {
  }

}
