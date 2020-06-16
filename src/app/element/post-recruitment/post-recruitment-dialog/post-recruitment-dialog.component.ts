
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
  UsersService,
  CareersService,
  RecruitmentsService
} from '../../../services'

@Component({
  selector: 'app-post-recruitment-dialog',
  templateUrl: './post-recruitment-dialog.component.html',
  styleUrls: ['./post-recruitment-dialog.component.css']
})
export class PostRecruitmentDialogComponent implements OnInit {

  // value
  cityProvinces
  roles
  departments
  jobPositions
  jobTitles
  career
  add
  edit
  delete
  value

  ckeConfig: any;


  gender: string[] = ['Nam', 'Nữ', 'Không xác định'];
  Form: FormGroup

  // constructor
  constructor(
    private RecruitmentsService: RecruitmentsService,
    private CityProvincesService: CityProvincesService,
    private CareersService: CareersService,
    private RolesService: RolesService,
    private DepartmentsService: DepartmentsService,
    private JobPositionsService: JobPositionsService,
    private JobTitlesService: JobTitlesService,
    private UsersService: UsersService,
    public dialogRef: MatDialogRef<PostRecruitmentDialogComponent>,
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
    this.ckeConfig = {
      removePlugins: 'undo'
    };
    this.getCityProvinces();
    this.getAllCreer();
    this.getRoles();
    this.getDepartments();
    this.getJobPositions();
    this.getJobTitles();
    this.buildForm();
  }

  // get function
  getAllCreer() { this.CareersService.getAll().subscribe(r => { this.career = r['data']['apiResult'] }) }
  getCityProvinces() { this.CityProvincesService.getAll().subscribe(r => { this.cityProvinces = r['data']['apiResult'] }) }
  getRoles() { this.RolesService.getAll().subscribe(r => { this.roles = r['data'] }) }
  getDepartments() { this.DepartmentsService.getAll().subscribe(r => { this.departments = r['data']['apiResult'] }) }
  getJobPositions() { this.JobPositionsService.getAll().subscribe(r => { this.jobPositions = r['data']['apiResult'] }) }
  getJobTitles() { this.JobTitlesService.getAll().subscribe(r => { this.jobTitles = r['data']['apiResult'] }) }

  // build form function
  buildForm() {
    if (this.add) {
      this.Form = new FormGroup({
        title: new FormControl(null, [Validators.required]),                //Tiêu đề
        city_province_id: new FormControl(null, [Validators.required]),     //Tỉnh/Thành phố
        quantity: new FormControl(null, [Validators.required]),             //Số lượng
        salary: new FormControl(null, [Validators.required]),               //Mức lương
        work_required: new FormControl(null, [Validators.required]),        //Yêu cầu công việc
        entitlements: new FormControl(null, [Validators.required]),         //Quyền lợi
        contact: new FormControl(null, [Validators.required]),              //Liên hệ
        valid_date: new FormControl(null, [Validators.required]),           //Ngày hết hạn
        description: new FormControl(null),          //Mô tả
        career_id: new FormControl(null),            //Ngành nghề
        form_of_work: new FormControl(null),         //Hình thức làm việc
        job_level: new FormControl(null),            //Cấp độ công việc
        experience_required: new FormControl(null),  //Yêu cầu kinh nghiệm
        education: new FormControl(null),            //Trình độ học vấn
        active: new FormControl(true),
      });
    }

    if (this.edit) {
      this.Form = new FormGroup({
        id: new FormControl(this.value.id, [Validators.required]),
        title: new FormControl(this.value.title, [Validators.required]),                //Tiêu đề
        city_province_id: new FormControl(this.value.city_province_id, [Validators.required]),     //Tỉnh/Thành phố
        quantity: new FormControl(this.value.quantity, [Validators.required]),             //Số lượng
        salary: new FormControl(this.value.salary, [Validators.required]),               //Mức lương
        work_required: new FormControl(this.value.work_required, [Validators.required]),        //Yêu cầu công việc
        entitlements: new FormControl(this.value.entitlements, [Validators.required]),         //Quyền lợi
        contact: new FormControl(this.value.contact, [Validators.required]),              //Liên hệ
        description: new FormControl(this.value.description, [Validators.required]),          //Mô tả
        valid_date: new FormControl(this.value.valid_date, [Validators.required]),           //Ngày hết hạn
        career_id: new FormControl(this.value.career_id),            //Ngành nghề
        form_of_work: new FormControl(this.value.form_of_work),         //Hình thức làm việc
        job_level: new FormControl(this.value.job_level),            //Cấp độ công việc
        experience_required: new FormControl(this.value.experience_required),  //Yêu cầu kinh nghiệm
        education: new FormControl(this.value.education),            //Trình độ học vấn
        active: new FormControl(true),
        created_by: new FormControl(this.value.created_by),
        created_date: new FormControl(this.value.created_date),
      });
    }

  }

  // add function
  addPersonnel() {
    if (this.Form.status === "INVALID") { alert('Hãy điền đầy đủ thông tin'); return }
    if (this.Form.value.description === null) { alert('Hãy điền nội dung tuyển dụng'); return }
    this.RecruitmentsService.post(this.Form.value).subscribe(r => { this.dialogRef.close(); })
  }

  // edit function
  editPersonnel() {
    if (this.Form.status === "INVALID") { alert('Hãy điền đầy đủ thông tin'); return }
    this.RecruitmentsService.put(this.value.id, this.Form.value).subscribe(r => { this.dialogRef.close(); })
  }

  // delete function
  deletePersonnel() {
    this.RecruitmentsService.delete(this.value.id).subscribe(r => { })
  }

}

