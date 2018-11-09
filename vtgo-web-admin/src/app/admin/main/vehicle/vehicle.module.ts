import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTabsetModule,NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { VehicleRoutingModule } from './vehicle.routing';
import { VehicleComponent } from './vehicle.component';
import { VehiclepopupComponent } from './vehiclepopup/vehiclepopup.component';
import { SharedModule } from '../../../shared';

import {
  IVehicleServiceToken,
  VehicleService,
  IAddressServiceToken,
  AddressService
} from '../../../core';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbDatepickerModule,
    NgbTabsetModule,
    SharedModule.forRoot(),
    DpDatePickerModule,
    FileUploadModule,
    VehicleRoutingModule
  ],
  declarations: [
    VehicleComponent,
    VehiclepopupComponent,
  ],
  providers: [{
    provide: IVehicleServiceToken,
    useClass: VehicleService
  },{
    provide: IAddressServiceToken, 
    useClass: AddressService}]
})
export class VehicleModule { }
