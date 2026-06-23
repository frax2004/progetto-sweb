import { Routes } from '@angular/router';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { environment } from 'src/environments/environment';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  { path: 'radio-button', component: RadioButtonComponent },
  {
    path: '',
    redirectTo: environment.defaultRoute,
    pathMatch: 'full',
  },
  {
    path: 'landing-page',
    loadComponent: () => import('./pages/landing-page/landing-page.page').then( m => m.LandingPagePage)
  },
  {
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
  {
    path: 'dettagli-campagna',
    loadComponent: () => import('./pages/dettagi-campagna/dettagi-campagna.page').then( m => m.DettagiCampagnaPage)
  },
  {
    path: 'login-page',
    loadComponent: () => import('./pages/login-page/login-page.page').then( m => m.LoginPagePage)
  },
  { 
    path: 'signin-page',
    loadComponent: () => import('./pages/signin-page/signin-page.page').then( m => m.SigninPagePage)
  },
  {
   path: 'overview',
    loadComponent: () => import('./pages/Character creation pipeline/overview/overview.page').then( m => m.OverviewPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'campaign-chat',
    loadComponent: () => import('./pages/campaign-chat/campaign-chat.page').then( m => m.CampaignChatPage)
  },
  {
    path: 'type-player-login',
    loadComponent: () => import('./pages/type-player-login/type-player-login.page').then( m => m.TypePlayerLoginPage)
  },  {
    path: 'spell-selection',
    loadComponent: () => import('./pages/Character creation pipeline/spell-selection/spell-selection.page').then( m => m.SpellSelectionPage)
  },
  {
    path: 'option-selection',
    loadComponent: () => import('./pages/Character creation pipeline/option-selection/option-selection.page').then( m => m.OptionSelectionPage)
  },
  {
    path: 'character-creation-info',
    loadComponent: () => import('./pages/character-creation-info/character-creation-info.page').then( m => m.CharacterCreationInfoPage)
  },
  {
    path: 'campaign-creation-info',
    loadComponent: () => import('./pages/campaign-creation-info/campaign-creation-info.page').then( m => m.CampaignCreationInfoPage)
  },
  {
    path: 'character-campaign-chat',
    loadComponent: () => import('./pages/character-campaign-chat/character-campaign-chat.page').then( m => m.CharacterCampaignChatPage)
  },
  {
    path: 'character-campaign-details',
    loadComponent: () => import('./pages/character-campaign-details/character-campaign-details.page').then( m => m.CharacterCampaignDetailsPage)
  },




];
   

