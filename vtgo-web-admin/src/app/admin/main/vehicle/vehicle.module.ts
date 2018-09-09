import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './vehicle.component';
import { VehiclepopupComponent } from './vehiclepopup/vehiclepopup.component';
import { SharedModule } from '../../../shared';

import {
  IVehicleServiceToken,
  VehicleService
} from '../../../core'

@NgModule({
  imports: [
    CommonModule,
    VehicleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbTabsetModule,
    SharedModule.forRoot()
  ],
  declarations: [
    VehicleComponent,
    VehiclepopupComponent,
  ],
  providers: [{
    provide: IVehicleServiceToken,
    useClass: VehicleService
  }]
})
export class VehicleModule { }
