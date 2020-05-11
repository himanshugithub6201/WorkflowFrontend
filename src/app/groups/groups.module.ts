import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [GroupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: GroupComponent }])
  ]
})
export class GroupsModule { }
