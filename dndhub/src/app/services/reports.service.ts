import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  
  constructor(private httpClient: HttpClient) {}

  loadReports(quantity: number, offset: number, success: (x: any) => void, fail: (err: any) => void): Subscription {
    return this.httpClient.post<any>(
      `${environment.api_url}/api/reports/load_reports`,
      { quantity: quantity, offset: offset }
    ).subscribe({
      next: success,
      error: fail
    });
  }
}
