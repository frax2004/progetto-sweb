import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignCreationInfoPage } from './campaign-creation-info.page';

describe('CampaignCreationInfoPage', () => {
  let component: CampaignCreationInfoPage;
  let fixture: ComponentFixture<CampaignCreationInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignCreationInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
