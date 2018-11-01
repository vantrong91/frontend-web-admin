import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountRoutingModule} from './account.routing';
import { AccountComponent} from './account.component';
import { SharedModule} from '../../../../shared';
import { AccountInfoComponent } from './account-info/account-info.component';
import { IAccountServiceToken, AccountService } from '../../../../core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';

@NgModule({
    imports: [
        CommonModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        NgbTabsetModule,
        SharedModule.forRoot(),
        AccountRoutingModule,

    ],
    declarations: [
        AccountComponent,
        AccountInfoComponent,
    ],
    providers: [{
        provide: IAccountServiceToken,
        useClass: AccountService
    }]
})

export class AccountModule {}