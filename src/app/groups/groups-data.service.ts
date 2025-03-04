import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Group } from './groups.actions';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GroupDataService extends DefaultDataService<Group> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('groups', http, httpUrlGenerator);
  }

  add(data): Observable<any> {
    return this.http.post("http://192.168.0.3:8011/userandrole-ws/groups", data);
  }
}