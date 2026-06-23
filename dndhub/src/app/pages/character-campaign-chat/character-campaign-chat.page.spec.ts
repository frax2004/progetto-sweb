import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCampaignChatPage } from './character-campaign-chat.page';

describe('CharacterCampaignChatPage', () => {
  let component: CharacterCampaignChatPage;
  let fixture: ComponentFixture<CharacterCampaignChatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCampaignChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
