import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VehicleOwnerRoutingModule } from './vehicle-owner.routing';
import { VehicleOwnerComponent } from './vehicle-owner.component';
import { CompanyComponent } from './company/company.component';
import { PersonalComponent } from './personal/personal.component';
import { NgbTabsetModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared';
import {
  IVehicleOwnerServiceToken,
  VehicleOwnerService,
  ICategoryServiceToken, CategoryService, IAddressServiceToken, AddressService, IBankListServiceToken, BankListService
} from '../../../core';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    VehicleOwnerRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgbTabsetModule,
    NgbDatepickerModule,
    FormsModule,
    SharedModule.forRoot(),
    DpDatePickerModule,
    FileUploadModule
  ],
  declarations: [VehicleOwnerComponent, CompanyComponent, PersonalComponent],
  providers: [
    { provide: IVehicleOwnerServiceToken, useClass: VehicleOwnerService },
    { provide: ICategoryServiceToken, useClass: CategoryService },
    { provide: IAddressServiceToken, useClass: AddressService },
    { provide: IBankListServiceToken, useClass: BankListService }]
})
export class VehicleOwnerModule { }
