import { Role } from 'src/app/role/role.component';
import { Group } from 'src/app/groups/groups.actions';

export interface User {
  id: Number
  name: string;
  userId: string;
  email: string;
  roles: Role[];
  groups: Group[];
}