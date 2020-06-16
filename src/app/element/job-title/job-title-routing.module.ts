import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobTitleComponent } from './job-title/job-title.component';

const routes: Routes = [{ path: '', component: JobTitleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobTitleRoutingModule { }
