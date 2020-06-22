import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecruitmentComponent } from './recruitment.component';
import { RecruitmentDetailComponent } from './recruitment-detail/recruitment-detail.component';

const routes: Routes = [
  { path: '', component: RecruitmentComponent },
  { path: 'detail/:id', component: RecruitmentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
