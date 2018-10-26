import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

    balanceHisId: AccountManViewModel;
    searchParam: SearchModel;
    balanceList: BalanceHisModel;
    _entityBalance: BalanceModel;


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

    search() {
        this.dataService.Post('balance-his/get-by-acc-id', this.balanceHisId).subscribe(
            response => {
                if (response.status === 0) {                    
                    if (response.data == "") {
                        this.toastr.error("Mã tài khoản không tồn tại","Cảnh báo");
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


}
