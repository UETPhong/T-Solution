import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { InformationDetailComponent } from './information-detail/information-detail.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'informationDetail/:id', component: InformationDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
