import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable()
export class UserDataService extends DefaultDataService<User>{
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('User', http, httpUrlGenerator);
  }

  getAll(): Observable<any> {
    return this.http.get('http://192.168.0.3:8011/userandrole-ws/users');
  }
}