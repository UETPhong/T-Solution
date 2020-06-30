import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { BannerComponent } from './banner/banner.component';
import { InformationComponent } from './information/information.component';
import { ServiceComponent } from './service/service.component';
import { InformationDetailComponent } from './information-detail/information-detail.component';
import { HomeRecruitmentComponent } from './home-recruitment/home-recruitment.component';
import { WhyChoiceUsComponent } from './why-choice-us/why-choice-us.component';
import { HomeContactComponent } from './home-contact/home-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoreServiceComponent } from './service/more-service/more-service.component';
import { MoreComponent } from './why-choice-us/more/more.component';


@NgModule({
  declarations: [HomePageComponent, BannerComponent, InformationComponent, ServiceComponent, InformationDetailComponent, HomeRecruitmentComponent, WhyChoiceUsComponent, HomeContactComponent, MoreServiceComponent, MoreComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomePageModule { }
