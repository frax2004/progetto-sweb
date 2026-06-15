import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCreationInfoPage } from './character-creation-info.page';

describe('CharacterCreationInfoPage', () => {
  let component: CharacterCreationInfoPage;
  let fixture: ComponentFixture<CharacterCreationInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCreationInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
