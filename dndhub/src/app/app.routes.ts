import { Routes } from '@angular/router';
import { App } from './app';
import { LandingPage } from './landing-page/landing-page';
import { LoginPage } from './login-page/login-page';

export const routes: Routes = [
    { path: "", component: LandingPage },
    { path: "login-page", component: LoginPage }
];
