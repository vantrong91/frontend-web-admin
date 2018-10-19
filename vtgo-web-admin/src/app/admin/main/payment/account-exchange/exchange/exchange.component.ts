import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BalanceModel, SearchModel, DataService, AccountViewModel } from 'src/app/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountManViewModel } from 'src/app/core/models/accountMan.model';
import { BalanceHisModel } from 'src/app/core/models/balanceHis.model';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  public exchangeForm: FormGroup;
  constructor(private modalServices: NgbModal, private formBuilder: FormBuilder, private dataService: DataService) {
    this.exchangeForm = this.formBuilder.group({
      acctNumberSend: new FormControl(),
      fullNameSend: new FormControl(),
      acctNumberReceive: new FormControl(),
      fullNameReceive: new FormControl(),
      amountOfMoney: new FormControl(),
      code: new FormControl(),
    });
    this.exchangeForm.setValue({ acctNumberSend: 'VTGO11111111', fullNameSend: 'Nguyễn Văn A', acctNumberReceive: '', fullNameReceive: '', amountOfMoney: '', code: 'Abc01C' });
  }

  _entityBalance: BalanceModel;
  searchParam: SearchModel;
  Arr = [];
  accounts: AccountViewModel;
  closeResult = "";
  balanceHisId: AccountManViewModel;
  balanceHisList: BalanceHisModel;
  isShow = false;


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
  }

  search(search) {
    this.dataService.Post('account-man/get-by-id', this.balanceHisId).subscribe(
      response => {
        if (response.status === 0) {
          this.accounts = response.data;
          console.log(this.accounts);
          this.Arr = Object.values(this.accounts);
          console.log(this.Arr);
        }
      }
    );
  }


  getBalanceHisById() {
    this.dataService.Post('balance-his/get-by-acc-id', this.balanceHisId).subscribe(
      response => {
        if (response.status === 0) {
          this.balanceHisList = response.data;
          console.log(this.balanceHisList);
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
          // this.Arr = Object.values(this._entityBalance[0].balance);
          // console.log(this.Arr);    
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

  Show(){
    this.isShow = true;
  }

}
