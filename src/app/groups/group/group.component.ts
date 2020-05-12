import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectAllGroups } from '../groups.selectors';
import { Update } from '@ngrx/entity';
import { Group, GroupUpdated } from '../groups.actions';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @ViewChild("IdTpl", { static: true }) IdTpl: TemplateRef<any>;
  @ViewChild("optionTpl", { static: true }) optionTpl: TemplateRef<any>;
  groupForm: FormGroup;
  columns: any[];
  rows: any[];
  isLoading: boolean = false;
  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    var me = this;
    me.getPageData();
    this.columns = [
      { prop: "id", name: "Id", width: 65, cellTemplate: this.IdTpl },
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
      'id': new FormControl(null),
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

  updateRole(row, index) {
    var me = this;
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
    // this.store.pipe(select(selectAllGroups)).subscribe((data) => {
    //   this.rows = data;
    // })
  }



}
