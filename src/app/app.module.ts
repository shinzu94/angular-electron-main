import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './shared/services/auth.service';
import {AuthRouteGuard} from './shared/guards/auth.route.guard';
import {RegisterModule} from './register/register.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCard, MatCardContent} from '@angular/material/card';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    HomeModule,
    LoginModule,
    DetailModule,
    RegisterModule,
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule,
    MatProgressSpinnerModule,
    MatCard,
    MatCardContent
  ],
  providers: [AuthService, AuthRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
