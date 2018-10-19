import { Component, OnInit, Inject } from '@angular/core';
import { AccountViewModel, DataService, BalanceModel, SearchModel, IBalanceService, IBalanceServiceToken } from '../../../../core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountManViewModel } from 'src/app/core/models/accountMan.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accounts: AccountViewModel;
  closeResult = "";
  accountById: AccountManViewModel;
  balanceById: BalanceModel;
  balance: BalanceModel;
  searchParam: ' ';

  constructor(private modalServices: NgbModal, private dataService: DataService) { }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    let search = '{}';
    this.search(search);
    this.search2(search);
  }

  search(search) {
    this.dataService.Post('account-man/search', search).subscribe(
      response => {
        if (response.status === 0) {
          this.accounts = response.data;
        }
      }
    );
  }

  search2(search) {
    this.dataService.Post('balance/search', search).subscribe(
      response => {
        if (response.status === 0) {
          this.balance = response.data;
        }
      }
    );
  }


  getAccountManById(event) {
    this.accountById.accountId = event;
    console.log(event);
  }

  getBalanceById(event) {
    this.balanceById.accountId = event;
    console.log(event);
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
    if (this.searchParam === undefined || this.searchParam === null || this.searchParam.length < 1)
      this.search('{}');
    else
      this.search(`{"searchParam":"` + this.searchParam.trim() + `"}`);
  }


}
