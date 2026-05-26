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
  {
    path: 'class-selection',
    loadComponent: () => import('./pages/Character creation pipeline/class-selection/class-selection.page').then( m => m.ClassSelectionPage)
  },
  {
    path: 'species-selection',
    loadComponent: () => import('./pages/Character creation pipeline/species-selection/species-selection.page').then( m => m.SpeciesSelectionPage)
  },
  {
    path: 'background-selection',
    loadComponent: () => import('./pages/Character creation pipeline/background-selection/background-selection.page').then( m => m.BackgroundSelectionPage)
  },
  {
    path: 'campaigns',
    loadComponent: () => import('./pages/campaigns/campaigns.page').then( m => m.CampaignsPage)
  },
  {
    path: 'campaign-creation',
    loadComponent: () => import('./pages/campaign-creation/campaign-creation.page').then( m => m.CampaignCreationPage)
  },
  {
    path: 'character-sheet',
    loadComponent: () => import('./pages/character-sheet/character-sheet.page').then( m => m.CharacterSheetPage)
  },
  {
    path: 'character-spells',
    loadComponent: () => import('./pages/character-spells/character-spells.page').then( m => m.CharacterSpellsPage)
  },
  {
    path: 'equipment-selection',
    loadComponent: () => import('./pages/Character creation pipeline/equipment-selection/equipment-selection.page').then( m => m.EquipmentSelectionPage)
  },
  {
    path: 'stats-selection',
    loadComponent: () => import('./pages/Character creation pipeline/stats-selection/stats-selection.page').then( m => m.StatsSelectionPage)
  },


];
