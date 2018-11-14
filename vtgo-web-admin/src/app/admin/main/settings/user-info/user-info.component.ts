import { Component, OnInit, ViewChild, Inject, Output, EventEmitter } from '@angular/core';
import { AccountManViewModel, SystemConfig, DataService, LoginViewModel, IAuthenService, IAccountService, IAccountServiceToken, IAuthenServiceToken } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner'
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private location: Location, private dataService: DataService,
    private modalServices: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    @Inject(IAccountServiceToken) private logoutService: IAccountService,
    @Inject(IAuthenServiceToken) private authService: IAuthenService) { }
  isShowName = false;
  isShowSDT = false;
  currentUser: AccountManViewModel;
  fullName = "";
  phoneNumber = "";
  password = "2";
  fileAvatar: any;
  account: AccountManViewModel;
  imgUrl = '';
  user: LoginViewModel;
  isChangeFullName = true;
  uploaderAvatar: FileList;
  @ViewChild('change') change: any;
  urlFull = '';
  getUrlFromChange: any;

  viewData(event) {
    this.urlFull = this.imgUrl + event;
  }
  
  ngOnInit(): void {
    this.loadData();
    this.urlFull = this.getUrlImg('AVATA');
  }

  loadData() {
    this.currentUser = new AccountManViewModel();
    let item = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
    this.currentUser = item.data;
    this.fullName = this.currentUser[0].fullName;
    this.phoneNumber = this.currentUser[0].phoneNumber;
  }

  saveName() {
    this.spinner.show();
    this.account = new AccountManViewModel();
    this.account.accountId = this.currentUser[0].accountId;
    this.account.accountToken = this.currentUser[0].accountToken;
    this.account.accountType = this.currentUser[0].accountType;
    this.account.deviceToken = this.currentUser[0].deviceToken;
    this.account.email = this.currentUser[0].email;
    this.account.fileAvata = this.currentUser[0].fileAvata;
    this.account.fullName = this.fullName;
    this.account.osType = this.currentUser[0].osType;
    this.account.password = this.password;
    this.account.phoneNumber = this.currentUser[0].phoneNumber;
    this.account.salt = this.currentUser[0].salt;
    this.dataService.Post('account-man/update', this.account).subscribe(
      response => {
        if (response.status === 0) {
          this.user = new LoginViewModel();
          this.user.email = this.account.email;
          this.user.password = this.account.password;
          localStorage.removeItem(SystemConfig.CURRENT_USER);
          this.authService.Login(this.user).subscribe();
          this.toastr.info('Đã đổi họ tên thành công!');
          this.currentUser[0].fullName = this.fullName;
          localStorage.setItem(SystemConfig.CURRENT_USER, JSON.stringify(this.currentUser));

          this.spinner.hide();
          // setTimeout(() => {
          // }, 1000);
        }
        else {
          this.toastr.error('Đã có lỗi xảy ra!');
        }
      }
    );
    this.changeShowName();

  }

  savePhoneNumber() {
    this.spinner.show();
    this.account = new AccountManViewModel();
    this.account.accountId = this.currentUser[0].accountId;
    this.account.accountToken = this.currentUser[0].accountToken;
    this.account.accountType = this.currentUser[0].accountType;
    this.account.deviceToken = this.currentUser[0].deviceToken;
    this.account.email = this.currentUser[0].email;
    this.account.fileAvata = this.currentUser[0].fileAvata;
    this.account.fullName = this.currentUser[0].fullName;
    this.account.phoneNumber = this.phoneNumber;
    this.account.osType = this.currentUser[0].osType;
    this.account.password = this.password;
    this.account.salt = this.currentUser[0].salt;
    this.dataService.Post('account-man/update', this.account).subscribe(
      response => {
        if (response.status === 0) {
          localStorage.removeItem(SystemConfig.CURRENT_USER);
          this.user = new LoginViewModel();
          this.user.email = this.account.email;
          this.user.password = this.account.password;
          this.authService.Login(this.user).subscribe((item: any) => {
          })
          this.currentUser[0].phoneNumber = this.phoneNumber;
          this.toastr.info('Đã đổi số điện thoại thành công!');
          this.spinner.hide();
        }
        else {
          this.toastr.error('Đã có lỗi xảy ra!');
        }
      }
    );
    this.changeShowSDT();
  }

  checkPassword() {
    this.user = new LoginViewModel();
    this.user.email = this.currentUser[0].email;
    this.user.password = this.password;
    this.dataService.Post('account-man/check-login', this.user).subscribe(
      response => {
        if (response.status === 1) {
          this.toastr.error('Mật khẩu không chính xác');
        }
        if (response.status === 0) {
          if (this.isChangeFullName == true) {
            this.saveName();
          } else {
            this.savePhoneNumber();
          }
        }
      }
    );
  }

  checkPassword1() {
    this.user = new LoginViewModel();
    this.user.email = this.currentUser[0].email;
    this.user.password = this.password;
    this.dataService.Post('account-man/check-login', this.user).subscribe(
      response => {
        if (response.status === 1) {
          this.toastr.error('Mật khẩu không chính xác');
        }
        if (response.status === 0) {
          this.open(this.change);
        }
      }
    );
  }

  getUrlImg(folder: string) {
    this.imgUrl = this.dataService.GetBaseUrlImg(folder) + '/';
    if (this.currentUser[0].fileAvata !== null) {
      return this.imgUrl + this.currentUser[0].fileAvata;
    } else {
      return `http://placehold.it/50x50`;
    }

  }


  open(ele) {
    this.modalServices
      .open(ele, { size: 'sm' })
  }


  changeShowName() {
    this.isShowName = !this.isShowName;
  }

  changeShowSDT() {
    this.isShowSDT = !this.isShowSDT;
  }

}
