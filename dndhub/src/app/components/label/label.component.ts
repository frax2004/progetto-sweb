import { Component, Input, OnInit } from '@angular/core';
import { LabelStyle } from './LabelStyle';

@Component({
  selector: 'app-label',
  template: `
    <div 
      class="label" 
      style="
        background-color: {{style.background}};
        text-color: {{style.text_color}};
        border: {{style.border}};
        border_radius: {{style.border_radius}};
      "
    >
      <div id="text" style="font-size: {{fontSize}};"><ng-content/></div>
    </div>
  `,
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent  implements OnInit {
  @Input() style: LabelStyle = new LabelStyle();
  @Input() fontSize?: string = '2.5cqmin';

  constructor() { }

  ngOnInit() {}

}
