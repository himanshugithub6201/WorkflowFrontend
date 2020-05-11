import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpRequest,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import swal from 'sweetalert2';
@Injectable()
export class RoleService {
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

  post(url: string, body: Object): Observable<any> {
    let me = this;
    return this.http.post(url, JSON.stringify(body), {
      headers: this.getHeaders()
    });
  }

  delete(url: string): Observable<any> {
    let me = this;
    return this.http.delete(url);
  }

  update(url: string, body: Object): Observable<any> {
    let me = this;
    return this.http.put(url, JSON.stringify(body), {
      headers: this.getHeaders()
    });
  }

  findRoleByName(url: string): Observable<any> {
    let me = this;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      swal.fire("Network Error")
      console.error('An error occurred:', error.error.message);
    } else {
      swal.fire('Not Found');
    }
    return throwError(error);
  };
}
