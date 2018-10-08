import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { GoodsownerRoutingModule } from './goodsowner-routing.module';
import { GoodsOwnerComponent } from './goodsowner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoodsownerInfoComponent } from './goodsowner-edit/goodsowner-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewInfoComponent } from './goodsowner-view/view-info.component';
import { GoodsownerAddComponent } from './goodsowner-add/goodsowner-add.component';


@NgModule({
  imports: [
    CommonModule,
    GoodsownerRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    GoodsOwnerComponent,
    GoodsownerInfoComponent,
    ViewInfoComponent,
    GoodsownerAddComponent,
  ]
})
export class GoodsownerModule { }
