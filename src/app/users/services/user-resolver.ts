import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserEntityService } from './user-entity.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<boolean>{
  constructor(private userService: UserEntityService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.userService.getAll().pipe(
      map(users => !!users)
    )
  }
} 