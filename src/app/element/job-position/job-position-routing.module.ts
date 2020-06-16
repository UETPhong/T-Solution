import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobPositionComponent } from './job-position/job-position.component';

const routes: Routes = [{ path: '', component: JobPositionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobPositionRoutingModule { }
