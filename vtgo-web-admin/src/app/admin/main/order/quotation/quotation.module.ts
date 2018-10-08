import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationComponent } from './quotation.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { QuotationService } from '../../../../core';
import { IQuotationServiceToken } from '../../../../core';

@NgModule({
  imports: [
    CommonModule,
    QuotationRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    QuotationComponent 
  ],
  providers: [{
    provide: IQuotationServiceToken,
    useClass: QuotationService
  }]
})
export class QuotationModule { }
