import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidatesService, RecruitmentsService } from '../../../services';

@Component({
  selector: 'app-recruitment-apply-dialog',
  templateUrl: './recruitment-apply-dialog.component.html',
  styleUrls: ['./recruitment-apply-dialog.component.css']
})
export class RecruitmentApplyDialogComponent implements OnInit {

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
    public dialogRef: MatDialogRef<RecruitmentApplyDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) {
    const { value } = data;
    this.value = value;
  }

  // ngOnInit
  ngOnInit(): void {
    console.log(this.data);
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
    this.Form = new FormGroup({
      full_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      address: new FormControl(this.value.title, [Validators.required]),
      active: new FormControl(true),
    });
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
}
