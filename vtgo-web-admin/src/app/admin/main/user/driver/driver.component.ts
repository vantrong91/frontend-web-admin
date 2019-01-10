import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
    DriverViewModel, SearchModel,
    DataService, AuthenService,
    ICategoryServiceToken, ICategoryService,
    IAddressServiceToken, IAddressService, AddressCategoryModel
} from 'src/app/core';
import { ifError } from 'assert';


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

    searchProvince: AddressCategoryModel = new AddressCategoryModel();
    searchDistrict: AddressCategoryModel = new AddressCategoryModel();
    searchCommune: AddressCategoryModel = new AddressCategoryModel();

    dataAddress = new Array();
    dataContactAddress = new Array();
    lstProvince = new Array();
    lstDistrict = new Array();
    lstCommune = new Array();

    viewAccountId: number;
    viewProvince = 'Tỉnh...';
    viewDistrict = 'Huyện...';
    viewCommune = 'Xã...';

    viewContactProvince = 'Tỉnh...';
    viewContactDistrict = 'Huyện...';
    viewContactCommune = 'Xã...';

    constructor(private modalServices: NgbModal,
        private dataService: DataService,
        private toastr: ToastrService,
        private authenServices: AuthenService,
        @Inject(ICategoryServiceToken) private categoryService: ICategoryService,
        @Inject(IAddressServiceToken) private addressService: IAddressService
    ) { }

    toggleExpandRow(row) {
        this.viewAccountId =  row.accountId;
        if (!this.checkToggleAddress(this.viewAccountId)) {
            this.viewProvince = 'Tỉnh...';
            this.viewDistrict = 'Huyện...';
            this.viewCommune = 'Xã...';
            if (row.address != null) {
                this.loadProvinceByCode(row.address);
            }
        }
        if (!this.checkToggleContactAddress(this.viewAccountId)) {
            this.viewContactProvince = 'Tỉnh...';
            this.viewContactDistrict = 'Huyện...';
            this.viewContactCommune = 'Xã...';
            

            if (row.contactAddress != null) {
                this.loadContactProvinceByCode(row.contactAddress);
            }
        } else {
            console.log("Đã load!");
        }
        this.table.rowDetail.toggleExpandRow(row);
    }
    onDetailToggle(event) {
    }

    checkToggleAddress(accountId) {
        let loadded = false;
        if (this.dataAddress != null)
            this.dataAddress.forEach(item => {
                if (item.accountId == accountId)
                    loadded = true;
            });
        return loadded;
    }

    checkToggleContactAddress(accountId) {
        let loadded = false;
        if (this.dataContactAddress != null)
            this.dataContactAddress.forEach(item => {
                if (item.accountId == accountId)
                    loadded = true;
            });
        return loadded;
    }

    getAddressToShow(accountId) {
        let address = '';
        if (this.dataAddress != null)
            this.dataAddress.forEach((item, index) => {
                if (item.accountId == accountId)
                    address = this.dataAddress[index].address.wards + '. ' + this.dataAddress[index].address.district + '. ' + this.dataAddress[index].address.province;
            });
        return address;
    }
    getContactAddressToShow(accountId) {
        let address = '';
        if (this.dataContactAddress != null)
            this.dataContactAddress.forEach((item, index) => {
                if (item.accountId == accountId)
                    address = this.dataContactAddress[index].address.wards + '. ' + this.dataContactAddress[index].address.district + '. ' + this.dataContactAddress[index].address.province;
            });
        return address;
    }
    addressLoadding(address) {
        if (address != null && address.wards != null && address.district != null && address.province != null)
            return this.viewCommune + '. ' + this.viewDistrict + '. ' + this.viewProvince;
        else return 'Chưa có dữ liệu.';
    }

    addressContactLoadding(address) {
        if (address != null && address.wards != null && address.district != null && address.province != null)
            return this.viewContactCommune + '. ' + this.viewContactDistrict + '. ' + this.viewContactProvince;
        else return 'Chưa có dữ liệu.';
    }

    loadProvinceByCode(address) {
        let codeProvince = address.province;
        if (codeProvince != null) {
            let province = 'Tỉnh...'
            this.lstProvince.forEach(item => {
                if (item.provinceId == codeProvince) {
                    province = item.provinceName;
                    this.viewProvince = province;
                    //get All district of Province
                    this.addressService.getDistrict({ codeId: codeProvince }).subscribe(
                        response => {
                            if (response.data.length > 0) {
                                this.lstDistrict = response.data;
                                if (address.district != null) {
                                    this.loadDistrictByCode(address.district, 1);
                                    if (address.wards != null) {
                                        //get All CommuneOf District
                                        this.addressService.getCommune({ codeId: address.district }).subscribe(
                                            response => {
                                                if (response.data.length > 0) {
                                                    this.lstCommune = response.data;
                                                    this.loadCommuneByCode(address.wards, 1);
                                                    console.log("addressPush:" + this.viewCommune + '-' + this.viewDistrict + '-' + this.viewProvince);
                                                    this.dataAddress.push({
                                                        accountId: this.viewAccountId,
                                                        address: {
                                                            province: this.viewProvince,
                                                            district: this.viewDistrict,
                                                            wards: this.viewCommune
                                                        }
                                                    });
                                                }
                                            }
                                        );
                                    }
                                }
                            }
                        }
                    );
                }
            });
        }
    }

    loadContactProvinceByCode(address) {
        let codeProvince = address.province;
        if (codeProvince != null) {
            let province = 'Tỉnh...'
            this.lstProvince.forEach(item => {
                if (item.provinceId == codeProvince) {
                    province = item.provinceName;
                    this.viewContactProvince = province;
                    //get All district of Province
                    this.addressService.getDistrict({ codeId: codeProvince }).subscribe(
                        response => {
                            if (response.data.length > 0) {
                                this.lstDistrict = response.data;
                                if (address.district != null) {
                                    this.loadDistrictByCode(address.district, 2);
                                    if (address.wards != null) {
                                        //get All CommuneOf District
                                        this.addressService.getCommune({ codeId: address.district }).subscribe(
                                            response => {
                                                if (response.data.length > 0) {
                                                    this.lstCommune = response.data;
                                                    this.loadCommuneByCode(address.wards, 2);

                                                    console.log("Contact addressPush:" + this.viewContactCommune + '-' + this.viewContactDistrict + '-' + this.viewContactProvince);
                                                    this.dataContactAddress.push({
                                                        accountId: this.viewAccountId,
                                                        address: {
                                                            province: this.viewContactProvince,
                                                            district: this.viewContactDistrict,
                                                            wards: this.viewContactCommune
                                                        }

                                                    });

                                                }
                                            }
                                        );
                                    }
                                }
                            }
                        }
                    );
                }
            });
        }
    }
    loadDistrictByCode(codeDistrict, type) {
        let district = 'Huyện...'
        this.lstDistrict.forEach(item => {
            if (item.districtId == codeDistrict) {
                district = item.districtName;
            }
        });
        if (type == 1)//load address
            this.viewDistrict = district;
        if (type == 2)//load contactaddress
            this.viewContactDistrict = district;
    }
    loadCommuneByCode(codeCommune, type) {
        let commune = 'Xã...'
        this.lstCommune.forEach(item => {
            if (item.communeId == codeCommune) {
                commune = item.communeName;
            }
        });
        if (type == 1)//load address
            this.viewCommune = commune;
        if (type == 2)//load contactaddress
            this.viewContactCommune = commune;
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        let search = '';
        this.search(search);
        this.loadAllProvince();
    }

    search(search) {
        this.dataService.Post('driver/search', { searchParam: search }).subscribe(
            response => {
                if (response.status === 0) {
                    this.rows = response.data;
                    console.log(this.rows);
                }
            }
        );
    }

    loadAllProvince() {
        this.addressService.getProvince(this.searchProvince).subscribe(
            response => {
                if (response.data != null)
                    this.lstProvince = response.data;
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
