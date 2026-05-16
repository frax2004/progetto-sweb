import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox {

  constructor(private renderer: Renderer2) {}

  public textSize() {
    let elem = document.getElementsByClassName('checkbox')[0];
    elem.innerHTML = "X";
    let w = elem?.clientWidth, h = elem?.clientHeight;
    this.renderer.setAttribute(elem, "fontSize", (.75*Math.min(w, h)) + "px");
  }
}
