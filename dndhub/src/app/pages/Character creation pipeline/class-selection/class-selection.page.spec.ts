import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassSelectionPage } from './class-selection.page';

describe('ClassSelectionPage', () => {
  let component: ClassSelectionPage;
  let fixture: ComponentFixture<ClassSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
