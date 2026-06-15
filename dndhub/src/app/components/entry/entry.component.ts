import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput } from "@ionic/angular/standalone";



@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  imports: [IonInput],
})
export class EntryComponent  implements OnInit, AfterViewInit {
  @Input() label?: string = "";
  @Input() labelPlacement?: string = "";
  @Input() fill?: string = "";
  @Input() type?: string;
  @Input() placeholder: string = "Scrivi qui";
  @Input() disabled: boolean = false;
  @Input() value?: string;
  @Input() onValueChanged: (value: any) => void = _ => {};
  @ViewChild("input") entry!: IonInput;
  public ngAfterViewInit(): void {
    this.entry.registerOnChange(this.onValueChanged);
  }

  ngOnInit() {}

}
