import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTabsetModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountRoutingModule} from './account-exchange.routing';
import { AccountComponent} from './account-exchange.component';
import { SharedModule} from '../../../../shared';
import { BalanceHisComponent } from './balance-his/balance-his.component';
import { BalanceComponent } from './balance/balance.component';
import { ExchangeComponent } from './exchange/exchange.component';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        NgbTabsetModule,
        SharedModule.forRoot(),

    ],
    declarations: [
        AccountComponent,
        BalanceHisComponent,
        BalanceComponent,
        ExchangeComponent
    ]
})

export class AccountModule {}