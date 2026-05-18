import { Routes } from '@angular/router';
import { AccordionComponent } from './components/accordion/accordion.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  { path: 'radio-button', component: RadioButtonComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
