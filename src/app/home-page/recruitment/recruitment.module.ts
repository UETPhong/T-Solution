import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { RecruitmentComponent } from './recruitment.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RecruitmentComponent,],
  imports: [
    CommonModule,
    RecruitmentRoutingModule,
    ReactiveFormsModule
  ]
})
export class RecruitmentModule { }
