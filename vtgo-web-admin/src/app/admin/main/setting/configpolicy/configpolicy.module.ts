import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ConfigpolicyComponent } from "./configpolicy.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbTabsetModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "src/app/shared";
import { IPolicyServiceToken, PolicyService } from "src/app/core";
import { ConfigpolicypopupComponent } from './configpolicypopup/configpolicypopup.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        NgbTabsetModule,
        SharedModule.forRoot(),
        RouterModule.forChild([
            {
                path: '', component: ConfigpolicyComponent, data: {
                    title: 'VTGO Chính sách',
                    urls: [{ title: 'Trang chủ', url: '/admin/main' }, { title: 'Chính sách' }]
                }
            }
        ])
    ],
    declarations: [
        ConfigpolicyComponent,
        ConfigpolicypopupComponent
    ],
    providers: [
        { provide: IPolicyServiceToken, useClass: PolicyService }
    ]
})

export class ConfigPolicyModule { }