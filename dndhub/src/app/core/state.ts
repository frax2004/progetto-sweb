import { inject, signal } from "@angular/core";
import { Campaign } from "./core";
import { AuthService } from "../services/auth.service";

export namespace State {

  export namespace User {
    export let isLogged = signal<boolean>(false);
    export let isAdmin = signal<boolean>(false);
  }

  
    
  export let currentCampaign = signal<Campaign | undefined>(undefined);    
}

export namespace Services {
  export let authService: AuthService = null;
}