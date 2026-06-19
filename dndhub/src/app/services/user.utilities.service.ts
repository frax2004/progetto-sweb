import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserUtilitiesService {
  constructor (private httpclient: HttpClient) {}

  isLogged(): Observable<any> {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/user-utilities/isLogged`,
      {}
    ).pipe(
      tap(
        res => sessionStorage.setItem('isLogged', res.isLogged)
      )
    );
  }

  setUserInfo(email: string, password: string, username: string, success: (x: any) => void, fail: (err: any) => void): Subscription {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/user-utilities/setUserInfo`,
      { email: email, password: password, username: username }
    ).subscribe({next: success, error: fail});
  }

  getUserInfo(success: (x: any) => void, fail: (err: any) => void): Subscription {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/user-utilities/getUserInfo`,
      {}
    ).subscribe({next: success, error: fail});
  }

  setCurrentPersonalArea(area: 'player' | 'dm' | 'generic'): Observable<any>  {
    throw Error("funzione UserUtilitiesService.setCurrentPersonalArea() non ancora implementata (fallo)");
  }

  getPlayerID() {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/user-utilities/get-player-ID`,
      {}
    );
  }
}
