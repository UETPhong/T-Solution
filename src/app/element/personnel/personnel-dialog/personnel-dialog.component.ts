import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CityProvincesService,
  RolesService,
  DepartmentsService,
  JobPositionsService,
  JobTitlesService,
  UsersService
} from '../../../services'


@Component({
  selector: 'app-personnel-dialog',
  templateUrl: './personnel-dialog.component.html',
  styleUrls: ['./personnel-dialog.component.css']
})
export class PersonnelDialogComponent implements OnInit {

  // value
  cityProvinces
  roles
  departments
  jobPositions
  jobTitles
  add
  edit
  delete
  value

  gender: string[] = ['Nam', 'Nữ', 'Không xác định'];
  Form: FormGroup

  // constructor
  constructor(
    private CityProvincesService: CityProvincesService,
    private RolesService: RolesService,
    private DepartmentsService: DepartmentsService,
    private JobPositionsService: JobPositionsService,
    private JobTitlesService: JobTitlesService,
    private UsersService: UsersService,
    public dialogRef: MatDialogRef<PersonnelDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    const { action, value } = data;
    this.value = value;
    this.add = action === 'add';
    this.edit = action === 'edit';
    this.delete = action === 'delete';
  }

  //  ngOnInit
  ngOnInit(): void {
    this.getCityProvinces();
    this.getRoles();
    this.getDepartments();
    this.getJobPositions();
    this.getJobTitles();
    this.buildForm();
  }

  // get function
  getCityProvinces() { this.CityProvincesService.getAll().subscribe(r => { this.cityProvinces = r['data']['apiResult'] }) }
  getRoles() { this.RolesService.getAll().subscribe(r => { this.roles = r['data'] }) }
  getDepartments() { this.DepartmentsService.getAll().subscribe(r => { this.departments = r['data']['apiResult'] }) }
  getJobPositions() { this.JobPositionsService.getAll().subscribe(r => { this.jobPositions = r['data']['apiResult'] }) }
  getJobTitles() { this.JobTitlesService.getAll().subscribe(r => { this.jobTitles = r['data']['apiResult'] }) }

  // build form function
  buildForm() {
    if (this.add) {
      this.Form = new FormGroup({
        username: new FormControl(null, [Validators.required]),
        code: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [Validators.required]),
        full_name: new FormControl(null, [Validators.required]),
        gender: new FormControl(null, [Validators.required]),
        birth_date: new FormControl(null, [Validators.required]),
        address: new FormControl(null, [Validators.required]),
        current_address: new FormControl(null, [Validators.required]),
        role_id: new FormControl(null, [Validators.required]),
        department_id: new FormControl(null, [Validators.required]),
        position_id: new FormControl(null, [Validators.required]),
        job_title_id: new FormControl(null, [Validators.required]),
        active: new FormControl(true),
        description: new FormControl(null),
        password: new FormControl('123456'),
      });
    }

    if (this.edit) {
      this.Form = new FormGroup({
        id: new FormControl(this.value.id, [Validators.required]),
        username: new FormControl(this.value.username, [Validators.required]),
        code: new FormControl(this.value.code, [Validators.required]),
        email: new FormControl(this.value.email, [Validators.required]),
        phone: new FormControl(this.value.phone, [Validators.required]),
        full_name: new FormControl(this.value.full_name, [Validators.required]),
        gender: new FormControl(this.value.gender, [Validators.required]),
        birth_date: new FormControl(this.value.birth_date, [Validators.required]),
        address: new FormControl(this.value.address, [Validators.required]),
        current_address: new FormControl(this.value.current_address, [Validators.required]),
        role_id: new FormControl(this.value.role_id, [Validators.required]),
        department_id: new FormControl(this.value.department_id, [Validators.required]),
        position_id: new FormControl(this.value.position_id, [Validators.required]),
        job_title_id: new FormControl(this.value.job_title_id, [Validators.required]),
        active: new FormControl(true),
        description: new FormControl(this.value.description),
        manager: new FormControl(this.value.manager),
        created_by: new FormControl(this.value.created_by),
        created_date: new FormControl(this.value.created_date),
      });
    }

  }

  // add function
  addPersonnel() {
    if (this.Form.status === "INVALID") { alert('Hãy điền đầy đủ thông tin'); return }
    this.UsersService.postUser(this.Form.value).subscribe(r => { this.dialogRef.close(); })
  }

  // edit function
  editPersonnel() {
    if (this.Form.status === "INVALID") { alert('Hãy điền đầy đủ thông tin'); return }
    this.UsersService.putUser(this.value.id, this.Form.value).subscribe(r => { this.dialogRef.close(); })
  }

  // delete function
  deletePersonnel() {
    this.UsersService.deleteUser(this.value.id).subscribe(r => { })
  }

}
