import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { RtHomepageComponent } from './rt-homepage/rt-homepage.component';
import { LayoutComponent } from './home-page/layout/layout.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full', },
  { path: '', redirectTo: 'homepage', pathMatch: 'full', },
  { path: '404', component: P404Component, data: { title: 'Page 404' } },
  { path: '500', component: P500Component, data: { title: 'Page 500' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login Page' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register Page' } },
  { path: 'home', component: RtHomepageComponent },
  {
    path: '', component: DefaultLayoutComponent, canActivate: [AuthGuard], data: { title: 'Admin' },
    children: [
      { path: 'base', loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule) },
      { path: 'buttons', loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule) },
      { path: 'charts', loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule) },
      { path: 'dashboard', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'icons', loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule) },
      { path: 'notifications', loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule) },
      { path: 'theme', loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule) },
      { path: 'widgets', loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule) },

      { path: 'personnel', loadChildren: () => import('./element/personnel/personnel.module').then(m => m.PersonnelModule) },
      { path: 'candidate', loadChildren: () => import('./element/candidate/candidate.module').then(m => m.CandidateModule) },
      { path: 'banner', loadChildren: () => import('./element/banner/banner.module').then(m => m.BannerModule) },
      { path: 'articles', loadChildren: () => import('./element/articles/articles.module').then(m => m.ArticlesModule) },
      { path: 'post_recruitment', loadChildren: () => import('./element/post-recruitment/post-recruitment.module').then(m => m.PostRecruitmentModule) },
      { path: 'department', loadChildren: () => import('./element/department/department.module').then(m => m.DepartmentModule) },
      { path: 'job_title', loadChildren: () => import('./element/job-title/job-title.module').then(m => m.JobTitleModule) },
      { path: 'job_position', loadChildren: () => import('./element/job-position/job-position.module').then(m => m.JobPositionModule) },
      { path: 'career', loadChildren: () => import('./element/career/career.module').then(m => m.CareerModule) },
      { path: 'city', loadChildren: () => import('./element/city/city.module').then(m => m.CityModule) },
      { path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
    ]
  },
  {
    path: '', component: LayoutComponent, data: { title: 'home' },
    children: [
      { path: 'homepage', loadChildren: () => import('./home-page/home-page/home-page.module').then(m => m.HomePageModule) },
      { path: 'recruitment', loadChildren: () => import('./home-page/recruitment/recruitment.module').then(m => m.RecruitmentModule) },
      { path: 'contact', loadChildren: () => import('./home-page/contact/contact.module').then(m => m.ContactModule) },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
