import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
        res => sessionStorage.setItem('isLogged ', res.isLogged)
      )
    );
  }
}
