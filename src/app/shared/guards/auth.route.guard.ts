import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from "rxjs";
import { AuthService } from '../services/auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthRouteGuard implements CanActivate{

  constructor(private authService: AuthService, private route: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userData = this.authService.userInfo.getValue();
    //TODO guard to improve
    if (state.url == "/")
      return true;
    if (userData && userData.userid) {
      if (state.url.indexOf("login") > -1) {
        this.route.navigate(["/home"]);
        return false;
      }
    } else {
      if (state.url.indexOf("home") > -1) {
        this.route.navigate(["/login"]);
        return false;
      }
    }

    return true;
  }

  canShow(route: string) {
    const userData = this.authService.userInfo.getValue();
    if (userData && userData.userid) {
      if (route.indexOf("login") > -1) {
        return false;
      }
    } else {
      if (route.indexOf("home") > -1) {
        console.log(route)
        return false;
      }
    }
    return true;
  }
}
