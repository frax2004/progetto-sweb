import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

// TODO QUANDO SI DEVE TESTARE QUALCOSA, SETTARE IL PROPRIO IPv4 (da cmd => ipconfig => guarda verso la fine)
const POLLARA_IP_ADDRESS = "192.168.1.131";
const GIOVANNI_IP_ADDRESS = "192.168.1.9";
const PORT = 10000;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor (private httpclient: HttpClient) {}

  register(email: string, password: string, username: string): Observable<any> {
    return this.httpclient.post<any>(
      `http://${GIOVANNI_IP_ADDRESS}:${PORT}/api/auth/register`,
      { email: email, password: password, username: username }
    )
    .pipe(
      tap(
        res => sessionStorage.setItem("Risposta:  ", res.message)
      )
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.httpclient.post<any>(
      `http://${GIOVANNI_IP_ADDRESS}:${PORT}/api/auth/login`,
      { email: email, password: password }
    );
    // .pipe(
    //   tap(
    //     res => sessionStorage.setItem("jwtToken", res.token)
    //   )
    // );
  }
}
