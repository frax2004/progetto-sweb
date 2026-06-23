import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCampaignDetailsPage } from './character-campaign-details.page';

describe('CharacterCampaignDetailsPage', () => {
  let component: CharacterCampaignDetailsPage;
  let fixture: ComponentFixture<CharacterCampaignDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCampaignDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
