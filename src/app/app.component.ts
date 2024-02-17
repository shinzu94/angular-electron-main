import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AuthRouteGuard } from './shared/guards/auth.route.guard';
import { AuthService } from './shared/services/auth.service';
import {ApiService} from './http/api.service';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appLoaded: boolean = false;
  public mode: ProgressSpinnerMode = 'indeterminate';

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private guard: AuthRouteGuard,
    private auth: AuthService,
    private api: ApiService
  ) {
    translate.setDefaultLang('pl');
    translate.use('pl');

    if (electronService.isElectron) {
      void Notification.requestPermission((result) => {
        console.log(result);
      });
      new Notification("test", { body: "Test" });
    } else {
      console.log('Run in browser');
    }

    setInterval(() => {
      if (this.appLoaded) {
        return false;
      }
      this.api.getUp().subscribe((status) => {
        if (status.status === "UP") {
          this.appLoaded = true;
        }
      });
    }, 500);
  }

  get isElectron(): boolean {
    return this.electronService.isElectron
  }

  public changePl() {
    this.translate.setDefaultLang('pl');
    this.translate.use('pl');
  }

  public changeEn() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  public close() {
    this.api.disableApp();
    this.electronService.close();
  }

  public canShow(route: string): boolean {
    return this.guard.canShow(route)
  }

  logout() {
    this.auth.logout();
  }
}
