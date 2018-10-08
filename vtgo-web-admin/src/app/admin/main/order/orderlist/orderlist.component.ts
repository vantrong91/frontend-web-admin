import { Component, OnInit, AfterViewChecked, Inject, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  OrderListViewModel,
  SearchModel,

  IOrderListService,
  IOrderListServiceToken,

  IHelperService,
  IHelperServiceToken
} from '../../../../core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderListComponent implements OnInit, AfterViewChecked {

  toShow = 5;
  searchObject: SearchModel;
  listOrder: any;

  @ViewChild('orderTable') _orderTable: DatatableComponent;
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    // this._orderTable.rowDetail.collapseAllRows();
    this._orderTable.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
    // console.log('Detail Toggled', event);
  }
  constructor(private modalService: NgbModal,
    @Inject(IOrderListServiceToken) private orderListService: IOrderListService,
    @Inject(IHelperServiceToken) private helperService: IHelperService
  ) { }

  ngOnInit() {
    this.initData();
  }

  initData(): any {
    this.searchObject = new SearchModel();
    this.search(this.searchObject);
  }

  ngAfterViewChecked() {
    this._orderTable.recalculate();
  }

  changeShow(el) {
    if(el !== 0){
      this.toShow = el;
    }else{
      this.toShow = undefined;
    }
    
    console.log(this.toShow);
  }

  search(searchModel: SearchModel) {
    this.orderListService.Get(searchModel).subscribe(
      (response: any) => {
        this.listOrder = response.data;
        console.log(this.listOrder);
      },
      error => console.log(error)
    );
  }

  txtSearch(event) {
    let searchVal = event.target.value;
    if (searchVal != null && searchVal.length > 0) {
      console.log(searchVal);
      this.searchObject.searchParam = event.target.value;
      this.search(this.searchObject);
    } else {
      this.searchObject.searchParam = '';
      this.search(this.searchObject);
    }
  }

  getState(state: number) {
    switch (state) {
      case 0: return 'Đơn hàng chưa ký kết, chưa báo giá';
      case 1: return 'Đơn chưa ký kết có báo giá(listQuotation # null)';
      case 2: return 'Đơn bị tài xế hủy báo giá';
      case 3: return 'Đơn chờ vận chuyển chưa bốc hàng còn x ngày hoặc đã ký kết(đã được tài xế xác nhận chuyến)';
      case 4: return 'Đơn chờ vận chuyển đã bốc hàng xong(đang thực hiện)';
      case 5: return 'Đơn chờ vận chuyển bị hết hạn';
      case 6: return 'Đơn đang chuyển chưa thanh toán';
      case 7: return 'Đơn hàng đang chuyển bị sự cố do lái xe';
      case 8: return 'Đơn hàng đã thanh toán';
      case 9: return 'Đơn hàng trạng thái hủy';
      case 10: return 'Đơn hàng đang bị sự cố(quản lý thị trường, hải quan giữ lại …)';
      case 11: return 'Đơn đã ký kết bị tài xế hủy';
      case 12: return 'Đơn khách hàng từ chối báo giá';
      case 13: return 'Đơn đã ký kết bị khách hàng hủy';
      default:
        return 'Error!';
    }
  }
}
