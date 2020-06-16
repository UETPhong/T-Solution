import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CityProvincesService, CareersService } from '../../../services';


@Component({
  selector: 'app-career-dialog',
  templateUrl: './career-dialog.component.html',
  styleUrls: ['./career-dialog.component.css']
})
export class CareerDialogComponent implements OnInit {
  // action
  value
  add
  edit
  delete
  Form: FormGroup

  constructor(
    private CareersService: CareersService,
    public dialogRef: MatDialogRef<CareerDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) {
    const { action, value } = data;
    this.value = value;
    this.add = action === 'add';
    this.edit = action === 'edit';
    this.delete = action === 'delete';
  }

  ngOnInit(): void {
    console.log(this.data);

    this.buildForm();
  }

  buildForm() {
    if (this.add) {
      this.Form = new FormGroup({
        // id: new FormControl(null, [Validators.required]),
        name: new FormControl(null, [Validators.required]),
        active: new FormControl(true),
      });
    }
    if (this.edit) {
      this.Form = new FormGroup({
        id: new FormControl(this.value.id, [Validators.required]),
        name: new FormControl(this.value.name, [Validators.required]),
        created_by: new FormControl(this.value.created_by),
        created_date: new FormControl(this.value.created_date),
        active: new FormControl(true),
      });
    }
  }

  addCity() {
    console.log(this.Form);
    if (this.Form.status === "INVALID") {
      alert('Hãy điền đầy đủ thông tin');
    }
    this.CareersService.post(this.Form.value).subscribe(r => {
      console.log('check add', r);
      this.dialogRef.close();
    })
  }

  editCity() {
    console.log(this.Form);
    if (this.Form.status === "INVALID") {
      alert('Hãy điền đầy đủ thông tin');
    }
    this.CareersService.put(this.value.id, this.Form.value).subscribe(r => {
      console.log('check edit', r);
    })
  }

  deleteCity() {
    this.CareersService.delete(this.value.id).subscribe(r => {
      console.log(r);
    })
  }

}
