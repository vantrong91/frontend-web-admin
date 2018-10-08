import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { InsuranceorderComponent } from './insuranceorder.component';
import { InsuranceOrderRoutingModule } from './insuranceorder.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IInsuranceOrderServiceToken, InsuranceOrderService } from '../../../../core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        InsuranceOrderRoutingModule
    ],
    declarations: [
        InsuranceorderComponent
    ],
    providers: [{
        provide: IInsuranceOrderServiceToken,
        useClass: InsuranceOrderService
    }]
})

export class InsuranceOrderModule {

}