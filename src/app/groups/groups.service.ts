import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient) { }
  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return headers;
  }

  get(url: string, urlParams?: HttpParams): Observable<any> {
    let me = this;
    return this.http.get(url, {
      headers: this.getHeaders(),
      params: urlParams
    });
  }

  update(url: string, body: Object): Observable<any> {
    let me = this;
    return this.http.put(url, JSON.stringify(body), {
      headers: this.getHeaders()
    });
  }

  delete(url: string): Observable<any> {
    let me = this;
    return this.http.delete(url);
  }

  create(url: string, body: Object): Observable<any> {
    let me = this;
    return this.http.post(url, JSON.stringify(body), {
      headers: this.getHeaders()
    });
  }
}