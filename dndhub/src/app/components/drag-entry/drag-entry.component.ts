import { Component, ElementRef, Input, OnInit, ViewChild, HostListener } from '@angular/core';
import { IonItem } from '@ionic/angular/standalone';
import $ from 'jquery';

@Component({
  selector: 'app-drag-entry',
  templateUrl: './drag-entry.component.html',
  styleUrls: ['./drag-entry.component.scss'],
  imports: [IonItem],
  standalone: true
})
export class DragEntryComponent implements OnInit {

  @Input() sensitivity: number = 0.05;
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @ViewChild("entry") private entry!: ElementRef<HTMLInputElement>;

  private previousInput: string = "0";
  private isDragging: boolean = false;
  private isMouseDown: boolean = false;
  
  private startX: number = 0;
  private initialValue: number = 0;
  private dragThreshold: number = 4;

  ngOnInit() {
    // //uso jquery per sistemare css
    // $(function() {
    //   $(".entry-arrow").css("height", $(#entry).height());
    // });
  }

  private getValue(): number {
    return this.previousInput === "" ? 0 : parseFloat(this.previousInput);
  }

  private setValue(val: number) {
    const clamp = (min: number, val: number, max: number) => Math.max(min, Math.min(max, val));
    const clamped = clamp(this.min ?? -Infinity, val, this.max ?? Infinity);
    const rounded = Math.round(clamped * 1000) / 1000;
    this.entry.nativeElement.value = this.previousInput = rounded.toString();
  }

  public changeValue(amount: number) {
    this.setValue(this.getValue() + amount);
  }

  public assertNumericInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!isNaN(input.value as any)) {
      this.previousInput = input.value;
    } else {
      input.value = this.previousInput;
    }
  }

  public onMouseDown(event: MouseEvent) {
    if (event.button !== 0) return;

    this.isMouseDown = true;
    this.startX = event.clientX;
    this.initialValue = this.getValue();
    this.isDragging = false;
  }

  @HostListener('mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) return;

    if (!this.isDragging) {
      const distance = Math.abs(event.clientX - this.startX);
      if (distance > this.dragThreshold) {
        this.isDragging = true;
        this.entry.nativeElement.requestPointerLock();
        this.entry.nativeElement.blur();
      }
    } else {
      let multiplier = 1;
      if (event.shiftKey) multiplier = 0.1;

      const rawIncrement = event.movementX * this.sensitivity * multiplier;
      let targetValue = this.getValue() + rawIncrement;

      if (event.ctrlKey) {
        const snapStep = event.shiftKey ? 0.1 : 1.0;
        targetValue = Math.round(targetValue / snapStep) * snapStep;
        this.setValue(targetValue);
      } else {
        this.changeValue(rawIncrement);
      }
    }
  }

  @HostListener('mouseup')
  public onMouseUp() {
    if (!this.isMouseDown) return;
    this.isMouseDown = false;

    if (this.isDragging) {
      this.isDragging = false;
      document.exitPointerLock();
    } else {
      const input = this.entry.nativeElement;
      input.focus();
      input.select();
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    const input = this.entry.nativeElement;

    if (event.key === 'Escape') {
      if (this.isDragging) {
        this.isDragging = false;
        this.isMouseDown = false;
        document.exitPointerLock();
        this.setValue(this.initialValue);
      } else if (document.activeElement === input) {
        this.setValue(this.initialValue);
        input.blur();
      }
    } else if (event.key === 'Enter') {
      if (document.activeElement === input) {
        input.blur();
      }
    }
  }

  
}