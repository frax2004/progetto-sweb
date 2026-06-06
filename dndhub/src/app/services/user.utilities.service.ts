import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const POLLARA_IP_ADDRESS = "192.168.1.36";
const GIOVANNI_IP_ADDRESS = "192.168.1.9";
const CURRENT_IP_ADDRESS = GIOVANNI_IP_ADDRESS;
const FRONTEND_PORT = 10000;

@Injectable({
  providedIn: 'root',
})
export class UserUtilitiesService {
  constructor (private httpclient: HttpClient) {}

  isLogged(): Observable<any> {
    return this.httpclient.post<any>(
      `http://${CURRENT_IP_ADDRESS}:${FRONTEND_PORT}/api/user-utilities/isLogged`,
      {}
    ).pipe(
      tap(
        res => sessionStorage.setItem('isLogged ', res.isLogged)
      )
    );
  }
}
