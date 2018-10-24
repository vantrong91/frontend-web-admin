import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingRoutingModule } from "./setting.routing";
import { ConfigpocilyComponent } from "./configpocily/configpocily.component";
import { SharedModule } from "src/app/shared";
import { ConfigVehiclefinesComponent } from './config-vehiclefines/config-vehiclefines.component';
import { SettingComponent } from "./setting.component";

@NgModule({
    imports: [
        CommonModule,
        SharedModule.forRoot(),
        SettingRoutingModule
    ],
    declarations: [
        SettingComponent,
        ConfigpocilyComponent,
        ConfigVehiclefinesComponent
    ]
})
export class SettingModule{}