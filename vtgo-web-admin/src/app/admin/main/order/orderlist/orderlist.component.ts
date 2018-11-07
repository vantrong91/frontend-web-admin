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
  orderState = 0;
  toShow = 5;
  searchObject: SearchModel;
  orderComplete: OrderCompleteModel;
  listOrder: any;

  imgUrl = '';
  ulrImgFull = '';
  imgName = '';



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

  openImg(ele, imgUrl, fileName) {
    this.ulrImgFull = imgUrl + fileName;
    this.imgName = fileName;
    this.modalService
      .open(ele, { windowClass: 'dark-modal', size: 'lg' });
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
      case 0: return 'Đơn hàng chưa ký kết (có báo giá nếu có dữ liệu báo giá, không có báo giá nếu không có dữ liệu)';
      case 3: return 'Đơn chờ vận chuyển chưa bốc hàng còn x ngày (đã được tài xế xác nhận chuyến, đc ký kết)';
      case 4: return 'Đơn chờ vận chuyển đã bốc hàng';
      case 6: return 'Đơn đang chuyển chưa thanh toán';
      case 7: return 'Đơn hàng đã chuyển chưa thanh toán';
      case 8: return 'Đơn hàng đã thanh toán do ví vtgopay đang giữ';
      case 810: return 'Đơn hàng đã thanh toán đã chuyển tiền còn lại cho chủ hàng';
      case 801: return 'Đơn hàng đã thanh toán đã chuyển tiền còn lại cho lái xe';
      case 811: return 'Đơn hàng đã thanh toán đã chuyển tiền còn lại cho lái xe và chủ hàng';
      case 9: return 'Đơn hàng trạng thái hủy (chủ hàng hủy, lái xe hoặc chủ xe hủy,do hệ thống)';
      case 10: return 'Đơn hàng hết hạn (Hệ thống tự update khi hết hạn)';
      case 11: return 'Đơn hàng bị sự cố (sự cố do lái xe, đang chuyển bị sự cố, quản lý thị trường, hải quan giữ lại …)';

      default:
        return 'Error!';
    }
  }
}
