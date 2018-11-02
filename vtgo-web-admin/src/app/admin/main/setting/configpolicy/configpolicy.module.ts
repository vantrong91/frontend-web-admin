import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ConfigpolicyComponent } from "./configpolicy.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: ConfigpolicyComponent, data: {
                title: 'VTGO Chính sách',
                urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Chính sách'}]
              }}
        ])
    ],
    declarations: [
        ConfigpolicyComponent
    ]
})

export class ConfigPolicyModule{}