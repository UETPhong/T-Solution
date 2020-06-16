import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentsService } from '../../../services';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css']
})
export class DepartmentDialogComponent implements OnInit {

  // value
  value
  add
  edit
  delete
  Form: FormGroup
  listData2

  // constructor
  constructor(
    private DepartmentsService: DepartmentsService,
    public dialogRef: MatDialogRef<DepartmentDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) {
    const { action, value } = data;
    this.value = value;
    this.add = action === 'add';
    this.edit = action === 'edit';
    this.delete = action === 'delete';
  }

  // ngOnInit
  ngOnInit(): void {
    this.buildForm();
    this.getAllDepartment();
  }

  // get function
  getAllDepartment() {
    this.DepartmentsService.getAll().subscribe(r => {
      this.listData2 = r['data']['apiResult'];
    })
  }

  // build form function
  buildForm() {
    if (this.add) {
      this.Form = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        parent_id: new FormControl(null, [Validators.required]),
        active: new FormControl(true),
      });
    }

    if (this.edit) {
      this.Form = new FormGroup({
        id: new FormControl(this.value.id, [Validators.required]),
        name: new FormControl(this.value.name, [Validators.required]),
        parent_id: new FormControl(this.value.parent_id, [Validators.required]),
        created_by: new FormControl(this.value.created_by),
        created_date: new FormControl(this.value.created_date),
        active: new FormControl(true),
      });
    }
  }

  // add function
  addDepartment() {
    this.DepartmentsService.post(this.Form.value).subscribe(r => { })
  }

  // edit function
  editDepartment() {
    this.DepartmentsService.put(this.value.id, this.Form.value).subscribe(r => { })
  }

  // delete function
  deleteDepartment() {
    this.DepartmentsService.delete(this.value.id).subscribe(r => { })
  }

}
