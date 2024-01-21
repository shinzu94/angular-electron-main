import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  userInfo:BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();

  userLogin(userPayload: string) {
    const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const refreshtoken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

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
