import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenService, LoginViewModel, IAuthenServiceToken, IAuthenService, SystemConfig } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: '';
  password: '';
  isError = false
  pageTitle = '';
  noti = '';
  user: LoginViewModel;
  constructor(private router: Router,
    @Inject(IAuthenServiceToken) private authService: IAuthenService) { }

  login(loginForm: NgForm) {
    this.userName = loginForm.form.value.userName;
    this.password = loginForm.form.value.password;
    this.user = new LoginViewModel();
    this.user.email = this.userName;
    this.user.password = this.password;
    this.authService.Login(this.user).subscribe((item: any) => {
      item = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
      console.log(item);
      if (item.status === 0) {
        this.authService.IsUserAuthenticated;
        this.isError = false;
        this.router.navigate(['/admin/main']);
        console.log(this.authService.IsUserAuthenticated());
      } if (item.status === 104) {
        !this.authService.IsUserAuthenticated;
        this.isError = true;
        this.noti = 'Bạn không có quyền truy cập'
        console.log(this.authService.IsUserAuthenticated());
        
      }
      else {
        !this.authService.IsUserAuthenticated;
        this.isError = true;
        this.noti = 'Sai tên đăng nhập hoặc mật khẩu';
        console.log(this.authService.IsUserAuthenticated());
        
      }
    })
  }

  release() {
    this.isError = false;
  }
  ngOnInit() {

  }

}
