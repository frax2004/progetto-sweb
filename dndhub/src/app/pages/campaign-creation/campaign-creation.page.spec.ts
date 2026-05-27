import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignCreationPage } from './campaign-creation.page';

describe('CampaignCreationPage', () => {
  let component: CampaignCreationPage;
  let fixture: ComponentFixture<CampaignCreationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
