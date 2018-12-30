import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BankAdminComponent } from './bank-admin.component';
import { RouterModule } from "@angular/router";
import { ICategoryServiceToken, CategoryService } from "src/app/core";
import { SharedModule } from "src/app/shared";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbTabsetModule } from "@ng-bootstrap/ng-bootstrap";
import { BankPopupComponent}  from "./bankpopup/bankpopup.component"
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        NgbTabsetModule,
        SharedModule.forRoot(),
        RouterModule.forChild([
            {path: '', component: BankAdminComponent, data: {
                title: 'VTGO Tài khoản ngân hàng Admin',
                urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Tài khoản ngân hàng Admin'}]
              }}
        ])
    ],
    declarations: [
        BankAdminComponent,
        BankPopupComponent
    ],
    providers: [{
        provide: ICategoryServiceToken,
        useClass: CategoryService
    }]
})

export class BankAdminModule { }