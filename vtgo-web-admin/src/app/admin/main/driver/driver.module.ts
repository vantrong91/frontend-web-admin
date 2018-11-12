import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';
import { DriverInfoComponent } from './driver-info/driver-info.component';
import { ICategoryServiceToken, CategoryService, IAddressServiceToken, AddressService } from 'src/app/core';
import { SharedModule } from 'src/app/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DriverRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    NgbTabsetModule,
    FileUploadModule
  ],
  declarations: [
    DriverComponent,
    DriverInfoComponent
  ],
  providers: [{provide: ICategoryServiceToken, useClass: CategoryService},{ provide: IAddressServiceToken, useClass: AddressService}]
})
export class DriverModule { }
