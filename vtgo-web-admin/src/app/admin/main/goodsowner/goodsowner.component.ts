import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { OwnerSearch } from './model/owner.search';
import { DataService } from '../../../core/services/data.service';
import { AuthenService } from '../../../core/services/authen.service';
import { enterView } from '@angular/core/src/render3/instructions';
import { OwnerViewModel } from './model/owner.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-goodsowner',
    templateUrl: './goodsowner.component.html',
    styleUrls: ['./goodsowner.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoodsOwnerComponent implements OnInit {
    @ViewChild('myTable') table: any;
    expanded: any = {};
    rows: any = '';
    closeResult: string;
    searchParam: OwnerSearch;
    _entityOwner: OwnerViewModel;
    constructor(private modalServices: NgbModal,
        private dataService: DataService,
        private authenServices: AuthenService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.searchParam = new OwnerSearch();
        this.searchParam.searchParam = '';
        this.search(this.searchParam);
    }



    search(search) {
        this.dataService.Post('good-owner/search', search).subscribe(
            response => {
                if (response.status === 0) {
                    this.rows = response.data;
                }
            }
        );
    }

    txtSearch(event) {
        this.search(this.searchParam);
    }

    open(ele) {
        this._entityOwner = new OwnerViewModel();
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
    openSm(del, id) {
        this.modalServices.open(del, { size: 'sm' })
            .result.then(
                result => {
                    this.closeResult = `Close with: ${result}`;
                    this.dataService.Post('good-owner/delete', { accountId: id }).subscribe(
                        result => {
                            if (result.status === 0) {
                                this.toastr.warning('Đã xóa chủ hàng có id là:' + id);
                                this.loadData();
                            } else {
                                this.toastr.error('Đã xảy ra lỗi!', 'Cảnh báo');
                            }
                        }
                    );
                },
                reason =>
                    (this.closeResult = `Dismissed ${this.getDismissReason(reason)}`)
            );
    }
    onAddOwner(event) {
        this.dataService.Post('good-owner/create', event).subscribe(
            response => {
                if (response.status === 0) {
                    this.toastr.success('Đã thêm thành công chủ hàng!');
                    this.loadData();
                }
                else {
                    this.toastr.error('Số điện thoại không hợp lệ', 'Cảnh báo');
                }
            }
        );
    }


    getOwner(event) {
        this._entityOwner = event;
    }
    onEditOwner(event) {
        this.dataService.Post('good-owner/update', event).subscribe(
            response => {
                if (response.message === "Successful") {
                    this.loadData();
                    this.toastr.success('Đã chỉnh sửa thành công thông tin chủ hàng!');
                }
                else
                this.toastr.error('Đã xảy ra lỗi!', 'Cảnh báo');
            }
        );
    }

}