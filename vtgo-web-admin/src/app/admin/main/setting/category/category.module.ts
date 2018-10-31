import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryComponent } from './category.component';
import { RouterModule } from "@angular/router";
import { ICategoryServiceToken, CategoryService } from "src/app/core";
import { SharedModule } from "src/app/shared";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CategorypopupComponent } from "./categorypopup/categorypopup.component";
import { NgbTabsetModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        NgbTabsetModule,
        SharedModule.forRoot(),
        RouterModule.forChild([
            {path: '', component: CategoryComponent, data: {
                title: 'VTGO Loại danh mục',
                urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Loại danh mục'}]
              }}
        ])
    ],
    declarations: [
        CategoryComponent,
        CategorypopupComponent
    ],
    providers: [{
        provide: ICategoryServiceToken,
        useClass: CategoryService
    }]
})

export class CategoryModule { }