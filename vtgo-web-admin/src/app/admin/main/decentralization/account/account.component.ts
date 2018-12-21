import { Component, OnInit, Inject } from '@angular/core';
import { AccountViewModel, IAccountServiceToken, IAccountService, IHelperServiceToken, IHelperService, SearchModel, AccountTypeConstant } from '../../../../core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private modalService: NgbModal,
    private toast: ToastrService,
    @Inject(IAccountServiceToken) private accountService: IAccountService,
    @Inject(IHelperServiceToken) private helperService: IHelperService) { }
  open(content) {
    this._entity = new AccountViewModel;
    this.modalService.open(content, { size: 'lg' });
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

  onSubmit(event) {
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
}
