import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, MatProgressSpinner]
})
export class HomeModule {}
