import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BalanceModel, SearchModel, DataService, AccountViewModel, AdminConstant, ConfigService } from 'src/app/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountManViewModel } from 'src/app/core/models/accountMan.model';
import { BalanceHisModel } from 'src/app/core/models/balanceHis.model';
import { TransactionModel } from 'src/app/core/models/transaction.model';
import { ToastrService } from 'ngx-toastr';
import { IpService } from './ip.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  providers: [IpService]
})
export class ExchangeComponent implements OnInit {
  public exchangeForm: FormGroup;


  _entityBalance: BalanceModel;
  searchParam: SearchModel;
  Arr = [];
  Arrbank = [];
  ArrBalance = [];
  accounts: AccountViewModel;
  closeResult = "";
  balanceHisId: AccountManViewModel;
  balanceHisList: BalanceHisModel;
  balanceHis: BalanceHisModel;
  transaction: any;
  listBank: any;

  isShow = false;
  isWithdrawal = true;
  ip: any = {};

  bankName = '-- Chọn ngân hàng --';
  fee = 0;
  linkBanking = '';

  hisContent = '';
  widrawalContent = '';

  //balance Info
  balanceAdmin: BalanceModel;
  balanceUser: BalanceModel;

  //Xác nhận giao dịch
  codeTranferFromSV = null;
  currentAccountId: number;
  currentAccountBankCode: string;

  public reconfirmForm: FormGroup;
  temp: any;

  constructor(
    private configService: ConfigService,
    private modalServices: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private ipService: IpService) {
    this.reconfirmForm = this.formBuilder.group({
      acctNumber: new FormControl('', Validators.required),
      transferAmount: new FormControl('', Validators.required),
      inputCode: new FormControl('', Validators.required)
    });
  }


  @Input() set balanceModel(balance: BalanceModel) {
    this._entityBalance = balance;
  }
  @Input() set accountManModel(accountManModel: AccountManViewModel) {
    this.balanceHisId = accountManModel;

  }

  @Output() closeForm = new EventEmitter<any>();

  ngOnInit() {
    let search = '{}';
    this.getBalanceById(this._entityBalance);
    this.search();
    this.getBalanceHisById();
    this.getBanklist(search);
    this.ipService.getIp().subscribe(data => {
      this.ip = data;
    });
  }

  search() {
    this.dataService.Post('account-man/get-by-id', this.balanceHisId).subscribe(
      response => {
        if (response.status === 0) {
          this.accounts = response.data;
          this.Arr = Object.values(this.accounts);
          if (response.data.length != 0) {
            this.currentAccountId = response.data[0].accountId;
            this.currentAccountBankCode = response.data[0].bankCodeTran;
            this.getTransCodeFromSV();

          }
        }
      }
    );
  }

  getTransCodeFromSV() {
    let objPost = {
      accountId: this.currentAccountId,
      bankCode: this.currentAccountBankCode
    };
    this.dataService.PostFromOtherURL(this.configService.getConfiguration().URL_GET_TRANF_CONTENT_PAYMENT, objPost).subscribe(
      response => {
        if (response.data == null) {
          this.codeTranferFromSV = null;
          this.toastr.error(response.resultText, 'Thông báo', {
            disableTimeOut: true
          })
        }
        else
          if (response.data.length > 0) {
            this.codeTranferFromSV = response.data[0].codeTranfer;
          }
      }
    )
  }


  changeWithDrawalContent(event) { //to get WithDrawalContent from textarea
    this.widrawalContent = event.target.value;
  }
  getBanklist(search) {
    this.dataService.Post('trans-fee/connected', search).subscribe(
      response => {
        if (response.status === 200) {
          this.listBank = response.data;
        }
      }
    );
  }


  getBalanceHisById() {
    this.dataService.Post('balance-his/get-by-acc-id', this.balanceHisId).subscribe(
      response => {
        if (response.status === 0) {
          this.balanceHisList = response.data;
        }
      }
    );
  }


  getBalanceById(balanceById: BalanceModel) {
    this.dataService.Post('balance/get-by-id', balanceById).subscribe(
      response => {
        if (response.status === 0) {
          this._entityBalance = response.data;
          if (this._entityBalance === null) {
            this.toastr.error("Không tìm thấy lịch sử giao dịch", "Thông báo");
            this.closeForm.emit();
          } else {
            this.ArrBalance = Object.values(this._entityBalance[0].balance);
            this.getBalanceInfo();
          }
        }
      }
    );
  }

  getBalanceInfo() {
    //get balance admin
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
    //get balance người nộp hoặc trừ tiền
    this.dataService.Post('balance/get-by-id', { accountId: this.balanceHisId.accountId }).subscribe(
      response => {
        if (response.data != null) {
          this.balanceUser = response.data[0];
        } else {
          this.toastr.error("Không tìm thấy AttcNumber")
        }
      },
      error => {
        this.toastr.error("Lỗi máy chủ");
      }
    );
  }

  getCurrentBalanceUser() {
    if (this.balanceUser != null)
      return this.balanceUser.balance[1].Gross - this.balanceUser.balance[1].Consume - this.balanceUser.balance[1].Reserve;
    else
      return 0;
  }

  // bankChanged(event) {
  //   this.Arrbank = Object.values(this.listBank);
  //   console.log(this.Arrbank);

  //   for (var _i = 0; _i < this.Arrbank.length; _i++) {
  //     if (this.Arrbank[_i].transferId == event.target.value) {
  //       this.fee = this.Arrbank[_i].fee;
  //       this.linkBanking = this.Arrbank[_i].linkIB;
  //     }
  //   }
  // }

  bankChange(event) {
    this.fee = event.fee;
    this.linkBanking = event.linkIB;
    this.bankName = event.bankName;
  }

  withdrawal() {

    //check số dư toàn khoản
    let balanceNotEnought = this.getCurrentBalanceUser() < (this.fee + this.reconfirmForm.get("transferAmount").value);
    if (balanceNotEnought) {
      this.toastr.error("Số dư tài khoản không đủ", "Thông báo!", { disableTimeOut: true });
    } else {
      // this.closeForm.emit();
      this.transaction = new TransactionModel;
      const num1 = parseInt(this.reconfirmForm.value.transferAmount);
      const num2 = this.fee;
      this.transaction.accountId = this.balanceHisId.accountId;
      this.transaction.balType = 1;
      this.transaction.change = -(num1 + num2);
      this.transaction.content = this.widrawalContent;
      this.dataService.Post('balance/transaction', this.transaction).subscribe(
        response => {
          if (response.status === 0) {
            //Cộng tiền vào Admin
            let admin = new TransactionModel();
            admin.accountId = 1;
            admin.balType = 1;
            admin.content = this.widrawalContent + " => Account " + this.balanceHisId.accountId;
            admin.change = -this.transaction.change;
            this.dataService.Post('balance/transaction', admin).subscribe(
              response => {
                if (response.status === 0) {
                  this.toastr.success('Đã chuyển tiền thành công', 'Thông báo');
                  this.addBalanceHis();
                } else {
                  //roolbak account đã trừ
                  this.transaction.change = (num1 + num2);
                  this.transaction.content = "[Roolback] " + this.widrawalContent;
                  this.dataService.Post('balance/transaction', this.transaction).subscribe();

                  this.toastr.error('Cộng tiền vào Admin VTGO lỗi', 'Thông báo', {
                    disableTimeOut: true
                  });
                }
              }
            );
          }
          else {
            this.toastr.error('Chuyển tiền lỗi!', 'Cảnh báo');
          }
        }
      );
    }

  }

  payment() {
    //check codeTran trước khi nạp tiền
    if (this.reconfirmForm.get('transferAmount').value > 0) {
      let inputCodeTrans = this.reconfirmForm.get('inputCode').value;
      if (inputCodeTrans === this.codeTranferFromSV) {
        this.transaction = new TransactionModel;
        const num1 = parseInt(this.reconfirmForm.value.transferAmount);
        const num2 = this.fee;
        this.transaction.accountId = this.balanceHisId.accountId;
        this.transaction.balType = 1;
        this.transaction.content = this.hisContent;
        this.transaction.change = (num1 - num2);
        this.dataService.Post('balance/transaction', this.transaction).subscribe(
          response => {
            if (response.status === 0) {
              this.toastr.success('Nộp tiền thành công', 'Thông báo');
              this.addBalanceHisPayment();
            }
            else {
              this.toastr.error('Lỗi cộng tiền!', 'Cảnh báo');
            }
          }
        );
        this.closeForm.emit();
      } else {
        this.toastr.error("Mã xác nhận không đúng. \nXin vui lòng thử lại", "Thông báo", {
          disableTimeOut: true
        })
      }
    } else
      this.toastr.error("Số tiền không hợp lệ!", 'Thông báo', { disableTimeOut: true });

  }

  changeShow() {
    this.isShow = true;
  }

  //Thêm lịch sử trừ tiền người dùng
  addBalanceHis() {
    const temp = new Date();
    this.balanceHis = new BalanceHisModel;
    this.balanceHis.accountId = this.Arr[0].accountId;
    this.balanceHis.hisType = "UPDATE_BALANCE";
    this.balanceHis.amount = this.transaction.change;
    this.balanceHis.hisContent = this.balanceHis.hisType + "|1|" + this.balanceHis.amount + "|" + this.widrawalContent;
    this.balanceHis.iP = this.ip.ip;
    this.balanceHis.balanceBefor = (this.ArrBalance[0].Gross - this.ArrBalance[0].Consume - this.ArrBalance[0].Reserve);
    this.balanceHis.balanceAfter = (this.balanceHis.balanceBefor - this.reconfirmForm.value.transferAmount - this.fee);
    this.balanceHis.time = temp.getTime();
    this.balanceHis.fromAcctNumber = this.balanceUser.balance[1].AcctNumber;
    this.balanceHis.toAcctNumber = this.balanceAdmin.balance[1].AcctNumber;

    this.dataService.Post('balance-his/create', this.balanceHis).subscribe(
      response => {
        if (response.status === 0) {
          this.addBalanceHisAdmin()
          // this.toastr.success('Đã thêm lịch sử thành công', 'Thông báo');
        }
        else {
          this.toastr.error('Lịch sử rút xảy ra lỗi!', 'Cảnh báo');
        }
      }
    );
  }
  addBalanceHisAdmin() {
    const temp = new Date();
    this.balanceHis = new BalanceHisModel;
    this.balanceHis.accountId = AdminConstant.ACCOUNT_ID;
    this.balanceHis.hisType = "UPDATE_BALANCE";
    this.balanceHis.amount = -this.transaction.change;
    this.balanceHis.hisContent = this.balanceHis.hisType + "|1|" + this.balanceHis.amount + "|" + this.widrawalContent;
    this.balanceHis.iP = this.ip.ip;
    this.balanceHis.balanceBefor = (this.balanceAdmin.balance[1].Gross - this.balanceAdmin.balance[1].Consume - this.balanceAdmin.balance[1].Reserve);
    this.balanceHis.balanceAfter = (this.balanceHis.balanceBefor + this.reconfirmForm.value.transferAmount - this.fee);
    this.balanceHis.time = temp.getTime();
    this.balanceHis.fromAcctNumber = this.balanceUser.balance[1].AcctNumber;
    this.balanceHis.toAcctNumber = this.balanceAdmin.balance[1].AcctNumber;

    this.dataService.Post('balance-his/create', this.balanceHis).subscribe(
      response => {
        if (response.status === 0) {
          // this.toastr.success('Đã thêm lịch sử thành công', 'Thông báo');
        }
        else {
          this.toastr.error('Lịch sử rút xảy ra lỗi!', 'Cảnh báo');
        }
      }
    );
  }

  //Thêm lịch sử nộp tiền người dùng
  addBalanceHisPayment() {
    const temp = new Date();
    this.balanceHis = new BalanceHisModel;
    this.balanceHis.accountId = this.Arr[0].accountId;
    this.balanceHis.hisType = "UPDATE_BALANCE";
    this.balanceHis.amount = this.transaction.change;
    this.balanceHis.hisContent = this.balanceHis.hisType + "|1|" + this.balanceHis.amount + "|" + this.hisContent;
    this.balanceHis.iP = this.ip.ip;
    this.balanceHis.balanceBefor = (this.ArrBalance[0].Gross - this.ArrBalance[0].Consume - this.ArrBalance[0].Reserve);
    this.balanceHis.balanceAfter = (this.ArrBalance[0].Gross - this.ArrBalance[0].Consume - this.ArrBalance[0].Reserve + this.transaction.change);
    this.balanceHis.time = temp.getTime();
    this.balanceHis.fromAcctNumber = this.balanceAdmin.balance[1].AcctNumber;
    this.balanceHis.toAcctNumber = this.balanceUser.balance[1].AcctNumber;
    this.dataService.Post('balance-his/create', this.balanceHis).subscribe(
      response => {
        if (response.status === 0) {
          this.addBalanceHisPaymentAdmin();
          // this.toastr.success('Đã thêm lịch sử thành công', 'Thông báo');
        }
        else {
          this.toastr.error('Lịch sử nạp xảy ra lỗi!', 'Cảnh báo');
        }
      }
    );
  }
  //thêm lịch sử rút trừ tiền admin (k trừ tiền, chỉ thêm lịch sử)
  addBalanceHisPaymentAdmin() {
    const temp = new Date();
    this.balanceHis = new BalanceHisModel;
    this.balanceHis.accountId = AdminConstant.ACCOUNT_ID;
    this.balanceHis.hisType = "UPDATE_BALANCE";
    this.balanceHis.amount = -this.transaction.change;
    this.balanceHis.hisContent = this.balanceHis.hisType + "|1|" + this.balanceHis.amount + "|" + this.hisContent;
    this.balanceHis.iP = this.ip.ip;
    this.balanceHis.balanceBefor = (this.balanceAdmin.balance[1].Gross - this.balanceAdmin.balance[1].Consume - this.balanceAdmin.balance[1].Reserve);
    this.balanceHis.balanceAfter = (this.balanceHis.balanceBefor - this.transaction.change);
    this.balanceHis.time = temp.getTime();
    this.balanceHis.fromAcctNumber = this.balanceAdmin.balance[1].AcctNumber;
    this.balanceHis.toAcctNumber = this.balanceUser.balance[1].AcctNumber;
    this.dataService.Post('balance-his/create', this.balanceHis).subscribe(
      response => {
        if (response.status === 0) {
          // this.toastr.success('Đã thêm lịch sử thành công', 'Thông báo');
        }
        else {
          this.toastr.error('Lịch sử nạp xảy ra lỗi!', 'Cảnh báo');
        }
      }
    );
  }



  isChangeTab() {
    this.reconfirmForm.reset();
    this.isWithdrawal = !this.isWithdrawal;
  }

}
