import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FogotPasswordComponent } from './fogot-password.component';
import { ForgotPasswordRoutingModule } from './fogot-password.routing';
import { FormsModule } from '@angular/forms';
import { AuthenService, IAuthenServiceToken } from 'src/app/core';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ForgotPasswordRoutingModule
  ],
  declarations: [FogotPasswordComponent],
  providers: [ {provide: IAuthenServiceToken, useClass: AuthenService}]
})
export class FogotPasswordModule { }
