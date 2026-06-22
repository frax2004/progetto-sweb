import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseUrl = `${environment.api_url}/api/Posts`;

  constructor(private http: HttpClient) {}

  getPosts(idx_campagna: string) {
    return this.http.get(`${this.baseUrl}/campagne/${idx_campagna}/posts`);
  }

  createPost(idx_campagna: string, body: any) {
    return this.http.post(`${this.baseUrl}/campagne/${idx_campagna}/posts`, body);
  }

  deletePost(idx_campagna: string, time_stamp: string) {
    return this.http.delete(`${this.baseUrl}/campagne/${idx_campagna}/posts`, {
      body: { time_stamp }
    });
  }
}