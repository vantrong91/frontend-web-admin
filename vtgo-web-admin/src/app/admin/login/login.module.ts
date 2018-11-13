import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';
import { FormsModule } from '@angular/forms';
import { AuthenService, IAuthenServiceToken } from 'src/app/core';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ForgotPassModule } from './forgot-pass/forgot-pass.module';
import { NgxSpinnerModule} from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    LoginRoutingModule,
    NgxSpinnerModule,
    ForgotPassModule
  ],
  declarations: [LoginComponent, ForgotPassComponent],
  providers: [ CookieService,{provide: IAuthenServiceToken, useClass: AuthenService}]
})
export class LoginModule { }
