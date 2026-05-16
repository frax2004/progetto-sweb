import { Routes } from '@angular/router';
import { App } from './app';
import { LandingPage } from './landing-page/landing-page';
import { LoginPage } from './login-page/login-page';
import { Checkbox } from './components/checkbox/checkbox';

export const routes: Routes = [
    { path: "", component: LandingPage },
    { path: "login-page", component: LoginPage },
    { path: "checkbox", component: Checkbox }
];
