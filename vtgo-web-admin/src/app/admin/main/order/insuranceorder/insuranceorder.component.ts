import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IInsuranceOrderServiceToken, IInsuranceOrderService, IHelperServiceToken, IHelperService, SearchModel, InsuOrderViewModel } from '../../../../core';

@Component({
  selector: 'app-insuranceorder',
  templateUrl: './insuranceorder.component.html',
  styleUrls: ['./insuranceorder.component.scss']
})
export class InsuranceorderComponent implements OnInit {

  listInsuranceOrder: any;
  searchObject: SearchModel;
  _entity: InsuOrderViewModel;
  isShow = false;
  txtNoti = '';
  message = 'Yêu cầu xác nhận thanh toán bảo hiểm';
  constructor(private modalService: NgbModal,
    @Inject(IInsuranceOrderServiceToken) private insuOrderService: IInsuranceOrderService,
    @Inject(IHelperServiceToken) private helperService: IHelperService) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.searchObject = new SearchModel();
    this.search(this.searchObject);
  }

  search(search: SearchModel) {
    this.insuOrderService.Get(search).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.listInsuranceOrder = response.data;
        }
      },
      error => {

      }
    );
  }

  edit(row, content) {
    this._entity = new InsuOrderViewModel();
    this._entity = row;
    this.modalService.open(content, { size: 'lg' });
  }

  onEditInsuOrder(event) {
    this._entity = event;
    this._entity.message = this.message;
    this.insuOrderService.Complete(this._entity).subscribe(
      (response: any) => {

        if (response.status === 0) {
          this.initData();
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 3000);
          this.txtNoti = 'Sửa thành công đơn hàng có mã: ' + response.data[0].orderId;
        } else {
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
          this.txtNoti = 'Có lỗi xảy ra! Xin thử lại';
        }
      }
    )
  }

}
