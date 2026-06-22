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

  public createCampaignRequest(idx: string) {
    
  }
}