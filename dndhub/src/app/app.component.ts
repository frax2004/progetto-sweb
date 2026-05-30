import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { DatabaseService } from 'src/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonContent],
})
export class AppComponent {
  constructor(private database: DatabaseService) {
    this.initDatabase();
  }

  async initDatabase() {
    await this.database.initializePlugin();
  }
}
