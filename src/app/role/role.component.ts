import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { RoleService } from './role.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import swal from 'sweetalert2';

export interface Role {
  name: string;
  description: string;
  isAdmin: string;
  canViewReports: string;
  deleteFlag: string;
}
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChild("IdTpl", { static: true }) IdTpl: TemplateRef<any>;
  @ViewChild("optionTpl", { static: true }) optionTpl: TemplateRef<any>;
  roleForm: FormGroup;
  columns: any[];
  rows: any[];
  isLoading: boolean = false;
  constructor(private roleService: RoleService) { }
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

    this.roleForm = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'isAdmin': new FormControl('NO'),
      'canViewReports': new FormControl('NO'),
      'deleteFlag': new FormControl('NO')
    });
  }

  onSubmit(event: any) {
    console.log(this.roleForm);
    console.log(event.target.name);
    this.roleService
      .post("http://192.168.0.3:8011/userandrole-ws/roles", this.roleForm.value)
      .subscribe(() => {
        console.log("Data saved successfully");
        this.getPageData();
        swal.fire("Role Created");
      });
  }

  getPageData() {
    var me = this;
    me.isLoading = true;
    me.roleService.get("http://192.168.0.3:8011/userandrole-ws/roles").subscribe(roleData => {
      console.log(roleData);
      roleData.forEach(element => {
        console.log(element.id);
        element.edit = 'Edit';
        console.log(element.edit);
      });
      me.rows = roleData;
      console.log(me.rows);
      me.isLoading = false;
      console.log("Got the data hip hip hurrah");
    });
  }

  deleteRole(row) {
    var me = this;
    var url1: string = "http://192.168.0.3:8011/userandrole-ws/roles/";
    var url2: string = row.id;
    console.log(row.id);
    var url: string = url1 + url2;
    console.log(url);
    me.roleService.delete(url).subscribe(deleteData => {
      console.log(deleteData);
      this.getPageData();
      swal.fire("Role Deleted");
    })
  }

  updateRole(row) {
    var me = this;
    this.roleForm.setValue({
      'id': row.id,
      'name': row.name,
      'description': row.description,
      'isAdmin': row.isAdmin,
      'canViewReports': row.canViewReports,
      'deleteFlag': row.deleteFlag
    })
  }

  deleteRoleForm(roleForm: FormGroup) {
    console.log(roleForm.value);
    var me = this;
    var url1: string = "http://192.168.0.3:8011/userandrole-ws/roles/search?name=";
    var url2: string = roleForm.value.name;
    var url: string = url1 + url2;
    var url3: string = "http://192.168.0.3:8011/userandrole-ws/roles/";
    var url4: string
    var role: any;
    me.roleService.findRoleByName(url).subscribe(toDeleteRole => {
      console.log(toDeleteRole);
      role = toDeleteRole;
      console.log(role);
      url4 = role.id;
      var url5: string = url3 + url4;
      me.roleService.delete(url5).subscribe(deleteData => {
        console.log(deleteData);
        this.getPageData();
        swal.fire("Role Deleted");
      })
    })
  }

  updateRoleForm(roleForm: FormGroup) {
    var me = this;
    console.log(roleForm.value)
    var url1: string = "http://192.168.0.3:8011/userandrole-ws/roles/";
    var url2: string = roleForm.value.id
    var url: string = url1 + url2;
    delete roleForm.value.id;
    console.log(roleForm.value)
    me.roleService.update(url, roleForm.value).subscribe((updatedRole) => {
      console.log(updatedRole);
      this.getPageData();
      roleForm.reset();
      swal.fire("Role Updated");
    })

  }


  searchedRoleList = new Array<any>();
  onSearchByName(form: NgForm) {
    console.log(form);
    var me = this;
    var url1: string = "http://192.168.0.3:8011/userandrole-ws/roles/search?name=";
    var url2: string = form.value.name;
    var url: string = url1 + url2;
    me.roleService.findRoleByName(url).subscribe(searchedRole => {
      this.searchedRoleList.push(searchedRole)
      console.log(me.searchedRoleList);
      this.rows = this.searchedRoleList;
      form.reset();
      this.searchedRoleList = [];

    })




  }


}
