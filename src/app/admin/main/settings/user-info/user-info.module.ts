import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { UserInfoRoutingModule } from './user-info-routing.module';
import { UserInfoComponent } from './user-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    UserInfoComponent
  ]
})
export class UserInfoModule { }
