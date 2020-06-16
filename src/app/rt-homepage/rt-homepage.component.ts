import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-rt-homepage',
  templateUrl: './rt-homepage.component.html',
  styleUrls: ['./rt-homepage.component.css']
})
export class RtHomepageComponent implements OnInit {

  constructor() {
    window.location.href = environment.home;

   }

  ngOnInit(): void {
  }

}
