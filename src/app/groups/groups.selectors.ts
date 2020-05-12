import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { GroupState } from './reducers/index'
import * as fromGroups from './reducers/index';
export const selectGroupsState = createFeatureSelector<GroupState>("groups");

export const selectAllGroups = createSelector(
  selectGroupsState,
  fromGroups.selectAll
);

export const areGroupsLoaded = createSelector(
  selectGroupsState,
  state => state.allGroupsLoaded
)