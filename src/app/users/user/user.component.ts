import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { UserEntityService } from "../services/user-entity.service";
import { RoleEntityService } from "../services/role-entity.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  constructor(
    private usersService: UserEntityService,
    private rolesService: RoleEntityService
  ) {}

  data1 = [];
  note1 = [];
  note2 = [];
  selectedRole = [];
  selectedRoleIds = [];
  data2 = [];
  @ViewChild("table") table: DatatableComponent;
  rows = [];
  isEditable = {};
  rowIndex;

  ngOnInit() {
    this.usersService.entities$.subscribe((data) => {
      this.data1 = data;
    });
    this.rolesService.entities$.subscribe((data) => {
      this.note1 = data;
    });
    this.rows = this.data1;

    console.log(this.rows);
    var i = 0;
    this.rows.forEach((row) => {
      let testArr1 = [];
      let testArr2 = [];
      row.roles.forEach((role) => {
        testArr1.push(role.name);
        testArr2.push(role.id);
        console.log(testArr1);
      });

      this.selectedRole.push(testArr1);
      this.selectedRoleIds.push(testArr2);
    });
    console.log("hi");
    console.log(this.selectedRole);
  }

  // Save row
  save(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    console.log("Row saved: " + rowIndex);
  }

  // Delete row
  delete(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    console.log("Row deleted: " + rowIndex);
  }
}
