import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionSelectionPage } from './option-selection.page';

describe('OptionSelectionPage', () => {
  let component: OptionSelectionPage;
  let fixture: ComponentFixture<OptionSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
