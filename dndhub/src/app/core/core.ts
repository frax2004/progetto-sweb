import { PopoverController } from "@ionic/angular/standalone";
import { PopUpComponent } from "../components/pop-up/pop-up.component";
import { Router } from "@angular/router";
import { alertController, AlertOptions } from '@ionic/core';
import { bytes } from "stream/consumers";
import { Readable } from "stream";


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
    return function() {router.navigate([path]);};
  }
}

export namespace Alerts {
  export async function show(options: AlertOptions) {
    return (await alertController.create(options)).present();
  }

  export function personalizedMessage(message: string, header: string) {
    return Alerts.show({
      header: header,
      message: message,
      buttons: ['OK'],
    });
  }

  export function notImplemetedError(func?: Function | undefined) {
    return Alerts.show({
      header: 'Error',
      message: `Function ${func !== undefined ? `'${func.name}()' ` : ""}is not yet implemented`,
      buttons: ['Got it!']
    });
  }

  export function error(err: any) {
    return Alerts.show({
      header: `Error : ${err.status_code}`,
      message: err.message,
      buttons: ['Got it!'],
      cssClass: 'default-alert'
    });
  }

  export function message(msg: string) {
    return Alerts.show({
      header: 'Error',
      message: msg,
      buttons: ['Got it!'],
      cssClass: 'default-alert'
    });
  }

  export function good(msg: string) {
    const possible_responses = [
      'Eccellente',
      'Ok',
      'Eccezionale',
      'Magnifico',
      'Perfetto',
      'Grandioso',
      'Aura jacket',
      'Stai gasando',
      'Aura.',
      'Stai spiegando',
      'Si si si si si',
    ];

    return Alerts.show({
      header: 'Ottimo!',
      message: msg,
      buttons: [possible_responses[Math.round(Math.random()*(possible_responses.length-1))]],
      cssClass: 'default-alert'
    });
  }

}

export function decodeCampaign(hashcode: string) {
  const decoder = ch => ch - 8;
  return Buffer.from(hashcode).map(decoder).toString();
}

export function encodeCampaign(campaign_idx: string) {
  const encoder = ch => ch + 8;
  return Buffer.from(campaign_idx).map(encoder).toString();
}