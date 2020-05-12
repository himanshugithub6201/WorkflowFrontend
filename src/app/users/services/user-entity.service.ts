import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { User } from '../model/User';

@Injectable()
export class UserEntityService extends EntityCollectionServiceBase<User>{
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementFactory);
  }
}