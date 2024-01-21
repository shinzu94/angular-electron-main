import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {DetailComponent} from './detail/detail.component';
import {AuthRouteGuard} from './shared/guards/auth.route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "home",
    component: HomeComponent,
    // loadChildren: () => import("./home/home.module").then(_ => _.HomeModule ),
    canActivate: [AuthRouteGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    // loadChildren: () => import("./login/login.module").then(_ => _.LoginModule ),
    canActivate: [AuthRouteGuard]
  },
  {
    path: "detail",
    component: DetailComponent,
    // loadChildren: () => import("./detail/detail.module").then(_ => _.DetailModule ),
    canActivate: [AuthRouteGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
