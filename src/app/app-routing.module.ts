import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "role", component: RoleComponent },
  { path: 'group', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule) },
  { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
