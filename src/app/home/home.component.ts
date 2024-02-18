import {Component, Inject, OnInit} from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import {ApiService} from '../http/api.service';
import {UserModel} from '../model/user.model';
import {Gender, Gender2LabelMapping} from '../register/gender.model';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    @Inject(AuthService)
    private authService :AuthService,
    private api: ApiService
  ) {
  }
  user?: UserModel;
  loaded = false;
  mode: ProgressSpinnerMode = 'indeterminate';
  ngOnInit(): void {
    console.log('HomeComponent INIT');
    this.api.getMyData().subscribe(resp => {
      this.user = resp;
      this.loaded = true;
    });
  }

  genderLabel(label: Gender): string {
    return Gender2LabelMapping[label];
  }
}
