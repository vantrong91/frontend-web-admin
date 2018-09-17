import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { GoodsownerRoutingModule } from './owner-routing.module';
import { GoodsOwnerComponent } from './goodsowner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoodsownerInfoComponent } from './goodsowner-info/goodsowner-info.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ViewInfoComponent } from './goodsowner-view/view-info.component';
import { FileUploadModule } from 'ng2-file-upload'

@NgModule({
  imports: [
    CommonModule,
    GoodsownerRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    FileUploadModule
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    GoodsOwnerComponent,
    GoodsownerInfoComponent,
    ViewInfoComponent,
    
  ]
})
export class GoodsownerModule { }
