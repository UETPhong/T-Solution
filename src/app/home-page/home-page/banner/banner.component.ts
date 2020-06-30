import { Component, OnInit } from '@angular/core';
import { BannersService } from '../../../services';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  banners

  constructor(
    private BannersService: BannersService,
  ) { }

  ngOnInit(): void {
    this.getAllBanners()
  }

  getAllBanners() {
    this.BannersService.getBanners().subscribe(r => {
      this.banners = r['data']
      // console.log('check1',this.banners);
    })
  }
}
