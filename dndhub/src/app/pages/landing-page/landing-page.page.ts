import { Component, OnInit, signal, Signal, ViewChild } from '@angular/core';
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
  IonAccordion, 
  IonAccordionGroup, 
  IonThumbnail, 
  IonList,
  IonInput,
  IonTextarea,
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
import { ButtonComponent } from 'src/app/components/button/button.component';
import { Alerts, defualtCharacterImgURL } from 'src/app/core/core';
import { CampagnaService } from 'src/app/services/campagna.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, RouterLink ,
    IonTitle, 
    IonToolbar, CommonModule, FormsModule, 
    IonLabel, 
    IonItem, CarouselComponent, 
    IonFooter, CardComponent, 
    AccordionComponent, 
    IonAccordion, 
    IonAccordionGroup,
  ]
})
export class LandingPagePage implements OnInit {
  
  @ViewChild('feedback_title') feedbackTitle: IonInput;
  @ViewChild('feedback_content') feedbackContent: IonTextarea;

  charCards = signal<Card[]>([]);

  sendFeedback = () => {
    const feed = {
      title: this.feedbackTitle.value,
      desc: this.feedbackContent.value,
    };
    console.log("sending feedback " + JSON.stringify(feed));
    Alerts.good("Ti ringraziamo per il tuo feedback");
  }
  
  cards: Card[] = [
    { title:'GOHAN', subtitle:'Umano Mago lvl 999', imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL79C_DSgCRvMOtdv7FOgMbq7OOwNpVIBL7g&s" },
    { title:'io :]', subtitle:'Gnomo della foresta falegname lvl 1', imageURL: "https://images.findagrave.com/photos/2018/333/UNCEM_639484_c87bef55-735e-4594-ae70-005e6f2e4828.jpeg" },
    { title:'L\'uomo piu\' sexy di Lignano Sabbiadoro', subtitle:'Fata (trilli) bardo lvl 5', imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStbWsAJpOJ-za6GReXxAYlj-WYYPKqWtIpGw&s" },
  ]

  descriptionCards = [
    { img: '../../assets/landing-page-imgs/landing-page-intro.png', title: 'Welcome to DnDHub!', content: 'With DnDHub you can immerse yourself in the wonderful world of Dungeons & Dragons. Create characters to play and connect with others thanks to the campaigns!'},
    { img: '../../assets/landing-page-imgs/landing-page-character.jpg', title: 'Create your characters!', content: 'Create a new character with the character creation system! Go to your player personal area and let the magic begin! You will also be able to manage and consult the characters you already created'},
    { img: '../../assets/landing-page-imgs/landing-page-campaign.jpg', title: 'Interact with others!', content: 'You will be able to connect with other players on DnDHub with the campaigns feature! Create or join a campaign and keep yourself updated on your table\'s recent happenings!'},
  ]

  logContext(event: Event) {
    return this.router.navigate(['landing-page']);
  }

  static toCharacterCard(character: any): Card {
    return {
      imageURL: character.imgURL === null ? defualtCharacterImgURL : character.imgURL === undefined ? defualtCharacterImgURL : character.imgURL,
      title: character.nome,
      subtitle: character.specie + ' - ' + character.classe + ' lvl ' + character.livello,
    };
  }
   
  isLogged = State.User.isLogged;

  constructor(private router: Router, private userUtilities: UserUtilitiesService, private campaignServices: CampagnaService) {
    const queryInfo = {
      limit: 5,
      offset: Math.floor(Math.random() * 4000),
      regex: '',
    };

    const success = (res: any) => {
      this.charCards.set(res.players.map(LandingPagePage.toCharacterCard));
    }
    
    this.campaignServices.loadPlayers(
      queryInfo,
      success,
      (res: any) => Alerts.error(res.error)
    );
  }

  ngOnInit() {}

}
