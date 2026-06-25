import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { Services } from './core/state';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonContent],
})
export class AppComponent {
  constructor() {
    Services.authService = inject(AuthService);
  }

}
