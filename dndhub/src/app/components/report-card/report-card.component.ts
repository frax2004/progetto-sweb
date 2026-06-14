import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
  imports: [
    ButtonComponent
  ]
})
export class ReportCardComponent  implements OnInit {
  @Input() sender: string = "Unknown";
  @Input() when: string = "0000-00-00 00:00:00";
  @Input() reason: string = "Unknown";
  @Input() description: string = "Unknown";
  @Input() onClose: (e: Event) => void;

  constructor() { }

  ngOnInit() {}

}
