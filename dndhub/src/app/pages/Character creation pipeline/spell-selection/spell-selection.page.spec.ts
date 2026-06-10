import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpellSelectionPage } from './spell-selection.page';

describe('SpellSelectionPage', () => {
  let component: SpellSelectionPage;
  let fixture: ComponentFixture<SpellSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
