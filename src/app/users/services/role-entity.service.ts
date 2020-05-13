import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { Role } from "src/app/role/role.component";

@Injectable()
export class RoleEntityService extends EntityCollectionServiceBase<Role> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super("Role", serviceElementFactory);
  }
}
