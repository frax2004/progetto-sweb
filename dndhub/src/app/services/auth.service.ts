import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

// TODO QUANDO SI DEVE TESTARE QUALCOSA, SETTARE IL PROPRIO IPv4 (da cmd => ipconfig => guarda verso la fine)
const MY_IP_ADDRESS = "192.168.1.131";
const PORT = 10000;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor (private httpclient: HttpClient) {}

  register(email: string, password: string, username: string): Observable<any> {
    return this.httpclient.post<any>(
      `http://${MY_IP_ADDRESS}:${PORT}/api/auth/register`,
      { email: email, password: password, username: username }
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.httpclient.post<any>(
      `http://${MY_IP_ADDRESS}:${PORT}/api/auth/login`,
      { email: email, password: password }
    );
    // .pipe(
    //   tap(
    //     res => sessionStorage.setItem("jwtToken", res.token)
    //   )
    // );
  }
}
