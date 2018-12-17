import { Component, OnInit, Inject } from '@angular/core';
import { AccountViewModel, DataService, BalanceModel, SearchModel, IBalanceService, IBalanceServiceToken } from '../../../../core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountManViewModel } from 'src/app/core/models/accountMan.model';

@Component({
  selector: 'app-account',
  templateUrl: './account-exchange.component.html',
  styleUrls: ['./account-exchange.component.scss']
})
export class AccountComponent implements OnInit {

  accounts: AccountViewModel;
  closeResult = "";
  accountById: AccountManViewModel;
  balanceById: BalanceModel;
  balance: BalanceModel;
  searchParam: SearchModel;

  constructor(private modalServices: NgbModal, private dataService: DataService) { }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.searchParam = new SearchModel();
    this.searchParam.searchParam = '';
    this.search(this.searchParam);
    this.search2(this.searchParam);
  }

  search(search) {
    this.dataService.Post('balance/account-bal', search).subscribe(
      response => {
        if (response.status === 0) {
          this.accounts = response.data;
        }
      }
    );
  }

  searchByPressEnter(event) {
    if (event.keyCode == 13)
      this.search(this.searchParam);
  }

  search2(search) {
    this.dataService.Post('account-man/search', search).subscribe(
      response => {
        if (response.status === 0) {
          this.balance = response.data;  
        }
      }
    );
  }


  getAccountManById(event) {
    this.accountById.accountId = event;
 
  }

  getBalanceById(event) {
    this.balanceById.accountId = event;

  }

  open(ele) {
    this.accountById = new AccountManViewModel();
    this.balanceById = new BalanceModel();
    this.modalServices
      .open(ele, { size: 'lg' })
      .result.then(
        result => {
          this.closeResult = `Close with: ${result}`;
        },
        reason =>
          (this.closeResult = `Dismissed ${this.getDismissReason(reason)}`)
      );

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


  txtSearch(event) {
    this.search(this.searchParam);
  }


}
