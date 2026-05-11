import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { LoginPage } from "../login-page/login-page";


@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, RouterLinkActive, LoginPage],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {

}
