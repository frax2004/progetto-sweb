import { PopoverController } from "@ionic/angular/standalone";
import { PopUpComponent } from "../components/pop-up/pop-up.component";
import { Router } from "@angular/router";


export namespace Popups {
  export function ofSimpleText(controller: PopoverController, text: String) {
    async function f(e: Event) {
      const pop = await controller.create({
        component: PopUpComponent,
        componentProps: { popText: text },
        event: e
      });

      await pop.present();
    }

    return f;
  }
}

export namespace Navigate {
  // il path deve essere quello specificato su app.routes.ts, non il path delle cartelle
  export function toPath(router: Router, path: String) {
    return () => router.navigate([path]);
  }
}