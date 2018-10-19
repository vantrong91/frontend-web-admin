import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusinessComponent } from './business.component';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinesspopupComponent } from './businesspopup/businesspopup.component';
@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BusinessRoutingModule
  ],
  declarations: [
    BusinessComponent,
    BusinesspopupComponent
  ],
})
export class BusinessModule { }
