import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VehicleOwnerRoutingModule } from './vehicle-owner-routing.module';
import { VehicleOwnerComponent } from './vehicle-owner.component';
import { CompanyComponent } from './company/company.component';
import { PersonalComponent } from './personal/personal.component';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared';
import {
  IVehicleOwnerServiceToken,
  VehicleOwnerService
} from '../../../core';

@NgModule({
  imports: [
    CommonModule,
    VehicleOwnerRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgbTabsetModule,
    FormsModule,
    SharedModule.forRoot()
  ],
  declarations: [VehicleOwnerComponent, CompanyComponent, PersonalComponent],
  providers: [{
    provide: IVehicleOwnerServiceToken,
    useClass: VehicleOwnerService
  }]
})
export class VehicleOwnerModule { }
