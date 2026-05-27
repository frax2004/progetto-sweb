import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsSelectionPage } from './stats-selection.page';

describe('StatsSelectionPage', () => {
  let component: StatsSelectionPage;
  let fixture: ComponentFixture<StatsSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
