import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountRoutingModule} from './account.routing';
import { AccountComponent} from './account.component';
import { SharedModule} from '../../../../shared';
import { BalanceHisComponent } from './balance-his/balance-his.component';
import { BalanceComponent } from './balance/balance.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { ReconfirmComponent } from './exchange/reconfirm/reconfirm.component';


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
        ExchangeComponent,
        ReconfirmComponent
    ]
})

export class AccountModule {}