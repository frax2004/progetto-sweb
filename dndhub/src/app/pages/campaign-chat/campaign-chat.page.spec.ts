import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignChatPage } from './campaign-chat.page';

describe('CampaignChatPage', () => {
  let component: CampaignChatPage;
  let fixture: ComponentFixture<CampaignChatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
