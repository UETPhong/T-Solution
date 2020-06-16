import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostRecruitmentComponent } from './post-recruitment/post-recruitment.component';

const routes: Routes = [{ path: '', component: PostRecruitmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRecruitmentRoutingModule { }
