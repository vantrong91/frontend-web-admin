import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


import { OrderListRoutingModule } from './orderlist-routing.module';
import { OrderListComponent } from './orderlist.component';

import { SharedModule } from '../../../../shared';
import {
  OrderListService,
  IOrderListServiceToken
} from '../../../../core';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    OrderListRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgbTabsetModule,
    SharedModule.forRoot(),
  ],
  declarations: [
    OrderListComponent
  ],
  providers: [{
    provide: IOrderListServiceToken,
    useClass: OrderListService
  }]
})
export class OrderListModule { }
