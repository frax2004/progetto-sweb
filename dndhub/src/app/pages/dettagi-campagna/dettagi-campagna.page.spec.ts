import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DettagiCampagnaPage } from './dettagi-campagna.page';

describe('DettagiCampagnaPage', () => {
  let component: DettagiCampagnaPage;
  let fixture: ComponentFixture<DettagiCampagnaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DettagiCampagnaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
