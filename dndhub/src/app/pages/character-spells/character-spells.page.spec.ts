import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterSpellsPage } from './character-spells.page';

describe('CharacterSpellsPage', () => {
  let component: CharacterSpellsPage;
  let fixture: ComponentFixture<CharacterSpellsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSpellsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
