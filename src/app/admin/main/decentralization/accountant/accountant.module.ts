import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountantComponent } from './accountant.component';
import { AccountantRoutingModule } from './accountant-routing.module';
import { AccountantpopupComponent } from './accountantpopup/accountantpopup.component';
@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    AccountantRoutingModule
  ],
  declarations: [
    AccountantComponent,
    AccountantpopupComponent,
  ],
})
export class AccountantModule { }
