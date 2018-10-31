import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ConfigpocilyComponent } from "./configpocily.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: ConfigpocilyComponent, data: {
                title: 'VTGO Chính sách',
                urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Chính sách'}]
              }}
        ])
    ],
    declarations: [
        ConfigpocilyComponent
    ]
})

export class ConfigPocilyModule{}