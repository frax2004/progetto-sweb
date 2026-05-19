import { Routes } from '@angular/router';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    children: [
      {
        path: "popup",
        component: PopUpComponent
      }
    ]
  },
  { path: 'radio-button', component: RadioButtonComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
