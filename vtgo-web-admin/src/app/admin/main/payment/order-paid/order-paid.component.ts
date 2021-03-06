import { Component, OnInit, AfterViewChecked, Inject, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  SearchModel,
  TransactionModel,
  ConfigService,
  BalanceHisModel,
  IpService,
  IOrderListService,
  IOrderListServiceToken,
  IQuotationService,
  IQuotationServiceToken,
  IHelperService,
  IHelperServiceToken,
  DataService,
  AdminConstant,
  BalanceModel
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

  message = "";
  authMessage = "Thanh toán đơn hàng {orderId}";
  messageValid = false;

  inputMessBankNumber = '';
  inputMessBankCode = '';
  inputMessOrderId = '';
  inputMessUserCode = '';

  authMessBankNumber = '';
  authMessBankCode = '';
  authMessOrderId = '';
  authMessUserCode = '';

  paidValid = true;
  orderId = '';
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
  //balance Info
  balanceAdmin: BalanceModel;
  balanceGoodOwner: BalanceModel;

  @ViewChild('orderTable') _orderTable: DatatableComponent;

  constructor(
    private configService: ConfigService,
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
    })
  }

  initData(): any {
    this.searchObject = new SearchModel();
    this.search(this.searchObject);
  }

  ngAfterViewChecked() {
    this._orderTable.recalculate();
  }


  search(searchModel: SearchModel) {
    this.orderListService.Get(searchModel).subscribe(
      (response: any) => {
        this.listOrder = response.data;
      },
      error => console.log()
    );
  }

  searchByPressEnter(event) {
    if (event.keyCode == 13)
      this.search(this.searchObject);
  }

  checkInputMessage(event) {
    this.getDataFromInputMessage(event.target.value);

    if (this.message.toLowerCase().trim() !== this.authMessage.toLowerCase().trim()) {
      this.messageValid = false;
    }
    if (this.message.toLowerCase().trim() === this.authMessage.toLowerCase().trim()) {
      this.messageValid = true;
    }
  }
  getDataFromInputMessage(mess) {
    this.inputMessOrderId = mess.slice(mess.indexOf('đơn hàng') + 'đơn hàng'.length, mess.length).trim();
  }

  openSm(del, row) {
    this.message = '';
    this.authMessage = 'Thanh toán đơn hàng {orderId}';
    this.paidValid = false;
    this.messageValid = false;
    this.orderId = row.orderId;
    this.getGoodOwner(row.accountId);

    if (row.bankCode == null || row.bankCode == '')
      this.toastr.error("Phương thức thanh toán hoặc ngân hàng không đúng", "Thông báo", {
        disableTimeOut: true
      });
    //get Transf Content from Server to check before paid
    this.dataService.PostFromOtherURL(this.configService.getConfiguration().URL_GET_TRANF_CONTENT_ODER_PAD,
      `{  "orderId":"` + this.orderId + `",
        "bankCode":"`+ row.bankCode + `"}`).subscribe(response => {
        if (response.data != null)
          if (response.data.length != 0)
            this.authMessage = response.data[0].transferContent;
        if (response.data == null)
          this.toastr.error("Phương thức thanh toán hoặc ngân hàng không đúng", "Thông báo", {
            disableTimeOut: true
          });
        if (response.data.length == 0)
          this.toastr.error("Phương thức thanh toán hoặc ngân hàng không đúng", "Thông báo", {
            disableTimeOut: true
          });
      }, error => console.log()
      );

    this.getPriceFromQuotation(this.orderId, del, row.orderId);

  }
  getBalanceInfo() {
    this.dataService.Post('balance/get-by-id', { accountId: 1 }).subscribe(
      response => {
        if (response.data != null) {
          this.balanceAdmin = response.data[0];
        } else {
          this.toastr.error("Không tìm thấy AttcNumber")
        }
      },
      error => {
        this.toastr.error("Lỗi máy chủ");
      }
    );
    this.dataService.Post('balance/get-by-id', { accountId: this.accountIdGoodOwner }).subscribe(
      response => {
        if (response.data != null) {
          this.balanceGoodOwner = response.data[0];
        } else {
          this.toastr.error("Không tìm thấy AttcNumber")
        }
      },
      error => {
        this.toastr.error("Lỗi máy chủ");
      }
    );
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
                this.orderComplete.message = this.getContentPushFromAuthMess(this.authMessage); //Message content push to Driver;
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
            this.currentBalanceGoodOwner = response.data[0].balance[1].Gross - response.data[0].balance[1].Consume;
            this.getBalanceInfo();
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
    transGoodOwner.content = this.getContentPushFromAuthMess(this.authMessage);

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

  getContentPushFromAuthMess(authMess: string) {
    let mess = authMess.split("_"); // format authMess = ĐH18.12.002.312_US0981234567;
    if (mess != null) {
      if (mess.length > 1)
        return "Thanh toán đơn hàng: " + mess[0] + ". Mã người dùng: " + mess[1];
      else
        return "Thanh toán đơn hàng" + this.orderId;
    }
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
          //Thêm lịch sử admin: accountID = 1
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
    this.balanceHis.amount = money;
    this.balanceHis.hisType = "UPDATE_BALANCE";
    this.balanceHis.hisContent = this.balanceHis.hisType + "|1|" + this.balanceHis.amount + "|" + content;
    this.balanceHis.iP = ip;
    this.balanceHis.balanceAfter = after;
    this.balanceHis.balanceBefor = before;
    this.balanceHis.time = temp.getTime();
    this.balanceHis.fromAcctNumber = this.balanceGoodOwner.balance[1].AcctNumber;
    this.balanceHis.toAcctNumber = this.balanceAdmin.balance[1].AcctNumber;

    this.dataService.Post('balance-his/create', this.balanceHis).subscribe(
      response => {
        if (response.status === 0) {
          // console.log(accountId + 'Đã thêm lịch sử thành công!');
        }
      }
    );
  }

  changeState(state) {
    this.orderState = state;
    this.getComplete(this.orderState);
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
      }
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
      // case 1: return 'Đơn do Chủ hàng tự chỉnh sửa';
      // case 2: return 'Chỉnh sửa do Lái xe báo lỗi đơn hàng không đúng';
      case 3: return 'Đơn chờ vận chuyển chưa bốc hàng còn x ngày (đã được Tài xế xác nhận chuyến, được ký kết)';
      case 4: return 'Đơn chờ vận chuyển đã bốc hàng';
      case 6: return 'Đơn đang chuyển chưa thanh toán';
      case 7: return 'Đơn đang chuyển đã thanh toán';
      case 8: return 'Đơn hàng hoàn thành (đã thanh toán có thể vtgo đang giữ hoặc đã được chuyển tiền còn lại cho Chủ hàng và Tài xế)';
      case 9: return 'Đơn hàng trạng thái hủy (Chủ hàng hủy, Lái xe hoặc chủ xe hủy, do hệ thống)';
      case 10: return 'Đơn hàng hết hạn (Hệ thống tự update khi hết hạn)';
      case 11: return 'Đơn hàng bị sự cố (sự cố do Lái xe, đang chuyển bị sự cố, Quản lý thị trường, Hải quan giữ lại …)';
      default:
        return 'Không xác định';
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
