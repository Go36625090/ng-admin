import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from "./pages/about/about.component";
import {RouterGuard} from "./auth/router.guard";
import {HomeComponent} from "./pages/home/home.component";
import {PageNotFoundComponent} from "./pages/errors/page.not.found.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {
    path: 'home', component: HomeComponent,
    data: {
      name: 'home'
    }
  },
  {
    path: 'dashboard',
    canLoad: [RouterGuard],
    canActivateChild: [RouterGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      name: 'dashboard'
    }
  },
  {
    path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    data: {
      name: 'welcome'
    }
  },
  {path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)},
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule),
    canActivateChild: [RouterGuard],
    data: {
      name: 'setting'
    }
  },
  {
    path: 'about', component: AboutComponent,
    canActivate: [RouterGuard],
    data: {
      name: 'about'
    },
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
