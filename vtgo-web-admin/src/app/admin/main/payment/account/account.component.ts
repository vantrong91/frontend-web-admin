import { Component, OnInit, Inject } from '@angular/core';
import { AccountViewModel, IAccountServiceToken, IAccountService, IHelperServiceToken, IHelperService, SearchModel } from '../../../../core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  listAccount: any;
  searchObject: SearchModel;
  searchParam: ' ';
  _entity: AccountViewModel;
  isShow = false;
  txtNoti = '';

  constructor(private modalService: NgbModal,
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
    let search = '{}';
    this.search(search);
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
      this.search(`{"searchParam":"` + event.target.value + `"}`);
  }

  onSubmit(event) {
    this._entity = event;
    this.accountService.Create(this._entity).subscribe((response: any) => {
      if (response.status === 0) {
        this.initData();
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 2500);
        this.txtNoti = 'Thêm thành công tài khoản ' + this._entity.fullName;
      } else {
        this.txtNoti = 'Xảy ra lỗi. Xin vui lòng thử lại';
      }
    })
  }
}
