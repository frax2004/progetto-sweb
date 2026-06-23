import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  
  constructor(private httpClient: HttpClient) {}

  loadReports(quantity: number, offset: number, queryFilter: string, success: (x: any) => void, fail: (err: any) => void): Subscription {
    return this.httpClient.post<any>(
      `${environment.api_url}/api/reports/load_reports`,
      { quantity: quantity, offset: offset, queryFilter: queryFilter }
    ).subscribe({
      next: success,
      error: fail
    });
  }

  closeReport(account: string, when: string, success: (x: any) => void, fail: (err: any) => void): Subscription {
    return this.httpClient.post<any>(
      `${environment.api_url}/api/reports/close_report`,
      { account: account, when: when }
    ).subscribe({
      next: success,
      error: fail
    });
  }

  public createReport = (report: {tipo: string, quando: string, tipo_contenuto: string, contenuto: string}) => {
    return this.httpClient.post<any>(
      `${environment.api_url}/api/reports/create-report`,
      report
    );
  };
}
