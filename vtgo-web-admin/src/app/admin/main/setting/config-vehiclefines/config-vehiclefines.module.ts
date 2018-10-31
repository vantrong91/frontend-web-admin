import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfigVehiclefinesComponent } from "./config-vehiclefines.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: ConfigVehiclefinesComponent, data: {
                title: 'VTGO Tiền phạt xe',
                urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Tiền phạt xe'}]
              }}
        ])
    ],
    declarations: [
        ConfigVehiclefinesComponent
    ]
})

export class ConfigVehiclefinesModule{}