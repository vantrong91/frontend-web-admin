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
    isAdd: boolean = true;
    searchParam: OwnerSearch;
    _entityOwner: OwnerViewModel;
    constructor(private modalServices: NgbModal,
        private dataService: DataService,
        private authenServices: AuthenService,
        private toastr: ToastrService
    ) { }

    arrImg = [];
    res = [];
    toggleExpandRow(row) {
        this.arrImg = row.attachProperties;
        console.log(this.arrImg);
        this.res = [];
        for (var x in this.arrImg) {
            this.arrImg.hasOwnProperty(x) && this.res.push(this.arrImg[x])
        }
    }


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
        if (event.keyCode === 13) {
            this.search(this.searchParam);
            event.target.select();
        }
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
        this.res=[];
        this.dataService.Post('good-owner/create', event).subscribe(
            response => {
                if (response.status === 0) {
                    this.toastr.success('Đã thêm thành công chủ hàng!');
                    this.loadData();
                }
                else {
                    switch (response.message) {
                        case 'PhoneNumber was existed':
                            this.toastr.clear();
                            this.toastr.error("Số điện thoại đã được sử dụng.", "Đã xảy ra lỗi...",
                                {
                                    closeButton: true,
                                    disableTimeOut: true
                                });
                            break;
                        case 'Email was existed':
                            this.toastr.clear();
                            this.toastr.error("Email đã được sử dụng.", "Đã xảy ra lỗi...",
                                {
                                    closeButton: true,
                                    disableTimeOut: true
                                });
                            break;
                        default:
                            this.toastr.clear();
                            this.toastr.error("Đã xảy ra lỗi xin vui lòng thử lại!", "Thông báo...",
                                {
                                    closeButton: true,
                                    disableTimeOut: true
                                });
                    }
                }
            }
        );
    }

    resetRes(){
        this.res = [];
    }
    getOwner(event) {
        this._entityOwner = event;
        console.log(this._entityOwner);
    }

    onEditOwner(event) {
        this.dataService.Post('good-owner/update', event).subscribe(
            response => {
                console.log(response);
                if (response.message === "Successful") {
                    this.loadData();
                    this.toastr.success('Đã chỉnh sửa thành công thông tin chủ hàng!');
                }
                else
                    this.toastr.error('Đã xảy ra lỗi!', 'Cảnh báo');
            }
        );
    }

    // getFile(file){
    //     this.dataService.getFile('good-owner/getfile').subscribe(
    //         response =>{
    //             console.log(response);
    //         }
    //     )
    // }


}