import { Component, Inject, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  SearchModel,
  IHelperService,
  IHelperServiceToken
} from '../../../../core';

import { IBalanceService,IBalanceServiceToken,BalanceService,BalanceModel} from '../../../../core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  @ViewChild('myTable') table: any;
  searchObject: SearchModel;
  expanded: any = {};
  listBalance: any;
  temp: any;

  
  constructor(@Inject(IBalanceServiceToken) private balanceService: IBalanceService) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.searchObject = new SearchModel();
    this.search(this.searchObject);
  }

  search(search: SearchModel) {
    this.balanceService.Get(search).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.listBalance = response.data;
          this.temp = Object.keys(this.listBalance).map(e => this.listBalance[e]);
          console.log(this.listBalance);
          console.log(this.listBalance.balance);
        }
      },
      error => {
      }
    );
  }

  keyArr = [];
    toggleExpandRow(row) {
        this.table.rowDetail.collapseAllRows();
        this.table.rowDetail.toggleExpandRow(row);
        this.keyArr = Object.keys(row.balance);
    }




}
