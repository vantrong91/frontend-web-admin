import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BalanceModel, SearchModel, DataService, AccountViewModel } from 'src/app/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountManViewModel } from 'src/app/core/models/accountMan.model';
import { BalanceHisModel } from 'src/app/core/models/balanceHis.model';
import { TransactionModel } from 'src/app/core/models/transaction.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
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
  fee: any;
  isShow= false;
  ip: any;
  public reconfirmForm: FormGroup;

  constructor(private modalServices: NgbModal, private toastr: ToastrService, private formBuilder: FormBuilder, private dataService: DataService) {
    this.reconfirmForm = this.formBuilder.group({
      transferAmount: new FormControl(),
      transferFees: new FormControl(),
      code: new FormControl(),
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
  }

  search(search) {
    this.dataService.Post('account-man/get-by-id', this.balanceHisId).subscribe(
      response => {
        if (response.status === 0) {
          this.accounts = response.data;
          console.log(this.accounts);
          
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
          console.log(this._entityBalance);
          this.ArrBalance = Object.values(this._entityBalance[0].balance);
          console.log(this.ArrBalance);
        }
      }
    );
  }


  showName() {
    this.exchangeForm.setValue({ acctNumberSend: 'VTGO11111111', fullNameSend: 'Nguyễn Văn A', acctNumberReceive: '', fullNameReceive: 'Lê Văn B', amountOfMoney: '', code: 'Abc01C' });
  }

  open(ele) {
    this.modalServices
      .open(ele, { size: 'lg' })
      .result.then(
        result => {
          this.closeResult = `Close with: ${result}`;
        },
        reason =>
          (this.closeResult = `Dismissed ${this.getDismissReason(reason)}`)
      );
    this.closeForm.emit();
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

  bankChanged(event){
    this.Arrbank = Object.values(this.listBank);
    for(var _i = 0; _i < this.Arrbank.length; _i++){
      if(this.Arrbank[_i].transferId == event.target.value){
        this.fee = this.Arrbank[_i].fee;
      }
    }
    
  }
  
  chaneBalance() {
    this.closeForm.emit();
    this.transaction = new TransactionModel;
    const num1 = parseInt(this.reconfirmForm.value.transferAmount);
    const num2 = parseInt(this.fee);
    this.transaction.accountId = this.balanceHisId.accountId;
    this.transaction.balType = 1;
    this.transaction.change = -(num1 + num2);
    console.log(this.transaction);
    this.dataService.Post('balance/transaction', this.transaction).subscribe(
      response => {
        if (response.status === 0) {
          this.toastr.success('Đã chuyển tiền thành công', 'Thông báo');
          this.addBalanceHis();
        }
        else {
          this.toastr.error('Đã có lỗi xảy ra!', 'Cảnh báo');
        }
      }
    );

  }

  changeShow(){
    this.isShow = true;
  }

 

  addBalanceHis(){
    // this.ipservice.getIp().then(temp => console.log(temp)).catch(err => console.log(err));
    const temp = new Date();
    this.balanceHis = new BalanceHisModel;
    this.balanceHis.accountId = this.Arr[0].accountId;
    this.balanceHis.hisType = "UPDATE_BALANCE";
    this.balanceHis.hisContent = "Rút tiền tại VTGO";
    this.balanceHis.ip = "8.8.8.8";
    this.balanceHis.balanceAfter = (this.ArrBalance[0].Gross - this.ArrBalance[0].Consume - this.ArrBalance[0].Reserve );
    this.balanceHis.balanceBefor = this.balanceHis.balanceAfter - this.reconfirmForm.value.transferAmount - this.fee;
    this.balanceHis.amount = this.fee;
    this.balanceHis.time = temp.getTime();
    console.log(this.balanceHis);
    
    this.dataService.Post('balance-his/create', this.balanceHis).subscribe(
      response => {
        if (response.status === 0) {
          this.toastr.success('Đã thêm lịch sử thành công', 'Thông báo');
        }
        else {
          this.toastr.error('Đã có lỗi xảy ra!', 'Cảnh báo');
        }
      }
    );
  }

}
