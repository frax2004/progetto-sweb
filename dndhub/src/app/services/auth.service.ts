import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor (private httpclient: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.httpclient.post<any>(
      "http://192.168.1.7:10000/api/auth/login",
      {email: email, password: password}
    )
    .pipe(
      tap(
        res => sessionStorage.setItem("jwtToken", res.token)
      )
    );
  }
}
