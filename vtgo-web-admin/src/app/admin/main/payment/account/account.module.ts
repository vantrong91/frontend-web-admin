import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountRoutingModule} from './account.routing';
import { AccountComponent} from './account.component';
import { SharedModule} from '../../../../shared';
import { AccountInfoComponent } from './account-info/account-info.component';

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
        AccountInfoComponent
    ]
})

export class AccountModule {}