
import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticlesService } from '../../../services';

@Component({
  selector: 'app-articles-dialog',
  templateUrl: './articles-dialog.component.html',
  styleUrls: ['./articles-dialog.component.css']
})
export class ArticlesDialogComponent implements OnInit {

  @ViewChild("myckeditor") ckeditor: any;

  // action
  value
  add
  edit
  delete
  ckeConfig: any;
  Form: FormGroup

  constructor(
    private ArticlesService: ArticlesService,
    public dialogRef: MatDialogRef<ArticlesDialogComponent>,
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
    this.ckeConfig = {
      removePlugins: 'undo'
    };
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

  buildForm() {
    if (this.add) {
      this.Form = new FormGroup({
        title: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        content: new FormControl(null),
        // thumbnail: new FormControl(null),
        // size: new FormControl(null),
        // path: new FormControl(null),
        // ext: new FormControl(null),
        active: new FormControl(true),
      });
    }
    if (this.edit) {
      this.Form = new FormGroup({
        id: new FormControl(this.value.id, [Validators.required]),
        title: new FormControl(this.value.title, [Validators.required]),
        description: new FormControl(this.value.description, [Validators.required]),
        content: new FormControl(this.value.content, [Validators.required]),
        // thumbnail: new FormControl(null),
        // size: new FormControl(null),
        // path: new FormControl(null),
        // ext: new FormControl(null),
        thumbnail: new FormControl(this.value.thumbnail),
        size: new FormControl(this.value.size),
        path: new FormControl(this.value.path),
        ext: new FormControl(this.value.ext),
        created_by: new FormControl(this.value.created_by),
        created_date: new FormControl(this.value.created_date),
        active: new FormControl(true),
      });
    }
    console.log(this.Form);
    
  }

  addCity() {
    if (this.Form.status === "INVALID") { alert('Hãy điền đầy đủ thông tin'); return }
    if (this.Form.value.content === null) { alert('Hãy điền nội dung bài viết'); return }
    if (this.fileToUpload === null) { alert('Hãy chọn ảnh bài viết'); return; }
    if (this.fileToUpload !== null && this.fileToUpload.size > 2100000) { alert('File quá lớn!'); return; }

    this.ArticlesService.postArticle(this.Form.value).subscribe(r => {
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.ArticlesService.postFile(r['data']['id'], formData).subscribe(r => {
        })
      }
      this.dialogRef.close();
    })
  }

  editCity() {
    if (this.Form.status === "INVALID") { alert('Hãy điền đầy đủ thông tin'); return }
    // if (this.fileToUpload === null) { alert('Hãy chọn ảnh bài viết'); return; }
    if (this.fileToUpload !== null && this.fileToUpload.size > 2100000) { alert('File quá lớn!'); return; }

    this.ArticlesService.putArticle(this.value.id, this.Form.value).subscribe(r => {
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.ArticlesService.putFile(this.value.id, formData).subscribe(r => {
        })
      }
      this.dialogRef.close();
    })
  }

  deleteCity() {
    this.ArticlesService.deleteArticleId(this.value.id).subscribe(r => {
      console.log(r);
    })
  }

}
