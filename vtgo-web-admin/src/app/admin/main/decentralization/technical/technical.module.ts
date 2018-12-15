import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TechnicalComponent } from './technical.component';
import { TechnicalRoutingModule } from './technical-routing.module';
import { TechnicalpopupComponent } from './technicalpopup/technicalpopup.component';
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TechnicalRoutingModule
  ],
  declarations: [
    TechnicalComponent,
    TechnicalpopupComponent,
  ],
})
export class TechnicalModule { }
