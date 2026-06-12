import { signal } from "@angular/core";


export namespace State {

  export namespace User {
    export let isLogged = signal<boolean>(false);
    export let isAdmin = signal<boolean>(false);
  }

}