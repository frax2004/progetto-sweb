import { PopoverController } from "@ionic/angular/standalone";
import { PopUpComponent } from "../components/pop-up/pop-up.component";


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