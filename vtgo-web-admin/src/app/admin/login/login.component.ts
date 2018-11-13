import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginViewModel, IAuthenServiceToken, IAuthenService, SystemConfig } from 'src/app/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  current: any;
  constructor(private router: Router, private modalServices: NgbModal,
    @Inject(IAuthenServiceToken) private authService: IAuthenService) { }

  login(loginForm: NgForm) {
    this.userName = loginForm.form.value.userName;
    this.password = loginForm.form.value.password;
    this.user = new LoginViewModel();
    this.user.email = this.userName;
    this.user.password = this.password;
    this.authService.Login(this.user).subscribe((item: any) => {
      item = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
      if (item !== null) {
        if (item.status === 0) {
          this.router.navigate(['/admin/main']);
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
  }


  open(ele) {
    this.modalServices
      .open(ele, { size: 'sm' })
  }

}
