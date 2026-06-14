import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private api = `${environment.api_url}/api/campagne`;

  constructor(private http: HttpClient) {}

  getPosts(idx_campagna: string): Observable<any> {
    return this.http.get(`${this.api}/${idx_campagna}/posts`);
  }

  createPost(idx_campagna: string, data: any): Observable<any> {
    return this.http.post(`${this.api}/${idx_campagna}/posts`, data);
  }

  deletePost(idx_campagna: string, time_stamp: string): Observable<any> {
    return this.http.delete(`${this.api}/${idx_campagna}/posts`, {
      body: { time_stamp }
    });
  }
}