import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';
import { FormsModule } from '@angular/forms';
import { AuthenService, AuthGuard, IAccountServiceToken, AccountService, IAuthenServiceToken, IAuthenService } from 'src/app/core';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [{provide: IAuthenServiceToken, useClass: AuthenService}]
})
export class LoginModule { }
