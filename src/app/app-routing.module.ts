import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthRouteGuard} from './shared/guards/auth.route.guard';
import {RegisterComponent} from './register/register.component';
import {BodyDataComponent} from './bodyData/body-data.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: "body-data",
    component: BodyDataComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
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
