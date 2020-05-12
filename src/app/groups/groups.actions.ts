import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';


export interface Group {
  id: Number
  name: string;
  description: string;
  isAdmin: string;
  canViewReports: string;
  deleteFlag: string;
}

export const loadAllGroup = createAction(
  "[Group Resolver] Load All Groups"
)

export const allGroupLoaded = createAction(
  "[Load Group Effect] All Group Loaded",
  props<{ groups: Group[] }>()
);

export const GroupUpdated = createAction(
  "[Edit Group] Group Updated",
  props<{ update: Update<Group> }>()
)