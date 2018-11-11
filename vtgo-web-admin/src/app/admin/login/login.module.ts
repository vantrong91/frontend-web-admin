import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';
import { FormsModule } from '@angular/forms';
import { AuthenService, IAuthenServiceToken } from 'src/app/core';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent, ForgotPassComponent],
  providers: [ {provide: IAuthenServiceToken, useClass: AuthenService}]
})
export class LoginModule { }
