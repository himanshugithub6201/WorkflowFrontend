import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromGroups from './reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GroupsResolver } from './groups.resolver';
import { EffectsModule } from '@ngrx/effects';
import { GroupsEffects } from './groups.effects';
import { GroupService } from './groups.service';
import { EntityMetadataMap, EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { GroupEntityService } from './groups-entity.service';
import { GroupDataService } from './groups-data.service';


const entityData: EntityMetadataMap = {
  groups: {

  }
};


@NgModule({
  declarations: [GroupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: GroupComponent, resolve: { groups: GroupsResolver } }]),
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromGroups.groupsFeatureKey, fromGroups.GroupsReducer),
    EffectsModule.forFeature([GroupsEffects])

  ],
  providers: [
    GroupsResolver,
    GroupsEffects,
    GroupService,
    GroupEntityService,
    GroupDataService

  ]
})
export class GroupsModule {

  constructor(private eds: EntityDefinitionService, private entityDataService: EntityDataService, private groupsDataService: GroupDataService) {
    eds.registerMetadataMap(entityData);
    entityDataService.registerService('groups', groupsDataService);
  }
}
