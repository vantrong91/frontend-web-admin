import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BalanceModel, SearchModel, DataService, AccountViewModel } from 'src/app/core';
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
  fee = '0';
  isShow = false;
  isWithdrawal = true;
  ip: any = {};

  messageToPayment='Nộp tiền vào tài khoản tại VTGO';

  public reconfirmForm: FormGroup;
  temp: any;

  constructor(private modalServices: NgbModal, private toastr: ToastrService, private formBuilder: FormBuilder, private dataService: DataService, private ipService: IpService) {
    this.reconfirmForm = this.formBuilder.group({
      acctNumber: new FormControl('', Validators.required),
      transferAmount: new FormControl('', Validators.required),
      code: new FormControl()
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
    this.search(search);
    this.getBalanceHisById();
    this.getBanklist(search);
    this.ipService.getIp().subscribe(data => {
      this.ip = data;
    })
  }

  search(search) {
    this.dataService.Post('account-man/get-by-id', this.balanceHisId).subscribe(
      response => {
        if (response.status === 0) {
          this.accounts = response.data;
          this.Arr = Object.values(this.accounts);
        }
      }
    );
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
            this.toastr.error("Mã tài khoản không tồn tại", "Cảnh báo");
            this.closeForm.emit();
          } else {
            this.ArrBalance = Object.values(this._entityBalance[0].balance);
          }
        }
      }
    );
  }





  bankChanged(event) {
    this.Arrbank = Object.values(this.listBank);
    for (var _i = 0; _i < this.Arrbank.length; _i++) {
      if (this.Arrbank[_i].transferId == event.target.value) {
        this.fee = this.Arrbank[_i].fee;
      }
    }

  }

  withdrawal() {
    this.closeForm.emit();
    this.transaction = new TransactionModel;
    const num1 = parseInt(this.reconfirmForm.value.transferAmount);
    const num2 = parseInt(this.fee);
    this.transaction.accountId = this.balanceHisId.accountId;
    this.transaction.balType = 1;
    this.transaction.change = -(num1 + num2);
    this.dataService.Post('balance/transaction', this.transaction).subscribe(
      response => {
        if (response.status === 0) {
          this.toastr.success('Đã chuyển tiền thành công', 'Thông báo');
          this.addBalanceHis();
          //Cộng tiền vào Admin
          let admin = new TransactionModel();
          admin.accountId = 1;
          admin.balType = 1;
          admin.change = -this.transaction.change;
          this.dataService.Post('balance/transaction', admin).subscribe(
            response => {
              if (response.status === 0) {
                // console.log("Cộng tiền thành công:");
              } else {
                this.toastr.error('Cộng tiền vào VTGO lỗi', 'Thông báo',{
                  disableTimeOut:true
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

  payment() {
    
    this.transaction = new TransactionModel;
    const num1 = parseInt(this.reconfirmForm.value.transferAmount);
    const num2 = parseInt(this.fee);
    this.transaction.accountId = this.balanceHisId.accountId;
    this.transaction.balType = 1;
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
  }

  changeShow() {
    this.isShow = true;
  }

  addBalanceHis() {
    const temp = new Date();
    this.balanceHis = new BalanceHisModel;
    this.balanceHis.accountId = this.Arr[0].accountId;
    this.balanceHis.hisType = "UPDATE_BALANCE";
    this.balanceHis.hisContent = "Rút tiền tại VTGO";
    this.balanceHis.iP = this.ip.ip;
    this.balanceHis.balanceAfter = (this.ArrBalance[0].Gross - this.ArrBalance[0].Consume - this.ArrBalance[0].Reserve);
    this.balanceHis.balanceBefor = (this.balanceHis.balanceAfter - this.reconfirmForm.value.transferAmount - parseInt(this.fee));
    this.balanceHis.amount = -(this.transaction.change);
    this.balanceHis.time = temp.getTime();
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

  addBalanceHisPayment() {
    const temp = new Date();
    this.balanceHis = new BalanceHisModel;
    this.balanceHis.accountId = this.Arr[0].accountId;
    this.balanceHis.hisType = "UPDATE_BALANCE";
    this.balanceHis.hisContent = "Nạp tiền tại VTGO";
    this.balanceHis.iP = this.ip.ip;
    this.balanceHis.balanceAfter = (this.ArrBalance[0].Gross - this.ArrBalance[0].Consume - this.ArrBalance[0].Reserve + this.transaction.change);
    this.balanceHis.balanceBefor = (this.ArrBalance[0].Gross - this.ArrBalance[0].Consume - this.ArrBalance[0].Reserve);
    this.balanceHis.amount = this.transaction.change;
    this.balanceHis.time = temp.getTime();
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
