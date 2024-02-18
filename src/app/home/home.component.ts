import {Component, Inject, OnInit} from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import {ApiService} from '../http/api.service';
import {UserModel} from '../model/user.model';
import {Gender, Gender2LabelMapping} from '../register/gender.model';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    @Inject(AuthService)
    private authService :AuthService,
    private api: ApiService,
    private translate: TranslateService
  ) {
  }
  user?: UserModel;
  loaded = false;
  mode: ProgressSpinnerMode = 'indeterminate';
  translatedGender?: string;

  ngOnInit(): void {
    this.api.getMyData().subscribe(resp => {
      this.user = resp;
      this.translatedGender = this.translate.instant(this.genderLabel(resp.gender));
      this.loaded = true;
    });
  }

  genderLabel(label: Gender): string {
    return Gender2LabelMapping[label];
  }
}
