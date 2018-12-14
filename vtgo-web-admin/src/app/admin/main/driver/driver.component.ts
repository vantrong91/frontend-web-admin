import { DriverViewModel } from './driver-model/driver.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { AuthenService } from '../../../core/services/authen.service';
import { enterView } from '@angular/core/src/render3/instructions';
import { ToastrService } from 'ngx-toastr';
import { ICategoryServiceToken, ICategoryService, SearchModel, IAddressServiceToken, IAddressService } from 'src/app/core';


@Component({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DriverComponent implements OnInit {
    @ViewChild('myTable') table: any;
    expanded: any = {};
    isAdd = false;
    rows: any = '';
    closeResult: string;
    searchParam: ' ';
    _entityDriver: DriverViewModel;
    searchEthnic: SearchModel;
    oldEthnic: string;
    isToggle = false;
    oldContactAddress: string;
    oldAddress: string;

    imgUrl = '';
    ulrImgFull = '';
    imgName = '';





    constructor(private modalServices: NgbModal,
        private dataService: DataService,
        private toastr: ToastrService,
        private authenServices: AuthenService,
        @Inject(ICategoryServiceToken) private categoryService: ICategoryService,
        @Inject(IAddressServiceToken) private addressService: IAddressService
    ) { }

    toggleExpandRow(row) {
        if (row.address != null && row.contactAddress != null) {
            if (row.ethnic > 0 || row.address.wards > 0 || row.contactAddress.wards > 0) {
                this.isToggle = true;
            } else {
                this.isToggle = false;
            }
        }
        if (this.isToggle) {
            this.categoryService.GetById(row.ethnic).subscribe(
                (response: any) => {
                    this.oldEthnic = row.ethnic;
                    row.ethnic = response.data[0].item;
                }
            );
            this.addressService.getById(row.contactAddress.wards).subscribe(
                (response: any) => {
                    this.oldContactAddress = row.contactAddress.wards;
                    row.contactAddress.wards = response.data[0].tenDayDu;
                }
            );
            this.addressService.getById(row.address.wards).subscribe(
                (response: any) => {
                    this.oldAddress = row.address.wards;
                    row.address.wards = response.data[0].tenDayDu;
                }
            )
        }
        this.table.rowDetail.toggleExpandRow(row);
    }
    onDetailToggle(event) {
        // console.log('Detail Toggled', event);
    }

    ngOnInit() {
        this.loadData();
    }
    loadData() {
        let search = '';
        this.search(search);
    }

    search(search) {
        this.dataService.Post('driver/search', { searchParam: search }).subscribe(
            response => {
                if (response.status === 0) {
                    this.rows = response.data;
                }
            }
        );
    }

    searchByPressEnter(event) {

        if (event.keyCode == 13)
          this.search(event.target.value);
    }
    getUrlImg(folder: string) {
        this.imgUrl = this.dataService.GetBaseUrlImg(folder) + '/';
        return this.imgUrl;
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
    openImg(ele, imgUrl, fileName) {
        this.ulrImgFull = imgUrl + fileName;
        this.imgName = fileName;
        this.modalServices
            .open(ele, { windowClass: 'dark-modal', size: 'lg' });
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

    getDriver(event) {
        this._entityDriver = event;
        if (this.oldEthnic !== undefined) {
            this._entityDriver.ethnic = this.oldEthnic;
            this._entityDriver.contactAddress.wards = this.oldContactAddress;
            this._entityDriver.address.wards = this.oldAddress;
        }
    }
    onEditDriver(event) {
        this.dataService.Post('driver/update', event).subscribe(
            response => {
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
