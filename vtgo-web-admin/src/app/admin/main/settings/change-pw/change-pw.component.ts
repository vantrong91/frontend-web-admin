import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { AccountManViewModel, SystemConfig, IAuthenServiceToken, IAuthenService, LoginViewModel, DataService } from 'src/app/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.scss']
})
export class ChangePwComponent implements OnInit {

  oldPassword: any;
  newPassword: any;
  reconfirmPassword: any;
  code: any;
  currentUser: AccountManViewModel;
  account: AccountManViewModel;
  isError = false
  noti = '';
  isNoti: boolean;
  noti1 = '';
  isNoti1: boolean;
  noti2 = '';
  isNoti2: boolean;
  user: LoginViewModel;
  isDisabled: boolean;
  type = 'password';
  type1 = 'password';

  captcha = '';
  captchaValid =false;



  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService,
    @Inject(IAuthenServiceToken) private authService: IAuthenService, private dataService: DataService) {

  }


  ngOnInit(): void {
    this.currentUser = new AccountManViewModel();
    let item = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
    this.currentUser = item.data;
    this.isDisabled = true;
    this.initRandomStr();
  }

  initRandomStr() {
    // return Math.random().toString(36).substr(2, 5);
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    this.captcha = text;
    return text;
  }

  checkPassword() {
    this.user = new LoginViewModel();
    this.user.email = this.currentUser[0].email;
    this.user.password = this.oldPassword;
    this.dataService.Post('account-man/check-login', this.user).subscribe(
      response => {
        if (response.status === 1) {
          this.noti = "Mật khẩu không chính xác";
          setTimeout(() => {
            this.noti = "";
          }, 2000);
          this.isNoti = false;
        }

        if (response.status === 0) {
          this.noti = "Mật khẩu chính xác";
          setTimeout(() => {
            this.noti = "";
          }, 2000);
          this.isNoti = true;
        }
      }
    );
  }

  changePassword() {
    this.account = new AccountManViewModel();
    this.account.accountId = this.currentUser[0].accountId;
    this.account.accountToken = this.currentUser[0].accountToken;
    this.account.accountType = this.currentUser[0].accountType;
    this.account.deviceToken = this.currentUser[0].deviceToken;
    this.account.email = this.currentUser[0].email;
    this.account.fullName = this.currentUser[0].fullName;
    this.account.osType = this.currentUser[0].osType;
    this.account.password = this.newPassword;
    this.account.phoneNumber = this.currentUser[0].phoneNumber;
    this.account.fileAvata = this.currentUser[0].fileAvata;
    this.dataService.Post('account-man/update', this.account).subscribe(
      response => {
        if (response.status === 0) {
          this.toastr.info('Đã đổi mật khẩu thành công!','Thông báo');
        }
        else
        this.toastr.error('Đã xảy ra lỗi...','Thông báo');
      }
    );
  }

  checkLength() {
    if (this.newPassword == null) {
      this.noti1 = "Mật khẩu phải đủ 6 kí tự";
      setTimeout(() => {
        this.noti1 = "";
      }, 2000);
      this.isNoti1 =false;
    }
    else {
      if (this.newPassword.length < 6) {
        this.noti1 = "Mật khẩu phải đủ 6 kí tự";
        setTimeout(() => {
          this.noti1 = "";
        }, 2000);
        this.isNoti1 =false;
      }
      else {
        this.noti1 = "Mật khẩu hợp lệ";
        setTimeout(() => {
          this.noti1 = "";
        }, 2000);
        this.isNoti1 = true;
      }
    }
  }

  checkRefPass() {
    if (this.reconfirmPassword == null) {
      this.noti2 = "Mật khẩu phải đủ 6 kí tự";
      setTimeout(() => {
        this.noti2 = "";
      }, 2000);
      this.isNoti2 =false;
    }
    else {
      if (this.newPassword != this.reconfirmPassword) {
        this.noti2 = "Mật khẩu không trùng khớp";
        setTimeout(() => {
          this.noti2 = "";
        }, 2000);
        this.isNoti2 =false;
      }
      else {
        this.noti2 = "Mật khẩu trùng khớp";
        setTimeout(() => {
          this.noti2 = "";
        }, 2000);
        this.isNoti2 = true;
      }
    }
  }

  checkDisabled() {
    if (this.isNoti == true && this.isNoti1 == true && this.isNoti2 == true && this.captchaValid) {
      return false;
    }
    else {
      return true;
    }
  }
  checkCaptcha(event){
    let str= event.target.value;
    if(str===this.captcha)
      this.captchaValid=true;
    else
    this.captchaValid=false;
    console.log(this.captchaValid);
  }
  save() {
      this.changePassword();
      this.reset();
     
  }
home(){
  this.router.navigate(['/admin/main']);
}
  changeType() {
    if (this.type == 'password') {
      this.type = 'text';
      setTimeout(() => {
        this.type = "password";
      }, 1500);
    }
    else {
      this.type = 'password';
    }
  }

  changeType1() {
    if (this.type1 == 'password') {
      this.type1 = 'text';
      setTimeout(() => {
        this.type1 = "password";
      }, 1500);
    }
    else {
      this.type1 = 'password';
    }
  }

  reset() {
    this.oldPassword = "";
    this.newPassword = "";
    this.reconfirmPassword = "";
    this.code = "";
    this.captchaValid=false;
    this.initRandomStr();
    this.isNoti=false;
    this.isNoti1=false;
    this.isNoti2=false;
  }
}
