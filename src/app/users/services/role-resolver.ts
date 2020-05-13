import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { map, tap, filter, first } from "rxjs/operators";
import { RoleEntityService } from "./role-entity.service";

@Injectable()
export class RoleResolver implements Resolve<boolean> {
  constructor(private roleService: RoleEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.roleService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.roleService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
