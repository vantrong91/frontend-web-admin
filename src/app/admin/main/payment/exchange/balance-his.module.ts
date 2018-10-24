import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import {BalanceHisRoutingModule} from './balance-his.routing';
import {BalanceHisComponent} from './balance-his.component';
import { BalanceComponent } from './balance/balance.component';
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    BalanceHisRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgbTabsetModule,
  ],
  declarations: [
    BalanceHisComponent,
    BalanceComponent
  ]
})
export class BalanceHisModule { }
