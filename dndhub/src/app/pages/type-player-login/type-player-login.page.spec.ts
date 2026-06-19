import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypePlayerLoginPage } from './type-player-login.page';

describe('TypePlayerLoginPage', () => {
  let component: TypePlayerLoginPage;
  let fixture: ComponentFixture<TypePlayerLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePlayerLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
