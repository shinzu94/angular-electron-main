import {Component, NgModule} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        // Router,
        RouterLink,
        TranslateModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public username: string = "";
  public password: string = "";
  public loginDate = {
    username: "",
    password: ""
  }
  constructor(private authService: AuthService
              , private router: Router
  ) {
    console.log(authService)
  }

  login(data:any) {
    console.log(data);
  }
  userLogin(){
    console.log(this.loginDate);
    console.log(this.username);
    console.log(this.password);
    this.authService.userLogin(this.loginDate);

    this.router.navigate(["/home"])
  }

  trans(event: InputEvent|any): string {
    console.log(event)
    return event?.target?.value;
  }
}
