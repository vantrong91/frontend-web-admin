import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InsuranceComponent } from './insurance.component';
import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsurancepopupComponent } from './insurancepopup/insurancepopup.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        InsuranceRoutingModule
    ],
    declarations: [
        InsuranceComponent,
        InsurancepopupComponent
    ],
})
export class InsuranceModule { }