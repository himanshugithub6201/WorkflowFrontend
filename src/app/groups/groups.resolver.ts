import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from './../reducers/index'
import { tap, first, finalize, filter } from 'rxjs/operators';
import { loadAllGroup } from './groups.actions';
import { areGroupsLoaded } from './groups.selectors';
@Injectable()
export class GroupsResolver implements Resolve<any>{
  loading = false;
  constructor(private store: Store<AppState>) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areGroupsLoaded),
        tap((groupsLoaded) => {
          if (!this.loading && !groupsLoaded) {
            this.loading = true;
            this.store.dispatch(loadAllGroup());
          }

        }), filter(groupsLoaded => groupsLoaded), first(), finalize(() => this.loading = false)
      );
  }

}