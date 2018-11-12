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
  userName = this.cookie.get("email");
  password= this.cookie.get("password");
  isError = false
  pageTitle = '';
  noti = '';
  user: LoginViewModel;
  isSaveAccount = false;
  constructor(private router: Router, private cookie: CookieService, private modalServices: NgbModal,
    @Inject(IAuthenServiceToken) private authService: IAuthenService) { }

  login(loginForm: NgForm) {
    this.userName = loginForm.form.value.userName;
    this.password = loginForm.form.value.password;
    this.user = new LoginViewModel();
    this.user.email = this.userName;
    this.user.password = this.password;
    this.authService.Login(this.user).subscribe((item: any) => {
      item = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
      if (item.status === 0) {
        this.router.navigate(['/admin/main']);
        if (this.isSaveAccount == true) {
          this.cookie.deleteAll();
          this.cookie.set("email", this.user.email);
          this.cookie.set("password", this.user.password);         
        }        
      } if (item.status === 104) {
        this.isError = true;
        this.noti = 'Bạn không có quyền truy cập'

      }
      if (item.data === null) {
        this.isError = true;
        this.noti = 'Sai tên đăng nhập hoặc mật khẩu';
      }
    })

  }

  release() {
    this.isError = false;
  }
  ngOnInit() {

  }

  saveAccount(event) {

    if (event.target.checked == true) {
      this.isSaveAccount = true;

    } else {
      this.isSaveAccount = false;
    }
    console.log(this.isSaveAccount);

  }



  open(ele) {
    this.modalServices
      .open(ele, { size: 'sm' })
  }

}
