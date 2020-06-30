import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { InformationDetailComponent } from './information-detail/information-detail.component';
import { MoreServiceComponent } from './service/more-service/more-service.component';
import { MoreComponent } from './why-choice-us/more/more.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'informationDetail/:id', component: InformationDetailComponent },
  { path: 'more', component: MoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
