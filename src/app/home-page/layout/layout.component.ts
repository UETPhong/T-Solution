import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  private _router: Subscription;
  @ViewChild(HomeNavbarComponent) navbar: HomeNavbarComponent

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private element: ElementRef,
  ) { }

  ngOnInit(): void {
    var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    // this._router = this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
    //     if (window.outerWidth > 991) {
    //       window.document.children[0].scrollTop = 0;
    //   }else{
    //       window.document.activeElement.scrollTop = 0;
    //   }
    //   this.navbar.sidebarClose();
    //   })
    // )
    // console.log('check', this.element.nativeElement.children[0].children[0]);

    this.renderer.listen('window', 'scroll', (event) => {
      const number = window.scrollY;
      if (number > 70 || window.pageYOffset > 70) {
        // alert('scroll')
        navbar.classList.remove('navbar-scroll')
        navbar.classList.add('navbar-light')
      }
      else {
        // alert('scroll2')
        navbar.classList.add('navbar-scroll')
        navbar.classList.remove('navbar-light')
      }
    })
  }

}
