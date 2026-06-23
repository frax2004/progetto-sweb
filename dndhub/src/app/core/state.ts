import { signal } from "@angular/core";
import { Campaign } from "./core";


export namespace State {

  export namespace User {
    export let isLogged = signal<boolean>(false);
    export let isAdmin = signal<boolean>(false);
  }
    
  export let currentCampaign = signal<Campaign | undefined>(undefined);    
}