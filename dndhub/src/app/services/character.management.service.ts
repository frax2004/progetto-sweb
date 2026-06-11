import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharacterManagementService {
  constructor (private httpclient: HttpClient) {}
  
  displayClasses() {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/class-display`,
      {}
    )
    .pipe(
      tap(
        res => sessionStorage.setItem("Risposta:  ", res.message)
      )
    );
  }

  displaySpecificLevel(className: string) {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/level-display-specific`,
      {className: className}
    );
  }

  displaySpecies() {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/species-display`,
      {}
    );
  }

  displayBackgrounds() {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/background-display`,
      {}
    );
  }
  
  displayLevelRowByClassAndLevel(level: number, className: string) {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/level-display-by-class-and-level`,
      {level: level, className: className}
    );
  }
}
