import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampagnaService {

  private api = 'http://localhost:10000/api/campagna';

  constructor(private http: HttpClient) {}

  createCampaign(data: any) {
    return this.http.post(this.api, data);
  }
}