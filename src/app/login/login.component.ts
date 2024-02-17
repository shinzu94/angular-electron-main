import {Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {AuthService} from '../shared/services/auth.service';
import {NgbNavLink, NgbNavLinkBase} from '@ng-bootstrap/ng-bootstrap';
import {AuthRequest} from '../shared/model/auth.request';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    NgbNavLink,
    NgbNavLinkBase,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginDate: AuthRequest = new AuthRequest("", "");
  constructor(private authService: AuthService) {
  }

  userLogin(){
    console.log(this.loginDate);
    this.authService.userLogin(this.loginDate);
  }
}
