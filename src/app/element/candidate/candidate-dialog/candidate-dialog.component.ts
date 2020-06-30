import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidatesService, RecruitmentsService } from '../../../services';

@Component({
  selector: 'app-candidate-dialog',
  templateUrl: './candidate-dialog.component.html',
  styleUrls: ['./candidate-dialog.component.css']
})
export class CandidateDialogComponent implements OnInit {

  // Value
  value
  add
  edit
  delete
  listRecruitment
  Form: FormGroup

  // constructor
  constructor(
    private CandidatesService: CandidatesService,
    private RecruitmentsService: RecruitmentsService,
    public dialogRef: MatDialogRef<CandidateDialogComponent>,
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
    this.getAllRecruitmentPost();
    this.buildForm();
  }

  // handleFileUpload
  url: any = null;
  fileToUpload: File = null;
  handleFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target.result;
      }
      this.fileToUpload = event.target.files.item(0);
    }
  }
  // get function
  getAllRecruitmentPost() { this.RecruitmentsService.getAll().subscribe(r => { this.listRecruitment = r['data']['apiResult'] }) }

  //build form
  buildForm() {
    if (this.add) {
      this.Form = new FormGroup({
        full_name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required]),
        number: new FormControl(null, [Validators.required]),
        vacancies: new FormControl(null, [Validators.required]),
        active: new FormControl(true),
      });
    }

    if (this.edit) {
      this.Form = new FormGroup({
        id: new FormControl(this.value.id, [Validators.required]),
        full_name: new FormControl(this.value.full_name, [Validators.required]),
        email: new FormControl(this.value.email, [Validators.required]),
        number: new FormControl(this.value.number, [Validators.required]),
        vacancies: new FormControl(this.value.vacancies, [Validators.required]),
        path: new FormControl(this.value.path),
        active: new FormControl(true),
        created_by: new FormControl(this.value.created_by),
        created_date: new FormControl(this.value.created_date),
      });
    }
  }

  //add function
  addCandidate() {
    if (this.Form.status === "INVALID") { alert('Hãy điền đầy đủ thông tin'); return }
    if (this.fileToUpload !== null && this.fileToUpload.size > 2100000) { alert('File quá lớn!'); return; }

    this.CandidatesService.post(this.Form.value).subscribe(r => {
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.CandidatesService.postFile(r['data']['id'], formData).subscribe(r => {
        })
      }
      this.dialogRef.close();
    })
  }

  // edit function
  editCandidate() {
    if (this.Form.status === "INVALID") { alert('Hãy điền đầy đủ thông tin'); return }
    if (this.fileToUpload === null) { alert('Hãy chọn CV của bạn'); return; }
    if (this.fileToUpload !== null && this.fileToUpload.size > 2100000) { alert('File quá lớn!'); return; }

    this.CandidatesService.putSelected(this.value.id, this.Form.value).subscribe(r => {
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.CandidatesService.putFile(this.value.id, formData).subscribe(r => {
        })
      }
      this.dialogRef.close();
    })
  }

  // delete function
  deleteCandidate() { this.CandidatesService.deleteSelected(this.value.id).subscribe(r => { }) }
  
}
