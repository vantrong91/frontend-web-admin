import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { DataService, AccountManViewModel, SystemConfig, IAccountService, IAccountServiceToken, LoginViewModel, IAuthenServiceToken, IAuthenService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<any>();

  public changeAvatar: FormGroup;
  uploaderAVATAR: FileList;
  imgUrl = '';
  imgSrcPre: any;
  keyArr: any;
  currentUser: AccountManViewModel;
  pass: any;
  accountInfo: any;
  user: LoginViewModel;
  @Output() closeForm = new EventEmitter<any>();
  isDisabled = true;

  constructor(private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private dataService: DataService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    @Inject(IAccountServiceToken) private logoutService: IAccountService, @Inject(IAuthenServiceToken) private authService: IAuthenService) {
    this.changeAvatar = this.formBuilder.group({
      fileAvatar: ''
    });
  }

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.currentUser = new AccountManViewModel();
    let item = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
    this.currentUser = item.data;
    this.keyArr = this.currentUser[0].fileAvata;
    this.initImgURL();

  }

  initImgURL() {
    this.imgSrcPre = this.getUrlImg('AVATA') + this.keyArr;
    return this.imgSrcPre;

  }
  selectFile(ev) {
    this.uploaderAVATAR = ev.target.files;
    const fileListAsArray = Array.from(this.uploaderAVATAR);
    this.changeAvatar.value.fileAvatar = '';
    this.changeAvatar.controls.fileAvatar.setValue(fileListAsArray[0].name);

    this.isDisabled = false;
  }

  previewImg(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.imgSrcPre = reader.result;
      }
    }
  }


  uploadFileToServer(data: FileList, type: string) {
    var frmImg = new FormData();
    const fileListAsArray = Array.from(data);
    for (let item of fileListAsArray) {
      frmImg.append('files', item);
    }
    this.dataService.postFile('upload/' + type, frmImg).subscribe(
      response => {      
        if (response.status == 200) {
          this.accountInfo = new AccountManViewModel();
          this.accountInfo.accountId = this.currentUser[0].accountId;
          this.accountInfo.fileAvata = this.changeAvatar.value.fileAvatar;
          this.accountInfo.fullName = this.currentUser[0].fullName;
          this.accountInfo.phoneNumber = this.currentUser[0].phoneNumber;
          this.closeModalEvent.emit(this.accountInfo.fileAvata);
          this.dataService.Post('account-man/updateInfo', this.accountInfo).subscribe(
            response => {
              if (response.status === 0) {
                this.user = new LoginViewModel();
                this.user.email = this.currentUser[0].email;
                this.user.password = this.currentUser[0].password;
                localStorage.removeItem(SystemConfig.CURRENT_USER);
                this.dataService.Post('account-man/get-by-id', { accountId: this.accountInfo.accountId }).subscribe(
                  (response2: any) => {
                    localStorage.setItem(SystemConfig.CURRENT_USER, JSON.stringify(response2))
                  }
                )
                this.toastr.info('Đã đổi ảnh đại diện thành công!');
                this.imgSrcPre = this.getUrlImg('AVATA') + this.changeAvatar.value.fileAvatar;            
                this.spinner.hide();
                this.closeForm.emit();
              }
              else {
                this.toastr.error('Đã có lỗi xảy ra!');
              }
            }
          );
        }
      },
      error => {
        this.toastr.error('Không thể tải lên ảnh đại diện!!!...');
      }
    );
  }

  saveAvatar() {
    this.spinner.show();
    this.uploadFileToServer(this.uploaderAVATAR, 'avatar');    
  }

  getUrlImg(folder: string) {
    this.imgUrl = this.dataService.GetBaseUrlImg(folder) + '/';
    return this.imgUrl;
  }

}
