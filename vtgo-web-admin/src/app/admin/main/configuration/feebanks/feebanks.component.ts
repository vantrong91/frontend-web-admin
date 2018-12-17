import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService, AuthenService, SearchModel } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { FeeViewModel } from 'src/app/core/models/fee.model';

@Component({
  selector: 'app-feebanks',
  templateUrl: './feebanks.component.html',
  styleUrls: ['./feebanks.component.scss']
})
export class FeebanksComponent implements OnInit {

  closeResult: string;
  rows: any;
  searchParam: SearchModel;
  isAdd = false;
  _entityFee: FeeViewModel;

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
    this.dataService.Post('trans-fee/search', search).subscribe(
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

  onAddFeeBank(event) {
    this.dataService.Post('trans-fee/create', event).subscribe(
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
    this.dataService.Post('trans-fee/update', event).subscribe(
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
    this._entityFee = new FeeViewModel();
    this.modalServices
      .open(ele, { size: 'lg' })
      .result.then(
        result => {
          this.closeResult = `Close with: ${result}`;
        },
        reason =>
          (this.closeResult = `Dismissed ${this.getDismissReason(reason)}`)
      );
  }

  getDriver(event) {
    this._entityFee = event;
  }


  private getDismissReason(reason: any) {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with ${reason}`;
    }
  }

  openSm(del, id) {
    this.modalServices.open(del, { size: 'sm' })
      .result.then(
        result => {
          this.closeResult = `Close with: ${result}`;
          this.dataService.Post('trans-fee/delete', { transferId: id }).subscribe(
            result => {
              if (result.status === 0) {
                this.toastr.warning('Đã xóa ngân hàng có mã ngân hàng là:' + id);
                this.loadData();
              } else {
                this.toastr.error('Đã xảy ra lỗi!', 'Cảnh báo');
              }
            }
          );
        },
        reason =>
          (this.closeResult = `Dismissed ${this.getDismissReason(reason)}`)
      );
  }


}
