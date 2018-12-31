import { Component, OnInit } from '@angular/core';
import { SearchModel, DataService, AuthenService } from 'src/app/core';
import { BankAdminModel } from 'src/app/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank-admin',
  templateUrl: './bank-admin.component.html',
  styleUrls: ['./bank-admin.component.scss']
})
export class BankAdminComponent implements OnInit {



  rows: any;
  searchParam: SearchModel;
  isAdd = false;
  _entity: BankAdminModel;

  constructor(
    private modalServices: NgbModal,
    private dataService: DataService,
    private authenServices: AuthenService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.searchParam = new SearchModel();
    this.searchParam.searchParam = '';
    this.search(this.searchParam);
  }


  search(search) {
    this.dataService.Post('bank/search-bank-ad', search).subscribe(
      response => {
        if (response.status === 200) {
          this.rows = response.data;
        }
      }
    );
  }

  searchByPressEnter(event) {
    if (event.keyCode == 13)
      this.search(this.searchParam);
  }

  getBankAd(event) {
    this._entity = event;
  }
  onAddFeeBank(event) {
    this.dataService.Post('bank/create-bank-ad', event).subscribe(
      response => {
        if (response.status === 0) {
          this.toastr.success('Đã thêm thành công ngân hàng!');
          this.loadData();
        }
        else {
          this.toastr.error('đã có lỗi xảy ra', 'Cảnh báo');
        }
      }
    );
  }

  onEditFeeBank(event) {
    this.dataService.Post('bank/update-bank-ad', event).subscribe(
      response => {
        if (response.message === "Successful") {
          this.loadData();
          this.toastr.info("Chỉnh sửa thành công!", "Thông báo...");
        }
        else {
          this.toastr.clear();
          this.toastr.error("Đã xảy ra lỗi. Xin vui lòng thử lại", "Thông báo...");
        }
      }
    );
  }

  open(ele) {
    this._entity = new BankAdminModel();
    this.modalServices
      .open(ele, { size: 'lg' })
      .result.then(
        result => {
        },
        reason => { }
      );
  }


  openSm(del, id) {
    this.modalServices.open(del, { size: 'sm' })
      .result.then(
        result => {
          this.dataService.Post('bank/delete-bank-ad', { bankCode: id }).subscribe(
            result => {
              if (result.status === 0) {
                this.toastr.warning('Đã xóa ngân hàng mã ' + id);
                this.loadData();
              } else {
                this.toastr.error('Đã xảy ra lỗi!', 'Cảnh báo');
              }
            }
          );
        },
        reason => { });
  }

}
