import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthRequest} from '../model/auth.request';
import {AuthResponse} from '../model/auth.response';
import {Router} from '@angular/router';
import {RegisterRequest} from '../model/register.request';

@Injectable()
export class AuthService {
  userInfo:BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient,
              private router: Router) {
  }
  userLogin(userPayload: AuthRequest) {
    this.http
      .post("/api/v1/auth/authenticate",
        userPayload
      )
      .pipe(map((value: any) => {
        localStorage.setItem("access_token", (value as AuthResponse)?.accessToken);
        localStorage.setItem("refresh_token", (value as AuthResponse)?.refreshToken);
        const decryptedUser = this.jwtHelper.decodeToken((value as AuthResponse)?.accessToken);

        const data = {
          access_token: (value as AuthResponse)?.accessToken,
          refresh_token: (value as AuthResponse)?.refreshToken,
          username: decryptedUser.username,
          userid: decryptedUser.sub,
          tokenExpiration: decryptedUser.exp
        }

        this.userInfo.next(data);
        this.router.navigate(["/home"])
      }))
      .subscribe();
  }

  registerUser(form: any, registerPayload: RegisterRequest): Observable<any> {
    return this.http
      .post("/api/v1/auth/register",
        registerPayload
      )
      .pipe(map((value: any) => {
        this.registerUserReaction(value);
      }));
  }

  registerUserReaction(value: any) {
    localStorage.setItem("access_token", (value as AuthResponse)?.accessToken);
    localStorage.setItem("refresh_token", (value as AuthResponse)?.refreshToken);
    const decryptedUser = this.jwtHelper.decodeToken((value as AuthResponse)?.accessToken);

    const data = {
      access_token: (value as AuthResponse)?.accessToken,
      refresh_token: (value as AuthResponse)?.refreshToken,
      username: decryptedUser.username,
      userid: decryptedUser.sub,
      tokenExpiration: decryptedUser.exp
    }

    this.userInfo.next(data);
    this.router.navigate(["/home"])
  }
  logout(): void {
    localStorage.clear();
    window.location.reload();
    // this.authService.logout().subscribe({
    //   next: res => {
    //     console.log(res);
    //     this.storageService.clean();
    //
    //     window.location.reload();
    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // });
  }
}
