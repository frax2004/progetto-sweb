import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampagnaService {

  constructor(private http: HttpClient) {}

  public createCampaign(data: any, success: (x: any) => void, fail: (x: any) => void) {
    return this.http.post<any>(
      `${environment.api_url}/api/campaign/create_campaign`, 
      data
    ).subscribe({next: success, error: fail});
  }

  public loadAcceptedPlayers = (campaign_idx: string) => {
    return this.http.post(
      `${environment.api_url}/api/campaign/load_accepted_players`, 
      { campaign_idx: campaign_idx }
    );
  }

  public loadCampaignPlayers = (campaign_idx: string) => {
    return this.http.post(
      `${environment.api_url}/api/campaign/load_campaign_players`, 
      { campaign_idx: campaign_idx }
    );
  }

  public loadPlayers(queryInfo: any, success: (x: any) => void, fail: (x: any) => void) {
    return this.http.post<any>(
      `${environment.api_url}/api/campaign/load_players`, 
      queryInfo
    ).subscribe({next: success, error: fail});
  }

  public loadCampaigns(success: (x: any) => void, fail: (x: any) => void) {
    return this.http.post<any>(
      `${environment.api_url}/api/campaign/load_campaigns`, 
      {}
    ).subscribe({next: success, error: fail});
  };

  public loadAcceptedCharacterCampaigns() {
    return this.http.post<any>(
      `${environment.api_url}/api/campaign/load-accepted-character-campaigns`, 
      {}
    );
  };

  //idx si riferisce al codice della campagna, scusate se crea confuzione
  public createCampaignParticipationRequest(name: string,idx: string) {
    return this.http.post<any>(
      `${environment.api_url}/api/campaign/create-campaign-participation-request`, 
      {name: name, idx: idx}
    );
  }

  public getDungeonMasterName(campaign_idx: string) {
    return this.http.post<any>(
      `${environment.api_url}/api/campaign/get-dungeon-master-name`, 
      { campaign_idx: campaign_idx }
    );
  }

  public acceptPlayer(info: {campaign_idx: string, player_idx: string}) {
    return this.http.post<any>(
      `${environment.api_url}/api/campaign/accept-request`, 
      info
    );
  };

  public removePlayer(info: {campaign_idx: string, player_idx: string}) {
    return this.http.post<any>(
      `${environment.api_url}/api/campaign/remove-player`, 
      info
    );
  };

  public deleteCampaign = (campaign_idx: string) => {
    return this.http.post<any>(
      `${environment.api_url}/api/campaign/delete-campaign`,
      { campaign_idx: campaign_idx }
    );
  };
}