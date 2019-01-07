import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginViewModel, IAuthenServiceToken, IAuthenService, SystemConfig } from 'src/app/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = this.cookie.get("accountCode");
  password = this.cookie.get("password");
  isError = false
  pageTitle = '';
  noti = '';
  user: LoginViewModel;
  isSaveAccount = false;
  currentUser: any;

  constructor(private router: Router, private cookie: CookieService, private modalServices: NgbModal,
    @Inject(IAuthenServiceToken) private authService: IAuthenService) {

  }

  login(loginForm: NgForm) {
    this.userName = loginForm.form.value.userName;
    this.password = loginForm.form.value.password;
    this.user = new LoginViewModel();
    this.user.accountCode = this.userName;
    this.user.password = this.password;

    this.authService.Login(this.user).subscribe((item: any) => {
      item = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));

      if (item !== null) {
        if (item.status === 0) {
          switch (item.data[0].state) {
            case 1:
              if (this.isSaveAccount == true) {
                this.cookie.deleteAll();
                this.cookie.set("accountCode", this.user.accountCode);
                this.cookie.set("email", this.user.email);
                this.cookie.set("password", this.user.password);
              }
              this.router.navigate(['/admin/main']);
              break;
            case 0:
              alert('Tài khoản chưa được xác nhận');
              localStorage.removeItem(SystemConfig.CURRENT_USER);
              break;
            case 2:
              alert('Tài khoản đã bị khóa');
              localStorage.removeItem(SystemConfig.CURRENT_USER);
              break;
            case 3:
              alert('Tài khoản đã hết hạn');
              localStorage.removeItem(SystemConfig.CURRENT_USER);
              break;
            default:
              alert('Tài khoản không có quyền đăng nhập');
              localStorage.removeItem(SystemConfig.CURRENT_USER);
          }
        }
      }
      else {
        this.isError = true;
        this.noti = 'Sai tên đăng nhập hoặc mật khẩu';
      }

    })

  }

  release() {
    this.isError = false;
  }
  ngOnInit() {
    if (localStorage.getItem(SystemConfig.CURRENT_USER) != null) {
      let currentUser = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER)).data[0];
      if (currentUser != null) {
        if (currentUser.state === 1)
          this.router.navigate(['/admin/main']);
      }
    }
  }

  saveAccount(event) {
    if (event.target.checked == true) {
      this.isSaveAccount = true;

    } else {
      this.isSaveAccount = false;
    }
  }
  open(ele) {
    this.modalServices
      .open(ele, { size: 'sm' })
  }
}
