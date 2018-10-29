import { Component, OnInit, AfterViewChecked, Inject, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  DataService,
  SearchModel,
  IOrderListService,
  IOrderListServiceToken,

  IHelperService,
  IHelperServiceToken
} from '../../../../core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { OrderCompleteModel } from 'src/app/core/models/ordercomplete.mode';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderListComponent implements OnInit, AfterViewChecked {
  imgUrl = '';
  orderState = 0;
  toShow = 5;
  searchObject: SearchModel;
  orderComplete: OrderCompleteModel;
  listOrder: any;

  @ViewChild('orderTable') _orderTable: DatatableComponent;
  toggleExpandRow(row) {
    // this._orderTable.rowDetail.collapseAllRows();
    this._orderTable.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
    // console.log('Detail Toggled', event);
  }
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private dataService: DataService,
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
  getUrlImg(folder: string) {
    this.imgUrl = this.dataService.GetBaseUrlImg(folder) + '/';
    return this.imgUrl;
  }

  changeShow(el) {
    if (el != 0)
      this.toShow = el;
    else
      this.toShow = undefined;
  }

  changeState(state) {
    this.orderState = state;
    this.getComplete(this.orderState);
  }

  search(searchModel: SearchModel) {
    this.orderListService.Get(searchModel).subscribe(
      (response: any) => {
        this.listOrder = response.data;
      },
      error => console.log(error)
    );
  }

  getComplete(state: number) {
    // 1 đã hoành thành; !1 => tất cả;
    this.orderComplete = new OrderCompleteModel();
    this.orderComplete.state = state;
    this.orderListService.GetComplete(this.orderComplete).subscribe(
      (response: any) => {
        this.listOrder = response.data;
      },
      error => console.log(error)
    );
  }

  txtSearch(event) {
    this.orderState = 0;
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
      case 1: return 'Đơn chưa ký kết có báo giá';
      case 2: return 'Đơn bị tài xế hủy báo giá';
      case 3: return 'Đơn chờ vận chuyển chưa bốc hàng còn x ngày hoặc đã ký kết';
      case 4: return 'Đơn chờ vận chuyển đã bốc hàng xong';
      case 5: return 'Đơn chờ vận chuyển bị hết hạn';
      case 6: return 'Đơn đang chuyển chưa thanh toán';
      case 7: return 'Đơn hàng đang chuyển bị sự cố do lái xe';
      case 8: return 'Đơn hàng đã thanh toán';
      case 9: return 'Đơn hàng trạng thái hủy';
      case 10: return 'Đơn hàng đang bị sự cố';
      case 11: return 'Đơn đã ký kết bị tài xế hủy';
      case 12: return 'Đơn khách hàng từ chối báo giá';
      case 13: return 'Đơn đã ký kết bị khách hàng hủy';
      case 16: return 'Đơn hàng đã chuyển chưa thanh toán';
      default:
        return 'Error!';
    }
  }
}
