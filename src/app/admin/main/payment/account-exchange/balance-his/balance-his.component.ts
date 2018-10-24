import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AccountManViewModel } from 'src/app/core/models/accountMan.model';
import { SearchModel, DataService, BalanceModel } from 'src/app/core';
import { FormBuilder } from '@angular/forms';
import { BalanceHisModel } from 'src/app/core/models/balanceHis.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-balance-his',
    templateUrl: './balance-his.component.html',
    styleUrls: ['./balance-his.component.scss']
})
export class BalanceHisComponent implements OnInit {

    balanceHisId: AccountManViewModel;
    searchParam: SearchModel;
    balanceList: BalanceHisModel;
    _entityBalance: BalanceModel;


    @Input() set accountManModel(accountManModel: AccountManViewModel) {
        this.balanceHisId = accountManModel;
    }
    
    
    constructor(private formBuilder: FormBuilder, private dataService: DataService,private modalServices: NgbModal) { }


    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.search();
    }

    search() {
        this.dataService.Post('balance-his/get-by-acc-id', this.balanceHisId).subscribe(
            response => {
                if (response.status === 0) {
                    this.balanceList = response.data;
                    console.log(this.balanceList);
                }
            }
        );
    }

    open(ele) {
        this._entityBalance = new BalanceModel();
        this.modalServices
          .open(ele, { size: 'lg' })
          
      }

    // getBalanceById(balanceById: BalanceModel) {
    //     this.dataService.Post('balance/get-by-id', balanceById).subscribe(
    //         response => {
    //             if (response.status === 0) {
    //                 this._entityBalance = response.data;
    //                 console.log(this._entityBalance);
    //             }
    //         }
    //     );
    // }

}
