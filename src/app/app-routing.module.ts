import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from "./pages/about/about.component";
import {RouterGuard} from "./auth/router.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'dashboard',
    canLoad: [RouterGuard],
    canActivateChild: [RouterGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      breadcrumb: 'dashboard'
    }
  },
  {
    path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    data: {
      breadcrumb: 'welcome'
    }
  },
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)},
  {
    path: 'setting',
    loadChildren: ()=> import('./pages/setting/setting.module').then(m => m.SettingModule),
    canLoad: [RouterGuard],
    canActivateChild: [RouterGuard],
    data: {
      breadcrumb: 'setting'
    }
  },
  { path: 'about', pathMatch: 'full', component: AboutComponent,
    canLoad: [RouterGuard],
    canActivate: [RouterGuard],
    data: {
      breadcrumb: 'about'
    },}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
