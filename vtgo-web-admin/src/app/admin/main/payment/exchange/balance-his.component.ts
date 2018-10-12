import { Component, OnInit } from '@angular/core';
import { BalanceModel } from 'src/app/core/models/balance.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SearchModel } from 'src/app/core/models/search.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
    selector: 'app-balance-his',
    templateUrl: './balance-his.component.html',
    styleUrls: ['./balance-his.component.scss']
})
export class BalanceHisComponent implements OnInit {
    toShow = 5;
    _entityBalance: BalanceModel;
    searchParam: SearchModel;
    closeResult = "";
    rows: any;
    balance: any;

    constructor(private modalServices: NgbModal, private dataService: DataService) { }

    search(search) {
        this.dataService.Post('balance-his/search', search).subscribe(
            response => {
                if (response.status === 0) {
                    this.rows = response.data;
                    console.log(this.rows);
                }
            }
        );
    }


    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.searchParam = new SearchModel();
        this.searchParam.searchParam = '';
        this.search(this.searchParam);
    }


    changeShow(el) {
        this.toShow = el;
        console.log(this.toShow);
    }

    getBalanceById(event) {
        this._entityBalance.accountId = event;
        console.log(this._entityBalance.accountId);        
        // this.dataService.Post('balance/get-by-id', this._entityBalance).subscribe(
        //     response => {
        //         if (response.status === 0) {
        //             this._entityBalance = response.data;
        //             console.log(this._entityBalance);
        //         }
        //     }
        // );
    }


    open(ele) {
        this._entityBalance = new BalanceModel();
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

}
