import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from "./pages/about/about.component";
import {RouterGuard} from "./auth/router.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'dashboard',
    canActivate: [RouterGuard],
    canActivateChild: [RouterGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)},
  { path: 'about', pathMatch: 'full', component: AboutComponent,
    canActivate: [RouterGuard],
    data: {
      breadcrumb: 'about'
    },}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
