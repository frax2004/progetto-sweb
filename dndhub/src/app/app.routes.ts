import { Routes } from '@angular/router';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  { path: 'radio-button', component: RadioButtonComponent },
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full',
  },
  {
    path: 'landing-page',
    loadComponent: () => import('./pages/landing-page/landing-page.page').then( m => m.LandingPagePage)
  },  {
    path: 'characters',
    loadComponent: () => import('./pages/characters/characters.page').then( m => m.CharactersPage)
  },


];
