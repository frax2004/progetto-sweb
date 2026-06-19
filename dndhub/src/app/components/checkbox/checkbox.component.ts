import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonCheckbox, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  imports: [IonCheckbox, IonItem, IonLabel]
})
export class CheckboxComponent {

  @Input() checked: boolean = false;

  @Input() disabled: boolean = false;

  @Input() testo: string = '';

  @Output() checkedChange = new EventEmitter<boolean>();

onChange(event: any) {
  this.checkedChange.emit(event.detail.checked);
}
  }
