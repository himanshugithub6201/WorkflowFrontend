import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GroupsActions } from './action-type';
import { GroupService } from './groups.service';
import { allGroupLoaded } from './groups.actions';
import { concatMap, map } from 'rxjs/operators';

@Injectable()
export class GroupsEffects {

  loadGroups$ = createEffect(
    () => this.action$.pipe(
      ofType(GroupsActions.loadAllGroup),
      concatMap(action => this.groupService.get("http://192.168.0.3:8011/userandrole-ws/groups")),
      map(groups => allGroupLoaded({ groups }))
    )
  );

  saveGroups$ = createEffect(
    () => this.action$.pipe(
      ofType(GroupsActions.GroupUpdated),
      concatMap(action => this.groupService.update("http://192.168.0.3:8011/userandrole-ws/groups/" + action.update.id, action.update.changes))
    ), { dispatch: false }
  )



  constructor(private action$: Actions, private groupService: GroupService) {

  }
}