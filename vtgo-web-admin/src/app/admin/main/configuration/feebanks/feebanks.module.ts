import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { FeeBanksRoutingModule } from './feebanks-routing.module';
import { FeebanksComponent } from './feebanks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './popup/popup.component';


@NgModule({
  imports: [
    CommonModule,
    FeeBanksRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    FeebanksComponent,
    PopupComponent
  ]
})
export class FeeBanksModule { }
