import { Component, OnInit, Input, EventEmitter, Output,ViewChild } from '@angular/core';
import { AccountManViewModel } from 'src/app/core/models/accountMan.model';
import { SearchModel, DataService, BalanceModel } from 'src/app/core';
import { FormBuilder } from '@angular/forms';
import { BalanceHisModel } from 'src/app/core/models/balanceHis.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-balance-his',
    templateUrl: './balance-his.component.html',
    styleUrls: ['./balance-his.component.scss']
})
export class BalanceHisComponent implements OnInit {
    @ViewChild('myTable') table: any;
    searchObject: SearchModel;
    expanded: any = {};

    balanceHisId: AccountManViewModel;
    searchParam: SearchModel;
    balanceList: BalanceHisModel;
    _entityBalance: BalanceModel;

    toShow =5;

    @Input() set accountManModel(accountManModel: AccountManViewModel) {
        this.balanceHisId = accountManModel;
    }

    @Output() closeForm = new EventEmitter<any>();

    constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private dataService: DataService, private modalServices: NgbModal) { }


    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.search();
    }

    changeShow(el) {
        if (el != 0)
          this.toShow = el;
        else
          this.toShow = undefined;
      }
    search() {
        this.dataService.Post('balance-his/get-by-acc-id', this.balanceHisId).subscribe(
            response => {
                console.log(response.data);
                
                if (response.status === 0) {                    
                    if (response.data == "") {
                        this.toastr.error("Không tìm thấy lịch sử của tài khoản","Thông báo");
                        this.closeForm.emit();
                    } else {
                        this.balanceList = response.data;
                    }
                }
            }
        );
    }

    open(ele) {
        this._entityBalance = new BalanceModel();
        this.modalServices
            .open(ele, { size: 'lg' })

    }

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
      }
}
