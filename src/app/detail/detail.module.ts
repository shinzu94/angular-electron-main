import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, SharedModule]
})
export class DetailModule {}
