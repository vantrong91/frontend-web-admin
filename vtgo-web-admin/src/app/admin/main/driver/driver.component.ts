import { DriverViewModel } from './driver-model/driver.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DriverSearch } from './driver-model/driver-search.model';
import { DataService } from '../../../core/services/data.service';
import { AuthenService } from '../../../core/services/authen.service';
import { enterView } from '@angular/core/src/render3/instructions';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DriverComponent implements OnInit {
    @ViewChild('myTable') table: any;
    expanded: any = {};
    toggleExpandRow(row) {
        // console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }
    onDetailToggle(event) {
        //console.log('Detail Toggled', event);
    }
    isAdd = false;
    rows: any = '';
    closeResult: string;
    searchParam: DriverSearch;
    _entityDriver: DriverViewModel;
    constructor(private modalServices: NgbModal,
        private dataService: DataService,
        private toastr: ToastrService,
        private authenServices: AuthenService
    ) { }


    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.searchParam = new DriverSearch();
        this.searchParam.searchParam = '';
        this.search(this.searchParam);
    }

    search(search) {
        this.dataService.Post('driver/search', search).subscribe(
            response => {
                // console.log('-- response:');
                console.log(response);
                if (response.status === 0) {
                    this.rows = response.data;
                }
            }
        );
    }

    txtSearch(event) {
        // if (event.keyCode === 13) {
        //     this.search(this.searchParam);
        //     event.target.select();
        // }
        this.search(this.searchParam);
    }

    open(ele) {
        this._entityDriver = new DriverViewModel();
        this.modalServices
            .open(ele, { size: 'lg' })
            .result.then(
                result => {
                    this.closeResult = `Close with: ${result}`;
                },
                reason => {
                    (this.closeResult = `Dismissed ${this.getDismissReason(reason)}`);
                }
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
                    this.dataService.Post('driver/delete', { accountId: id }).subscribe(
                        result => {
                            if (result.status === 0) {
                                this.toastr.info("Đã xóa id " + id, "Thông báo..");
                                this.loadData();
                            } else {
                                this.toastr.error("Đã xả ra lỗi xin vui lòng thử lại", "Thông báo...");
                            }
                        }
                    );
                },
                reason => (this.closeResult = `Dismissed ${this.getDismissReason(reason)}`),
            );
    }

    onAddDriver(event) {
        this.dataService.Post('driver/create', event).subscribe(
            response => {
                if (response.status === 0) {
                    this.toastr.success("Đã thêm lái xe mới!", "Thông báo...");
                    this.loadData();
                }
                else {
                    switch (response.message) {
                        case 'PhoneNumber was existed':
                            this.toastr.clear();
                            this.toastr.error("Số điện thoại đã được sử dụng.", "Đã xảy ra lỗi...",
                        {
                            closeButton:true,
                            disableTimeOut: true
                        });
                            break;
                        case 'Email was existed':
                            this.toastr.clear();
                            this.toastr.error("Email đã được sử dụng.", "Đã xảy ra lỗi...",
                            {
                                closeButton:true,
                                disableTimeOut: true
                            });
                            break;
                        default:
                            this.toastr.clear();
                            this.toastr.error("Đã xảy ra lỗi xin vui lòng thử lại!", "Thông báo...",
                            {
                                closeButton:true,
                                disableTimeOut: true
                            });
                    }
                }
            }
        );
    }

    getDriver(event) {
        this._entityDriver = event;
        console.log(this._entityDriver);
    }
    onEditDriver(event) {
        this.dataService.Post('driver/update', event).subscribe(
            response => {
                console.log(response);
                if (response.message === "Successful") {
                    this.loadData();

                    this.toastr.info("Chỉnh sửa thành công!", "Thông báo...");
                }
                else {
                    this.toastr.clear();
                    this.toastr.error("Đã xảy ra lỗi. Xin vui lòng thử lại", "Thông báo...");
                }
            }
        );
    }
}
