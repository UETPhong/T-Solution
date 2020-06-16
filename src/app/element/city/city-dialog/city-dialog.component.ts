import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CityProvincesService } from '../../../services';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.css']
})
export class CityDialogComponent implements OnInit {
  // action
  value
  add
  edit
  delete
  Form: FormGroup

  constructor(
    private cityService: CityProvincesService,
    public dialogRef: MatDialogRef<CityDialogComponent>,
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
    this.cityService.post(this.Form.value).subscribe(r => {
      console.log('check add', r);
    })
  }

  editCity() {
    this.cityService.put(this.value.id, this.Form.value).subscribe(r => {
      console.log('check edit', r);
    })
  }

  deleteCity() {
    this.cityService.delete(this.value.id).subscribe(r => {
      console.log(r);
    })
  }

}
