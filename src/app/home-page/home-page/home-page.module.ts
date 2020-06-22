import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { BannerComponent } from './banner/banner.component';
import { InformationComponent } from './information/information.component';
import { ServiceComponent } from './service/service.component';
import { InformationDetailComponent } from './information-detail/information-detail.component';


@NgModule({
  declarations: [HomePageComponent, BannerComponent, InformationComponent, ServiceComponent, InformationDetailComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
