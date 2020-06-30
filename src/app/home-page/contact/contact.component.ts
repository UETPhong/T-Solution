import { Component, OnInit } from '@angular/core';
import { SentEmailService } from '../../services/sent-email.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formContact: FormGroup

  constructor(private SentEmailService: SentEmailService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formContact = new FormGroup({
      full_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      subject: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      check: new FormControl('form2', [Validators.required]),
    })
  }

  sentMail() {
    if (this.formContact.invalid) {
      console.log('Thiếu dữ liệu');
      return
    }
    this.SentEmailService.sentEmail(this.formContact.value).subscribe(r => {
      // console.log(r);
    })
  }

}
