import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './vehicle.component';

@NgModule({
  imports: [
    CommonModule,
    VehicleRoutingModule,
    NgxDatatableModule
  ],
  declarations: [
    VehicleComponent
  ]
})
export class VehicleModule { }
