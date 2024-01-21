import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        RouterLink,
        TranslateModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService) {
  }

  userLogin(){
    this.authService.userLogin("");
  }
}
