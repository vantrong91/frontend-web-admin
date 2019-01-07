import { Component, OnInit, Inject } from '@angular/core';
import { AccountViewModel, IAccountServiceToken, IAccountService, IHelperServiceToken, IHelperService, SearchModel, AccountTypeConstant } from '../../../../core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  listAccount: any;
  searhObject: SearchModel;
  _entity: AccountViewModel;
  isShow = false;
  txtNoti = '';
  idDelete = null;
  isAdd = true;

  constructor(private modalService: NgbModal,
    private toast: ToastrService,
    @Inject(IAccountServiceToken) private accountService: IAccountService,
    @Inject(IHelperServiceToken) private helperService: IHelperService) { }
  open(content, accountInfo?) {
    this._entity = new AccountViewModel;
    if (accountInfo != null) {
      this._entity = accountInfo;
    }
    this.modalService.open(content, { size: 'lg' });
  }
  openSm(del, data) {
    this.idDelete = data.accountId;
    let accountDel = new AccountViewModel();
    accountDel.accountId = this.idDelete;
    this.modalService.open(del, { size: 'sm' }).result.then(
      result => {
        this.accountService.Delete(accountDel).subscribe(
          response => {
            if (response.status == 0) {
              this.initData();
              this.toast.success("Đã xóa tài khoản " + this.idDelete, "Thông báo");
            } else {
              this.toast.error("Xin vui lòng thử lại", "Đã xảy ra lỗi");
            }
          }
        );
      },
      reason => { }
    );
  }
  view(accountId, content) {

  }
  ngOnInit() {
    this.initData();
  }

  initData() {
    this.searhObject = new SearchModel();
    this.searhObject.searchParam = '';
    this.search(this.searhObject);
  }

  search(search) {
    this.accountService.Get(search).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.listAccount = response.data;
        }
      },
      error => {

      }
    )
  }
  searchByPressEnter(event) {
    if (event.keyCode == 13)
      this.search(this.searhObject);
  }

  accounTypeChange(event) {
    this.searhObject.searchParam2 = event.target.value;
    this.search(this.searhObject);
  }

  onAddAccount(event) {
    this._entity = event;
    this.accountService.Create(this._entity).subscribe((response: any) => {
      if (response.status === 0) {
        this.initData();
        this.toast.success("Tạo tài khoản thành công!", "Thông báo");
      } else {
        this.toast.error("Không thể tạo tài khoản..", "Đã xảy ra lỗi");
      }
    })
  }

  onEditAccount(event) {
    let accountChangeState = new AccountViewModel();
    accountChangeState.accountId = event.accountId;
    accountChangeState.state = event.state;

    console.log(accountChangeState);
    this.accountService.ChangeState(accountChangeState).subscribe(
      response => {
        if (response.status === 0) {
          this.initData();
          this.toast.success("Cập nhật thành công!", "Thông báo");
        } else {
          this.toast.error("Xin vui lòng thử lại", "Đã xảy ra lỗi");
        }
      },
      error => {
      }
    );
  }

  getState(state) {
    switch (state) {
      case 0: return 'Chưa xác nhận';
      case 1: return 'Đang hoạt động';
      case 2: return 'Bị khóa';
      case 3: return 'Hết hạn';
      default: return 'Không xác định';
    }
  }
}
