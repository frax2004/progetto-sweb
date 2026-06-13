import { signal } from "@angular/core";


export namespace State {
  export let isLogged = signal<boolean>(false);
}