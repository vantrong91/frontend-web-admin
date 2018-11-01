import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { InsuranceorderComponent } from './insuranceorder.component';
import { InsuranceOrderRoutingModule } from './insuranceorder.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IInsuranceOrderServiceToken, InsuranceOrderService } from '../../../../core';
import { InsuranInfoComponent } from './insuran-info/insuran-info.component';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        NgbTabsetModule,
        ReactiveFormsModule,
        InsuranceOrderRoutingModule
    ],
    declarations: [
        InsuranceorderComponent,
        InsuranInfoComponent
    ],
    providers: [{
        provide: IInsuranceOrderServiceToken,
        useClass: InsuranceOrderService
    }]
})

export class InsuranceOrderModule {

}