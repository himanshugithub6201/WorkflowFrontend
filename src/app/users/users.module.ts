import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserComponent } from "./user/user.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import {
  EntityMetadataMap,
  EntityDefinitionService,
  EntityDataService,
} from "@ngrx/data";
import { UserEntityService } from "./services/user-entity.service";
import { RoleEntityService } from "./services/role-entity.service";
import { UserResolver } from "./services/user-resolver";
import { RoleResolver } from "./services/role-resolver";
import { UserDataService } from "./services/user-data.service";
import { RoleDataService } from "./services/role-data.service";

const entityMetadata: EntityMetadataMap = {
  User: {},
  Role: {},
};

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: UserComponent,
        resolve: { users: UserResolver, roles: RoleResolver },
      },
    ]),
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserEntityService,
    UserResolver,
    RoleResolver,
    UserDataService,
    RoleDataService,
    RoleEntityService,
  ],
})
export class UsersModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    userDataService: UserDataService,
    roleDataService: RoleDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService("User", userDataService);
    entityDataService.registerService("Role", roleDataService);
  }
}
