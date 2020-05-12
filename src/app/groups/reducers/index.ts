import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  on,
  MetaReducer,
  createReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Group } from '../groups.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { from } from 'rxjs';
import { GroupsActions } from '../action-type';

export const groupsFeatureKey = 'groups';

export interface GroupState extends EntityState<Group> {
  entities: { [key: number]: Group },
  ids: number[],
  allGroupsLoaded: boolean
}

export const adapter = createEntityAdapter<Group>();
export const initialGroupState = adapter.getInitialState({
  allGroupsLoaded: false
});
export const GroupsReducer = createReducer(
  initialGroupState,
  on(GroupsActions.allGroupLoaded, (state, action) => adapter.addAll(action.groups, { ...state, allGroupsLoaded: true })),
  on(GroupsActions.GroupUpdated, (state, action) => adapter.updateOne(action.update, state))
)


export const metaReducers: MetaReducer<GroupState>[] = !environment.production ? [] : [];


export const { selectAll } = adapter.getSelectors();