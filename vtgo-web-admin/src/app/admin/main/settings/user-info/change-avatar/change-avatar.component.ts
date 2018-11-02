import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { DataService, AccountManViewModel, SystemConfig, IAccountService, IAccountServiceToken, LoginViewModel, IAuthenServiceToken, IAuthenService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent implements OnInit {

  public changeAvatar: FormGroup;
  uploaderAVATAR: FileList;
  imgUrl = '';
  keyArr: any;
  currentUser: AccountManViewModel;
  account: AccountManViewModel;
  pass: any;
  user: LoginViewModel;
  @Output() closeForm = new EventEmitter<any>();
  isDisabled = true;

  @Input() set password(password: any) {
    this.pass = password;

  };

  constructor(private location: Location, private router: Router, private formBuilder: FormBuilder, private modalService: NgbModal, private dataService: DataService, private toastr: ToastrService, @Inject(IAccountServiceToken) private logoutService: IAccountService, @Inject(IAuthenServiceToken) private authService: IAuthenService) {
    this.changeAvatar = this.formBuilder.group({
      fileAvatar: this.formBuilder.group({
        AVATA: new FormControl('')
      })
    });
  }

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.currentUser = new AccountManViewModel();
    let item = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
    this.currentUser = item.data;
    this.keyArr = Object.values(this.currentUser[0].fileAvata);
  }

  selectFile(ev, type: string) {
    this.uploaderAVATAR = ev.target.files;
    const fileListAsArray = Array.from(this.uploaderAVATAR);
    this.changeAvatar.value.fileAvatar.AVATA = [];
    for (let item of fileListAsArray) {
      this.changeAvatar.controls.fileAvatar.value.AVATA.push(item.name);
    }
    this.isDisabled = false;
  }

  uploadFileToServer(data: FileList, type: string) {
    var frmImg = new FormData();
    const fileListAsArray = Array.from(data);
    for (let item of fileListAsArray) {
      frmImg.append('files', item);
    }
    this.dataService.postFile('upload/' + type, frmImg).subscribe(
      response => {
      }
    );
  }

  saveAvatar() {
     this.uploadFileToServer(this.uploaderAVATAR, 'avatar');
    this.account = new AccountManViewModel();
    this.account.accountId = this.currentUser[0].accountId;
    this.account.accountToken = this.currentUser[0].accountToken;
    this.account.accountType = this.currentUser[0].accountType;
    this.account.deviceToken = this.currentUser[0].deviceToken;
    this.account.email = this.currentUser[0].email;
    this.account.fileAvata = this.changeAvatar.value.fileAvatar;
    this.account.fullName = this.currentUser[0].fullName;
    this.account.osType = this.currentUser[0].osType;
    this.account.password = this.pass;
    this.account.phoneNumber = this.currentUser[0].phoneNumber;
    this.account.salt = this.currentUser[0].salt;
    this.dataService.Post('account-man/update', this.account).subscribe(
      response => {
        if (response.status === 0) {
          localStorage.removeItem(SystemConfig.CURRENT_USER);
          this.user = new LoginViewModel();
          this.user.email = this.account.email;
          this.user.password = this.account.password;
          this.authService.Login(this.user).subscribe((item: any) => {
            this.pageRefresh();
            this.toastr.info('Đã đổi ảnh đại diện thành công!');
          })
        }
        else {
          this.toastr.error('Đã có lỗi xảy ra!');
        }
      }
    );
    this.closeForm.emit();

  }

  pageRefresh() {
    location.reload();
  }


  getUrlImg(folder: string) {
    this.imgUrl = this.dataService.GetBaseUrlImg(folder) + '/';
    return this.imgUrl;
  }

}
