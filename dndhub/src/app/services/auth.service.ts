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
      const credentials = JSON.parse(localStorage.getItem("Credenziali"));
      const res = await firstValueFrom(this.login(credentials.email, credentials.password));
      State.User.isLogged.set(true);
      
    }
    catch (err) {
      Alerts.error(err.error);
    }
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
        res => localStorage.setItem("Credenziali", JSON.stringify({
          email: email,
          password: password
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
        res => localStorage.setItem("Credenziali", JSON.stringify({
          email: email,
          password: password
        }))
      )
    );
  }

  logout(success: (_: any) => void, fail: (err: any) => void): Subscription {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/auth/logout`,
      {}
    ).subscribe({
      next: success,
      error: fail
    });
  }

  deleteAccount(success: (_: any) => void, fail: (err: any) => void): Subscription {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/auth/delete_account`,
      {}
    ).subscribe({
      next: success,
      error: fail
    });
  }
}
