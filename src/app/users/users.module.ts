import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EntityMetadataMap, EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { UserEntityService } from './services/user-entity.service';
import { UserResolver } from './services/user-resolver';
import { UserDataService } from './services/user-data.service';


const entityMetadata: EntityMetadataMap = {
  User: {

  }
}


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: UserComponent, resolve: { users: UserResolver } }]),
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserEntityService,
    UserResolver,
    UserDataService
  ]
})
export class UsersModule {

  constructor(private eds: EntityDefinitionService, private entityDataService: EntityDataService, userDataService: UserDataService) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('User', userDataService);
  }

}
