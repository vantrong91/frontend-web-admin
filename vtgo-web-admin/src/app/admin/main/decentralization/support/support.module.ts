import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SupportComponent } from './support.component';
import { SupportRoutingModule } from './support-routing.module';
import { SupportpopupComponent } from './supportpopup/supportpopup.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SupportRoutingModule
  ],
  declarations: [
    SupportComponent,
    SupportpopupComponent,
  ],
})
export class SupportModule { }
