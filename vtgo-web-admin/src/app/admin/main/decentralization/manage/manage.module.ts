import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageComponent } from './manage.component';
import { ManageRoutingModule } from './manage-routing.module';
import { ManagepopupComponent } from './managepopup/managepopup.component';



@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ManageRoutingModule
  ],
  declarations: [
    ManageComponent,
    ManagepopupComponent,

  ],
})
export class ManageModule { }
