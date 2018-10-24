import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { ChangePwRoutingModule } from './change-pw-routing.module';
import { ChangePwComponent } from './change-pw.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    ChangePwRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ChangePwComponent
  ]
})
export class ChangePwModule { }
