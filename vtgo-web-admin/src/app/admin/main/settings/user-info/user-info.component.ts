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


  isShow = false;
  currentUser: AccountManViewModel;
  fullName = "";
  email = "";
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


  constructor(private location: Location, private dataService: DataService,
    private modalServices: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    @Inject(IAccountServiceToken) private logoutService: IAccountService,
    @Inject(IAuthenServiceToken) private authService: IAuthenService) { }

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
    this.email = this.currentUser[0].email;
  }


  getUrlImg(folder: string) {
    this.imgUrl = this.dataService.GetBaseUrlImg(folder) + '/';
    if (this.currentUser[0].fileAvata !== null) {
      return this.imgUrl + this.currentUser[0].fileAvata;
    } else {
      return `http://placehold.it/50x50`;
    }

  }

  save() {
    this.spinner.show();
    this.account = new AccountManViewModel();
    this.account.accountId = this.currentUser[0].accountId;
    this.account.phoneNumber = this.phoneNumber;
    this.account.email = this.email;

    //reload Avatar from SV
    this.dataService.Post('account-man/get-by-id', { accountId: this.account.accountId }).subscribe(
      (response: any) => {
        localStorage.removeItem(SystemConfig.CURRENT_USER);
        localStorage.setItem(SystemConfig.CURRENT_USER, JSON.stringify(response));
        let item = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
        this.currentUser = item.data;
        this.account.fileAvata = this.currentUser[0].fileAvata;

        this.account.fullName = this.fullName;
        this.dataService.Post('account-man/updateInfo', this.account).subscribe(
          response => {
            if (response.status === 0) {
              this.user = new LoginViewModel();
              this.user.email = this.currentUser[0].email;
              this.user.password = this.currentUser[0].password;
              localStorage.removeItem(SystemConfig.CURRENT_USER);
              this.dataService.Post('account-man/get-by-id', { accountId: this.account.accountId }).subscribe(
                (response2: any) => {
                  localStorage.setItem(SystemConfig.CURRENT_USER, JSON.stringify(response2))
                }
              )
              this.toastr.info('Đã đổi thông tin thành công!');
              this.currentUser[0].fullName = this.fullName;
              this.currentUser[0].phoneNumber = this.phoneNumber;
              this.currentUser[0].email = this.email;
              this.spinner.hide();
              this.isShow = false;
            }
            else {
              this.toastr.error('Đã có lỗi xảy ra!');
            }
          }
        );
      }
    );

  }


  open(ele) {
    this.modalServices
      .open(ele, { size: 'sm' })
  }


  changeShowEdit() {
    this.isShow = !this.isShow;
    this.fullName = this.currentUser[0].fullName;
    this.phoneNumber = this.currentUser[0].phoneNumber;
    this.email = this.currentUser[0].email;
  }
}
