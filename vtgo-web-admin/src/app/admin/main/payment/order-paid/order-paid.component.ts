import { Component, OnInit, AfterViewChecked, Inject, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  SearchModel,

  IOrderListService,
  IOrderListServiceToken,

  IHelperService,
  IHelperServiceToken
} from '../../../../core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { OrderCompleteModel } from 'src/app/core/models/ordercomplete.mode';

@Component({
  selector: 'app-order-paid',
  templateUrl: './order-paid.component.html',
  styleUrls: ['./order-paid.component.scss']
})
export class OrderPaidComponent implements OnInit, AfterViewChecked {
  orderState = 0;
  paid: number;
  message = "Thanh toán đơn hàng";
  paidValid = true;
  orderId = 0;
  toShow = 5;
  searchObject: SearchModel;
  orderComplete: OrderCompleteModel;
  listOrder: any;

  @ViewChild('orderTable') _orderTable: DatatableComponent;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
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

  openSm(del, id) {
    this.orderId = id;
    this.modalService.open(del).result
      .then(result => {
        this.orderComplete = new OrderCompleteModel();
        this.orderComplete.message = this.message;
        this.orderComplete.orderId = id;
        this.orderComplete.paid = this.paid;

        this.orderListService.Complete(this.orderComplete).subscribe(
          response => {
            console.log(response);
            if (response.status === 0) {
              this.toastr.success("Đơn hàng: " + id, "Xác nhận thanh toán thành công!", {
                closeButton: true,
                tapToDismiss: true
              });
              this.search(this.searchObject);
            }
            else {
              this.toastr.error("Đã xảy ra lỗi !", "Thông báo...", {
                closeButton: true,
                disableTimeOut: true,
                tapToDismiss: true
              });
            }
          }
        );

      },
        reason => {
          // alert("No");
        });
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
        // console.log(this.listOrder);
      },
      error => console.log(error)
    );
  }

  checkTypeNum(event) {
    return event.keyCode >= 48 && event.keyCode <= 57;
  }
  checkNum(event) {
    if (this.paid.toString().length >= 13 || this.paid.toString().length == 0)
      this.paidValid = false;
    else
      this.paidValid = true;
    console.log(this.paidValid);
  }

  getComplete(state: number) {
    // 1 đã hoành thành; !1 => tất cả;
    this.orderComplete = new OrderCompleteModel();
    this.orderComplete.state = state;
    this.orderListService.GetComplete(this.orderComplete).subscribe(
      (response: any) => {
        this.listOrder = response.data;
        console.log(this.listOrder);
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



  numToVND() {



    let t = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"],
      r = function (r, n) {
        let o = "", a = Math.floor(r / 10), e = r % 10;
        return a > 1 ? (o = " " + t[a] + " mươi", 1 == e && (o += " mốt")) : 1 == a ? (o = " mười", 1 == e && (o += " một")) : n && e > 0 && (o = " lẻ"), 5 == e && a >= 1 ? o += " lăm" : 4 == e && a >= 1 ? o += " tư" : (e > 1 || 1 == e && 0 == a) && (o += " " + t[e]), o
      },
      n = function (n, o) {
        let a = "", e = Math.floor(n / 100);
        n = n % 100;
        return o || e > 0 ? (a = " " + t[e] + " trăm", a += r(n, !0)) : a = r(n, !1), a
      }, o = function (t, r) {
        let o = "", a = Math.floor(t / 1e6);
        t = t % 1e6;
        a > 0 && (o = n(a, r) + " triệu", r = !0);
        let e = Math.floor(t / 1e3);
        t = t % 1e3;
        return e > 0 && (o += n(e, r) + " ngàn", r = !0), t > 0 && (o += n(t, r)), o
      };
    return {
      doc: function (r) {
        if (0 == r) return t[0];
        let n = "", a = "";
        do {
          let ty = r % 1e9;
          r = Math.floor(r / 1e9);
          n = r > 0 ? o(ty, !0) + a + n : o(ty, !1) + a + n, a = " tỷ";
        }
        while (r > 0);
        let rs = n.trim();
        return rs.charAt(0).toUpperCase() + rs.slice(1) + " đồng";
      }
    }
  }

}
