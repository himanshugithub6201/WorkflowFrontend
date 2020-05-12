import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectAllGroups } from '../groups.selectors';
import { Update } from '@ngrx/entity';
import { Group, GroupUpdated, GroupDeleted, GroupCreated } from '../groups.actions';
import swal from 'sweetalert2';
import { GroupEntityService } from '../groups-entity.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @ViewChild("IdTpl", { static: true }) IdTpl: TemplateRef<any>;
  @ViewChild("optionTpl", { static: true }) optionTpl: TemplateRef<any>;
  delAndUpdateButtonStatus: boolean = true;

  groupForm: FormGroup;
  columns: any[];
  rows: any[];
  isLoading: boolean = false;
  constructor(private store: Store<AppState>, private groupsEntityService: GroupEntityService) { }
  ngOnInit() {

    var me = this;
    var sno: number = 1;
    me.getPageData();
    this.columns = [
      { prop: "id", name: "Sno.", width: 65, cellTemplate: this.IdTpl },
      { prop: "name", name: "Name", width: 105 },
      {
        prop: "description",
        name: "Description",
        width: 150
      },
      { prop: "isAdmin", name: "Is Admin", width: 120 },
      { prop: "deleteFlag", name: "Delete Flag", width: 120 },
      { prop: "canViewReports", name: "View Reports", width: 120 },
      { prop: "edit", name: "Edit", width: 200, cellTemplate: this.optionTpl }
    ];

    this.groupForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'isAdmin': new FormControl('NO'),
      'canViewReports': new FormControl('NO'),
      'deleteFlag': new FormControl('NO')
    });
  }

  getPageData() {
    this.isLoading = true;
    this.store.pipe(select(selectAllGroups)).subscribe((data) => {
      this.rows = data;
      this.isLoading = false;
    })
  }

  updateGroup(row, index) {
    var me = this;
    this.delAndUpdateButtonStatus = false;
    this.groupForm.setValue({
      'id': row.id,
      'name': row.name,
      'description': row.description,
      'isAdmin': row.isAdmin,
      'canViewReports': row.canViewReports,
      'deleteFlag': row.deleteFlag
    })
  }

  updategroupForm(groupForm) {
    const update: Update<Group> = {
      id: groupForm.value.id,
      changes: groupForm.value
    };
    this.store.dispatch(GroupUpdated({ update }));
    swal.fire("Group Updated");
    this.groupForm.reset();
    this.delAndUpdateButtonStatus = true;
  }
  deletegroupForm(groupForm) {
    var id: string = groupForm.value.id;
    this.store.dispatch(GroupDeleted({ id }));
    swal.fire("Group Deleted");
    this.groupForm.reset();
    this.delAndUpdateButtonStatus = true;
  }


  deleteGroup(row, index) {
    var id: string = row.id;
    this.store.dispatch(GroupDeleted({ id }));
    swal.fire("Group Deleted");
    this.groupForm.reset();
  }

  onSubmit(event: any) {
    console.log(this.groupForm.value);
    // this.store.dispatch(GroupCreated({ create: this.groupForm.value }));
    this.groupsEntityService.add(this.groupForm.value).subscribe((newGroup) => {
      this.store.dispatch(GroupCreated({ create: newGroup }));
      console.log(newGroup);
      // location.reload();

    })
    // swal.fire("Group Created");
    this.groupForm.reset();
    this.delAndUpdateButtonStatus = true;
  }

  onclear() {
    this.delAndUpdateButtonStatus = true;
  }
  // onSearchByName(form: NgForm) {
  //   this.store.subscribe((groups) => {
  //     console.log(groups["groups"]["entities"]);
  //     this.rows = groups["groups"]["entities"].id
  //   })
  // }

}
