import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundSelectionPage } from './background-selection.page';

describe('BackgroundSelectionPage', () => {
  let component: BackgroundSelectionPage;
  let fixture: ComponentFixture<BackgroundSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
