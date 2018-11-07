import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


import { OrderPaidRoutingModule } from './order-paid.routing.module'; 
import { OrderPaidComponent} from './order-paid.component';

import { SharedModule } from '../../../../shared';
import {
  OrderListService,
  IOrderListServiceToken
} from '../../../../core';
import { NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgxSpinnerModule,
    FormsModule,
    OrderPaidRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgbTabsetModule,
    SharedModule.forRoot()
  ],
  declarations: [
    OrderPaidComponent
  ],
  providers: [{
    provide: IOrderListServiceToken,
    useClass: OrderListService
  }]
})
export class OrderPaidModule { }
