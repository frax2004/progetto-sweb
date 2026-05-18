import { Routes } from '@angular/router';
import { AccordionComponent } from './components/accordion/accordion.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  { path: 'accordion', component: AccordionComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
