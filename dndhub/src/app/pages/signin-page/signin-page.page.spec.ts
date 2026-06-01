import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninPagePage } from './signin-page.page';

describe('SigninPagePage', () => {
  let component: SigninPagePage;
  let fixture: ComponentFixture<SigninPagePage>;    

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninPagePage]
    })
    .compileComponents(); 
    fixture = TestBed.createComponent(SigninPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
