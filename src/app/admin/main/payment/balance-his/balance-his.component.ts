import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-balance-his',
    templateUrl: './balance-his.component.html',
    styleUrls: ['./balance-his.component.scss']
})
export class BalanceHisComponent implements OnInit {
    toShow = 5;
    
    constructor() { }

    ngOnInit() {
    }

    changeShow(el){
        if (el !== 0)
        this.toShow = el;
      else
        this.toShow = undefined;
    }

    search(event){

    }

    rows = [
        { hisid: "1", accountid: "1001", histype: "1", hiscontent: "His1", ip: "1.1.1.1", balancebefor: "10000", balanceafter: "0", amount: "0" },
        { hisid: "2", accountid: "1002", histype: "2", hiscontent: "His2", ip: "2.2.2.2", balancebefor: "20000", balanceafter: "20000", amount: "0" },
        { hisid: "3", accountid: "1003", histype: "3", hiscontent: "His3", ip: "3.3.3.3", balancebefor: "30000", balanceafter: "100000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "50000", amount: "0" },
        { hisid: "4", accountid: "1004", histype: "4", hiscontent: "His4", ip: "4.4.4.4", balancebefor: "40000", balanceafter: "500000", amount: "0" },
        { hisid: "5", accountid: "1005", histype: "5", hiscontent: "His5", ip: "5.5.5.5", balancebefor: "50000", balanceafter: "60000000", amount: "0" }
    ];
}
