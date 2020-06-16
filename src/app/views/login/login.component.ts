import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  error = '';
  returnUrl: string;
  loginValue = {
    username: '',
    password: '',
  }

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit( ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    console.log(this.returnUrl);
    
   }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    //...
    this.loading = true;
    this.authenticationService.login(this.loginValue.username, this.loginValue.password).pipe(first()).
      subscribe(r => {
        console.log(r);
        
        if (r['success'] === true) {
          alert('Đăng nhập thành công'),
            this.router.navigate(['/dashboard']);
        }
        if (r['success'] === false) { alert('Đăng nhập không thành công') }
      }
      )
  }
  onSubmit2() {
    this.authenticationService.logout();
  }
}
