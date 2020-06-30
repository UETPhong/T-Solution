import { Component, OnInit } from '@angular/core';
import { SentEmailService } from '../../../services/sent-email.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CareersService } from '../../../services';

@Component({
  selector: 'home-contact',
  templateUrl: './home-contact.component.html',
  styleUrls: ['./home-contact.component.css']
})
export class HomeContactComponent implements OnInit {

  checkboxcareers
  formContact: FormGroup

  constructor(
    private SentEmailService: SentEmailService,
    private CareersService: CareersService
  ) { }

  ngOnInit(): void {
    this.getAllCareers();
    this.buildForm();
  }

  careers
  getAllCareers() {
    this.CareersService.getAll().subscribe(r => {
      this.careers = r['data']['apiResult'];
    })
  }


  buildForm() {
    this.formContact = new FormGroup({
      full_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      subject: new FormControl('Liên hệ', [Validators.required]),
      content: new FormControl('Liên hệ', [Validators.required]),
      check: new FormControl('form1', [Validators.required]),
      checkbox_value: new FormArray([]),
    })
    this.addCheckboxes();
  }


  addCheckboxes() {
    this.CareersService.getAll().subscribe(r => {
      this.checkboxcareers = r['data']['apiResult'];
      this.checkboxcareers.forEach((o, i) => {
        const control = new FormControl(null);
        (this.formContact.controls.checkbox_value as FormArray).push(control);
      });
    })
  }

  sentEmail() {
    this.formContact.value.content = this.formContact.value.checkbox_value
      .map((v, i) => v ? this.careers[i].name : null)
      .filter(v => v !== null).join(", ");
    this.SentEmailService.sentEmail(this.formContact.value).subscribe(r => {
      // console.log(r);
    })
  }

}
