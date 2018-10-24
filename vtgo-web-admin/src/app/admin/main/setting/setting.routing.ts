import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConfigpocilyComponent } from "./configpocily/configpocily.component";
import { ConfigVehiclefinesComponent } from "./config-vehiclefines/config-vehiclefines.component";
import { SettingComponent } from "./setting.component";

const routes: Routes = [
    {
        path: '', component: SettingComponent,
        children: [
            { path: 'policy', component: ConfigpocilyComponent , data: {
                title: 'VTGO Chính sách'
            }},
            { path: 'fines', component: ConfigVehiclefinesComponent, data: {
                title: 'VTGO Tiền phạt xe'
            } }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SettingRoutingModule { }