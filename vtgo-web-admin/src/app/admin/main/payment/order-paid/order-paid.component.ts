import { Component, OnInit, AfterViewChecked, Inject, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  SearchModel,
  TransactionModel,
  BalanceHisModel,
  IpService,
  IOrderListService,
  IOrderListServiceToken,
  IQuotationService,
  IQuotationServiceToken,
  IHelperService,
  IHelperServiceToken,
  DataService
} from '../../../../core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { OrderCompleteModel } from 'src/app/core/models/ordercomplete.mode';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-paid',
  templateUrl: './order-paid.component.html',
  styleUrls: ['./order-paid.component.scss'],
  providers: [IpService]
})
export class OrderPaidComponent implements OnInit, AfterViewChecked {
  orderState = 0;
  paid: 0;
  message = "Thanh toán đơn hàng";
  paidValid = true;
  orderId = '';
  toShow = 5;
  searchObject: SearchModel;
  orderComplete: OrderCompleteModel;
  listOrder: any;

  quotation: any;
  accountIdGoodOwner = 0;
  goodOwnerName = '';
  currentBalanceGoodOwner = 0;
  //balanceHis
  balanceHis: BalanceHisModel;
  ip: any;

  @ViewChild('orderTable') _orderTable: DatatableComponent;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private dataService: DataService,
    private ipService: IpService,
    private spinner: NgxSpinnerService,
    @Inject(IOrderListServiceToken) private orderListService: IOrderListService,
    @Inject(IHelperServiceToken) private helperService: IHelperService
  ) { }

  ngOnInit() {
    this.initData();

    this.ipService.getIp().subscribe(data => {
      this.ip = data;
      // console.log(data);

    })
  }

  initData(): any {
    this.searchObject = new SearchModel();
    this.search(this.searchObject);
  }

  ngAfterViewChecked() {
    this._orderTable.recalculate();
  }

  openSm(del, id, idGoodOwner) {
    this.orderId = id;
    this.getGoodOwner(idGoodOwner);

    this.getPriceFromQuotation(this.orderId, del, id);

  }

  getPriceFromQuotation(orderId: string, del: any, id: any) {
    this.paid = 0;
    let searhQuo = new SearchModel();
    searhQuo.searchParam = orderId;
    this.orderListService.GetQuotationByOrderId(searhQuo).subscribe(
      response => {
        if (response.data.length != 0) {
          this.quotation = response.data;
          this.paid = this.quotation[0].price;
          //check before Paid 
          this.paid < this.currentBalanceGoodOwner ? this.paidValid = true : this.paidValid = false;

          this.modalService.open(del).result
            .then(
              //Confirm click
              result => {
                this.spinner.show();
                this.orderComplete = new OrderCompleteModel();
                this.orderComplete.message = this.message;
                this.orderComplete.orderId = id;
                this.orderComplete.paid = this.paid;
                if (this.paidValid) {
                  this.orderListService.Complete(this.orderComplete).subscribe(
                    response => {
                      if (response.status === 0) {
                        this.deductGoodOwner(this.paid);
                      }
                      else {
                        this.spinner.hide();
                        this.toastr.error("Đã xảy ra lỗi !", "Thông báo...", {
                          closeButton: true,
                          disableTimeOut: true,
                          tapToDismiss: true
                        });
                      }
                    }
                  );
                } else {
                  this.spinner.hide();
                  this.toastr.warning('Tài khoản chủ hàng không đủ.', 'Thông báo', {
                    disableTimeOut: true,
                    tapToDismiss: true
                  });
                }

              },
              //cancel click
              reason => {
                // alert("No");
              });
        } else {
          this.toastr.error('Đơn hàng không có báo giá.', 'Lỗi dữ liệu');
        }
      },
      error => { }
    );
  }

  getGoodOwner(goodOwnerId) {
    this.dataService.Post('balance/get-by-id', '{"accountId":"' + goodOwnerId + '"}').subscribe(
      response => {
        if (response.data != null) {

          if (response.data.length != 0 && response.data[0].balance[1].Gross != null && response.data[0].balance[1].Consume) {
            this.accountIdGoodOwner = goodOwnerId;
            this.currentBalanceGoodOwner = response.data[0].balance[1].Gross - response.data[0].balance[1].Consume
          }
          else
            this.currentBalanceGoodOwner = 0;
        } else {
          this.toastr.error('Không thể tìm thấy tài khoản chủ hàng.', 'Thông báo lỗi');
        }
      }
    );

    this.dataService.Post('good-owner/get-by-id', '{"accountId":"' + goodOwnerId + '"}').subscribe(
      response => {
        this.goodOwnerName = response.data[0].fullName;
      });
  }

  //trừ tiền G-O

  deductGoodOwner(money) {
    let transGoodOwner = new TransactionModel();
    transGoodOwner.accountId = this.accountIdGoodOwner;
    transGoodOwner.change = -money;
    transGoodOwner.balType = 1;

    this.dataService.Post('balance/transaction', transGoodOwner).subscribe(
      response => {
        if (response.status === 0) {
          console.log("Chủ hàng: " + (-money));
          this.payToAdmin(money);
        } else {
          this.spinner.hide();
          this.toastr.error('Lỗi khi thanh toán tiền chủ hàng.', 'Thông báo', {
            disableTimeOut: true
          });
        }
      }
    );
  }
  //Cộng tiền cho Admin
  payToAdmin(money) {
    let transAdmin = new TransactionModel();
    transAdmin.accountId = 1;
    transAdmin.balType = 1;
    transAdmin.change = money;

    this.dataService.Post('balance/transaction', transAdmin).subscribe(
      response => {
        if (response.status === 0) {
          console.log("Admin: +" + money);
          //Thêm lịch sử Goodowner
          this.addBalanceHis(
            this.accountIdGoodOwner, -money,
            'Thanh toán đơn hàng ' + this.orderComplete.orderId,
            this.currentBalanceGoodOwner,
            this.currentBalanceGoodOwner - money,
            this.ip.ip);
          //admin: accountID = 1
          this.addBalanceHis(1, +money, 'Thanh toán đơn hàng ' + this.orderComplete.orderId, 0, 0, this.ip.ip)
          this.spinner.hide();
          this.toastr.success("Xác nhận thanh toán thành công!", "Thông báo", {
            closeButton: true,
            tapToDismiss: true
          });
          this.search(this.searchObject);
        } else {
          //roolback GoodOwner;
          this.dataService.Post('balance/transaction', transAdmin).subscribe(
            response => {
              if (response.status === 0) {
                this.spinner.hide();
                console.log("Rollback Chủ hàng: +" + (money));
                this.payToAdmin(money);
              }
            });
          this.spinner.hide();
          this.toastr.error('Lỗi khi thanh toán vào tài khoản VTOGO', 'Thông báo', {
            disableTimeOut: true
          });
        }
      }
    );
  }
  //Add history balance 
  addBalanceHis(accountId, money: number, content: string, before: number, after: number, ip) {
    const temp = new Date();
    this.balanceHis = new BalanceHisModel;
    this.balanceHis.accountId = accountId
    this.balanceHis.hisType = "UPDATE_BALANCE";
    this.balanceHis.hisContent = content;
    this.balanceHis.iP = ip;
    this.balanceHis.balanceAfter = after;
    this.balanceHis.balanceBefor = before;
    this.balanceHis.amount = money;
    this.balanceHis.time = temp.getTime();

    this.dataService.Post('balance-his/create', this.balanceHis).subscribe(
      response => {
        if (response.status === 0) {
          // console.log(accountId + 'Đã thêm lịch sử thành công!');
        }
      }
    );
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

  checkTypeNum(event) {
    return event.keyCode >= 48 && event.keyCode <= 57;
  }
  checkNum(event) {
    if (this.paid.toString().length >= 13 || this.paid.toString().length == 0)
      this.paidValid = false;
    else
      this.paidValid = true;
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
      case 2: return 'Đơn hàng chờ vận chuyển, có thay đổi cần xác nhận của chủ xe hoặc lái xe';
      case 3: return 'Đơn chờ vận chuyển chưa bốc hàng còn x ngày (đã được tài xế xác nhận chuyến, đc ký kết)';
      case 4: return 'Đơn chờ vận chuyển đã bốc hàng';
      case 6: return 'Đơn đang chuyển chưa thanh toán';
      case 7: return 'Đơn đang chuyển đã thanh toán';
      case 8: return 'Đơn hàng hoàn thành (đã thanh toán có thể vtgo đang giữ hoặc đã được chuyển tiền còn lại cho chủ hàng và tài xế)';
      case 9: return 'Đơn hàng trạng thái hủy (chủ hàng hủy, lái xe hoặc chủ xe hủy,do hệ thống)';
      case 10: return ' Đơn hàng hết hạn (Hệ thống tự update khi hết hạn)';
      case 11: return ' Đơn hàng bị sự cố (sự cố do lái xe, đang chuyển bị sự cố, quản lý thị trường, hải quan giữ lại …)';
      default:
        return 'Lỗi dữ liệu';
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
