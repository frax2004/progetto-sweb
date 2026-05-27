import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentSelectionPage } from './equipment-selection.page';

describe('EquipmentSelectionPage', () => {
  let component: EquipmentSelectionPage;
  let fixture: ComponentFixture<EquipmentSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
