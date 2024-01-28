import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import {AuthRouteGuard} from './shared/guards/auth.route.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private guard: AuthRouteGuard
  ) {
    translate.setDefaultLang('pl');
    translate.use('pl');
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
      Notification.requestPermission((result) => {
        console.log(result);
      });
      new Notification("test", { body: "Test" });
    } else {
      console.log('Run in browser');
    }
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
    this.electronService.close();
  }

  public canShow(route: string): boolean {
    return this.guard.canShow(route)
  }
}
