import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeciesSelectionPage } from './species-selection.page';

describe('SpeciesSelectionPage', () => {
  let component: SpeciesSelectionPage;
  let fixture: ComponentFixture<SpeciesSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
