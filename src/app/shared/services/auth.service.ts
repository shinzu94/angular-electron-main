import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthService {
  userInfo:BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }
  userLogin(userPayload: any) {
    console.log(userPayload);
    // this.http
    //   .post("http://localhost:8080/auth/login", userPayload)
    //   .pipe(map((value:any) => {
    //     localStorage.setItem("access_token", value?.access_token);
    //     localStorage.setItem("refresh_token", value?.refresh_token);
    //     const decryptedUser = this.jwtHelper.decodeToken(value?.access_token);
    //
    //     const data = {
    //       access_token: accesstoken,
    //       refresh_token: refreshtoken,
    //       username: decryptedUser.username,
    //       userid: decryptedUser.sub,
    //       tokenExpiration: decryptedUser.exp
    //     }
    //
    //     this.userInfo.next(data);
    //   }))
    // ;

    const accesstoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDU4NzIzMDcsImV4cCI6MTczNzQwODMwNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoib3NrYXIuc2VrOTRAZ21haWwuY29tIiwiR2l2ZW5OYW1lIjoiSm9obm55IiwiU3VybmFtZSI6IlJvY2tldCIsIkVtYWlsIjoianJvY2tldEBleGFtcGxlLmNvbSIsIlJvbGUiOlsiTWFuYWdlciIsIlByb2plY3QgQWRtaW5pc3RyYXRvciJdfQ.XwFcPeYvd9tNgxli6XEteMnCkmhrB-0iaNtcv0KNIMpKsgFARZYMnHOt2pz5jrFLMqEZfcRwb90c9dSA6qSqew";
    const refreshtoken = accesstoken;

    localStorage.setItem("access_token", accesstoken);
    localStorage.setItem("refresh_token", refreshtoken);

    const decryptedUser = this.jwtHelper.decodeToken(accesstoken);

    const data = {
      access_token: accesstoken,
      refresh_token: refreshtoken,
      username: decryptedUser.username,
      userid: decryptedUser.sub,
      tokenExpiration: decryptedUser.exp
    }

    this.userInfo.next(data);
  }
}
