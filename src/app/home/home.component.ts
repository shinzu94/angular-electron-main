import {Component, Inject, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    @Inject(AuthService)
    private authService :AuthService
  ) {
  }
  user = {
    username: "",
    id: ""
  }
  ngOnInit(): void {
    console.log('HomeComponent INIT');
    this.authService.userInfo.subscribe(value => {
      if(value) {
        this.user.id = value.userid
        this.user.username = value.username
      }
    })
  }

}
