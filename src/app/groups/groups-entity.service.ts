import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Group } from './groups.actions';
import { Injectable } from '@angular/core';


@Injectable()
export class GroupEntityService extends EntityCollectionServiceBase<Group>{
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('groups', serviceElementsFactory);
  }
}