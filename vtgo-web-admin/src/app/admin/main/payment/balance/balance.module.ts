import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceComponent } from './balance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BalanceService,IBalanceServiceToken } from '../../../../core';

@NgModule({
  imports: [
    CommonModule,
    BalanceRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    BalanceComponent
  ],
  providers: [{
    provide: IBalanceServiceToken,
    useClass: BalanceService
  }]
})
export class BalanceModule { }
