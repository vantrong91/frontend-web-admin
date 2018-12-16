import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfigVehiclefinesComponent } from "./config-vehiclefines.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbTabsetModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "src/app/shared";
import { ICategoryServiceToken, CategoryService } from "src/app/core";
import { VehiclefinespopupComponent } from './vehiclefinespopup/vehiclefinespopup.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        NgbTabsetModule,
        SharedModule.forRoot(),
        RouterModule.forChild([
            {path: '', component: ConfigVehiclefinesComponent, data: {
                title: 'VTGO Tiền phạt xe',
                urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Tiền phạt xe'}]
              }}
        ])
    ],
    declarations: [
        ConfigVehiclefinesComponent,
        VehiclefinespopupComponent
    ],
    providers: [{
        provide: ICategoryServiceToken,
        useClass: CategoryService
    }]
})

export class ConfigVehiclefinesModule{}