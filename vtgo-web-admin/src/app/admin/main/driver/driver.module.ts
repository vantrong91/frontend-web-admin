import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';

@NgModule({
  imports: [
    CommonModule,
    DriverRoutingModule,
    NgxDatatableModule
  ],
  declarations: [
    DriverComponent
  ]
})
export class DriverModule { }
