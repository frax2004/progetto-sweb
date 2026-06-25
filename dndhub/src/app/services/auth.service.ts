import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, Subscription, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alerts } from '../core/core';
import { State } from '../core/state';


@Injectable({
  providedIn: 'root',
})
export class AuthService {


  attemptAutoLogin = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("User_Tokens"));
      if (tokens !== null && tokens !== undefined) {
        const res = await firstValueFrom(this.autoLogin(
          tokens.generic_token,
          tokens.player_token,
          tokens.dm_token
        ));
        State.User.isLogged.set(true);
      }
    }
    catch (err) {
      Alerts.error(err);
    }
  }

  autoLogin = (generic_token: string, player_token: string, dm_token: string) => {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/auth/auto-login`,
      {generic_token: generic_token, player_token: player_token, dm_token: dm_token}
    );
  }

  constructor (private httpclient: HttpClient) {
    this.attemptAutoLogin();
  }

  register(email: string, password: string, username: string): Observable<any> {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/auth/register`,
      { email: email, password: password, username: username }
    )
    .pipe(
      tap(
        res => localStorage.setItem("User_Tokens", JSON.stringify({
          generic_token: res.generic_token,
          player_token: res.player_token,
          dm_token: res.dm_token
        }))
      )
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/auth/login`,
      { email: email, password: password }
    ).pipe(
      tap(
        res => localStorage.setItem("User_Tokens", JSON.stringify({
          generic_token: res.generic_token,
          player_token: res.player_token,
          dm_token: res.dm_token
        }))
      )
    );
  }

  logout(success: (_: any) => void, fail: (err: any) => void): Subscription {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/auth/logout`,
      {}
    ).pipe(
      tap(res => localStorage.removeItem("User_Tokens"))
    )
    .subscribe({
      next: success,
      error: fail
    });
  }

  deleteAccount(success: (_: any) => void, fail: (err: any) => void): Subscription {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/auth/delete_account`,
      {}
    ).pipe(
      tap(res => localStorage.removeItem("User_Tokens"))
    )
    .subscribe({
      next: success,
      error: fail
    });
  }
}
