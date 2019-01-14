import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Pipe, Inject } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import {
    DataService, DriverViewModel,
    SearchModel, AccountViewModel,
    AccountService, IAccountServiceToken,
    ICategoryService, ICategoryServiceToken,
    IAddressServiceToken, IAddressService, IDataServiceToken, AddressCategoryModel
} from 'src/app/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
// import * as $ from 'jquery';

@Component({
    selector: 'app-driver-info',
    templateUrl: './driver-info.component.html',
    styleUrls: ['./driver-info.component.scss']
})
export class DriverInfoComponent implements OnInit {
    _entity: DriverViewModel;
    isAdd = false;
    oldAttachPro: any;
    mailValid = false;
    phoneValid = false;

    searchEthnic: SearchModel;

    addrProvince: AddressCategoryModel = new AddressCategoryModel();
    addrDistrict: AddressCategoryModel = new AddressCategoryModel();
    addrCommune: AddressCategoryModel = new AddressCategoryModel();

    lstEthnic: any;
    lstContry: any;
    lstProvince: any;
    lstProvince2: any;
    lstTown: any;
    lstTown2: any;
    addrwards: any;
    addrwards2: any;
    lstTypeLicense: any;

    imgSrcPreview_CMND = [];
    imgSrcPreview_GPLX = [];
    imgSrcPreview_ACD = [];
    imgSrcPreview_SHK = [];

    uploaderCMND: FileUploader = new FileUploader({ url: 'CMND' });
    uploaderGPLX: FileUploader = new FileUploader({ url: 'GPLX' });
    uploaderACD: FileUploader = new FileUploader({ url: 'ACD' });
    uploaderSHK: FileUploader = new FileUploader({ url: 'SHK' });

    @Input() set driverViewModel(driver: DriverViewModel) {
        if (driver.accountId !== 0) {
            this.isAdd = false;
            if (driver.address === null) {
                driver.address = {
                    country: null,
                    province: null,
                    district: null,
                    wards: null,
                    householdNo: null
                }
            }
            if (driver.contactAddress === null) {
                driver.contactAddress = {
                    country: null,
                    province: null,
                    district: null,
                    wards: null,
                    householdNo: null
                }
            }
            if (driver.attachProperties === null) {
                driver.attachProperties = {
                    "ACD": [],
                    "GPLX": [],
                    "SHK": [],
                    "CMND": []
                };
            }
            this._entity = new DriverViewModel();
            this._entity = driver;
            this.addEditForm.reset(this._entity);
            this.oldAttachPro = this._entity.attachProperties;
        } else {
            this.isAdd = true;
            this._entity = new DriverViewModel();
            this.addEditForm.reset();
        }
    };
    @Output() closeModalEvent = new EventEmitter<any>();
    @Output() driverViewModelChange = new EventEmitter<DriverViewModel>();
    public addEditForm: FormGroup;


    constructor(
        private toastrService: ToastrService,
        private formBuilder: FormBuilder,
        @Inject(IDataServiceToken) private dataService: DataService,
        @Inject(IAccountServiceToken) private accountService: AccountService,
        @Inject(ICategoryServiceToken) private categoryService: ICategoryService,
        @Inject(IAddressServiceToken) private addressService: IAddressService) {
        this.addEditForm = this.formBuilder.group({
            accountId: new FormControl(''),
            fullName: new FormControl('', Validators.required),
            nationality: new FormControl('', Validators.required),
            licenseNo: new FormControl('', Validators.required),
            issueDate: new FormControl('', Validators.required),
            issueBy: new FormControl('', Validators.required),
            gender: new FormControl('', Validators.required),
            ethnic: new FormControl('', Validators.required),
            email: new FormControl('', Validators.email),
            phoneNumber: new FormControl('', Validators.pattern(/^\+?\d{9,15}$/)),
            address: this.formBuilder.group({
                country: ['', Validators.required],
                province: ['', Validators.required],
                district: ['', Validators.required],
                wards: ['', Validators.required],
                householdNo: ['', Validators.required],
            }),

            contactAddress: this.formBuilder.group({
                country: new FormControl('', Validators.required),
                province: new FormControl('', Validators.required),
                district: new FormControl('', Validators.required),
                wards: new FormControl('', Validators.required),
                street: new FormControl(''),
            }),

            typeLicenseNo: new FormControl(''),
            extLicenseNo: new FormControl('', Validators.required),
            extIssueDate: new FormControl('', Validators.required),
            extIssueBy: new FormControl('', Validators.required),
            attachProperties: this.formBuilder.group({
                CMND: new FormArray([]),
                ACD: new FormArray([]),
                SHK: new FormArray([]),
                GPLX: new FormArray([])
            }),
            properties: new FormControl(''),
            vehicleId: new FormControl(''),
            state: new FormControl('', Validators.required),
            birthday: new FormControl('')
        });
    }

    ngOnInit() {
        if (!this.isAdd)
            this.loadAddress();
        this.lstContry = [{ id: 1, name: "Việt Nam" }];

        this.searchEthnic = new SearchModel();
        this.searchEthnic.searchParam2 = 4;
        this.categoryService.Get(this.searchEthnic).subscribe(
            (response: any) => {
                this.lstEthnic = response.data;
            }
        )

        this.addressService.getProvince(this.addrProvince).subscribe(
            (response: any) => {
                this.lstProvince = response.data;
            }
        )
        this.searchEthnic.searchParam2 = 6;
        this.categoryService.Get(this.searchEthnic).subscribe(
            (response: any) => {
                this.lstTypeLicense = response.data;
            }
        )
    }



    loadAddress() {
        //Load Address district
        if (this._entity.address.province != null) {
            this.addrDistrict.codeId = this._entity.address.province
            this.addressService.getDistrict(this.addrDistrict).subscribe(
                (response: any) => {
                    this.lstTown = response.data;
                }
            );
        }
        // Load Address Ward
        if (this._entity.address.district != null) {
            this.addrCommune.codeId = this._entity.address.district
            this.addressService.getCommune(this.addrCommune).subscribe(
                (response: any) => {
                    this.addrwards = response.data;
                }
            );
        }

        //Load contact Address district
        if (this._entity.contactAddress.province != null) {
            this.addrDistrict.codeId = this._entity.contactAddress.province;
            this.addressService.getDistrict(this.addrDistrict).subscribe(
                (response: any) => {
                    this.lstTown2 = response.data;
                }
            );
        }
        // Load contact Address Ward
        if (this._entity.contactAddress.district != null) {
            this.addrCommune.codeId = this._entity.contactAddress.district;
            this.addressService.getCommune(this.addrCommune).subscribe(
                (response: any) => {
                    this.addrwards2 = response.data;
                }
            );
        }

    }

    ChangingValue(event) {
        this.searchEthnic.searchParam2 = event.target.value;
        this.addressService.getProvince(this.addrProvince).subscribe(
            (response: any) => {
                this.lstProvince = response.data;
            }
        )
    }

    ChangingValue2(event) {
        this.searchEthnic.searchParam2 = event.target.value;
        this.addressService.getProvince(this.addrProvince).subscribe(
            (response: any) => {
                this.lstProvince2 = response.data;
            }
        )
    }

    ChagingValueProvince(event) {
        this.addrDistrict.codeId = event.target.value;
        this.addressService.getDistrict(this.addrDistrict).subscribe(
            (response: any) => {
                this.lstTown = response.data;
            }
        )
    }

    ChagingValueProvince2(event) {
        this.addrDistrict.codeId = event.target.value;
        this.addressService.getDistrict(this.addrDistrict).subscribe(
            (response: any) => {
                this.lstTown2 = response.data;
            }
        )
    }

    ChagingValueDistrict(event) {
        this.addrCommune.codeId = event.target.value;
        this.addressService.getCommune(this.addrCommune).subscribe(
            (response: any) => {
                this.addrwards = response.data;
            }
        )
    }

    ChagingValueDistrict2(event) {
        this.addrCommune.codeId = event.target.value;
        this.addressService.getCommune(this.addrCommune).subscribe(
            (response: any) => {
                this.addrwards2 = response.data;
            }
        )
    }

    selectFile(code: string) {
        switch (code) {
            case 'CMND':
                //upload Here!
                break;
            case 'ACD':
                break;
            case 'GPLX':
                break;
            case 'SHK':
                break;
            default:
                alert("Đã xảy ra lỗi xin vui lòng thử lại!");
        }
        // console.log(this.uploader.queue);
        this.groupImg();
    }

    groupImg() {
        this.addEditForm.controls.attachProperties.value.CMND.length = 0;
        this.addEditForm.controls.attachProperties.value.ACD.length = 0;
        this.addEditForm.controls.attachProperties.value.GPLX.length = 0;
        this.addEditForm.controls.attachProperties.value.SHK.length = 0;
        this.uploaderCMND.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.CMND.push(this.setNewFileName(el.file.name, index)));
        this.uploaderACD.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.ACD.push(this.setNewFileName(el.file.name, index)));
        this.uploaderGPLX.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.GPLX.push(this.setNewFileName(el.file.name, index)));
        this.uploaderSHK.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.SHK.push(this.setNewFileName(el.file.name, index)));


    }

    loadPreviewCMND() {
        this.imgSrcPreview_CMND = [];
        for (let i = 0; i < this.uploaderCMND.queue.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(this.uploaderCMND.queue[i]._file);
            reader.onload = () => {
                this.imgSrcPreview_CMND.push(reader.result);
            }
        }
    }
    loadPreviewACD() {
        this.imgSrcPreview_ACD = [];
        for (let i = 0; i < this.uploaderACD.queue.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(this.uploaderACD.queue[i]._file);
            reader.onload = () => {
                this.imgSrcPreview_ACD.push(reader.result);
            }
        }
    }
    loadPreviewGPLX() {
        this.imgSrcPreview_GPLX = [];
        for (let i = 0; i < this.uploaderGPLX.queue.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(this.uploaderGPLX.queue[i]._file);
            reader.onload = () => {
                this.imgSrcPreview_GPLX.push(reader.result);
            }
        }
    }
    loadPreviewSHK() {
        this.imgSrcPreview_SHK = [];
        for (let i = 0; i < this.uploaderSHK.queue.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(this.uploaderSHK.queue[i]._file);
            reader.onload = () => {
                this.imgSrcPreview_SHK.push(reader.result);
            }
        }
    }

    setNewFileName(old_FileName: string, order): string {
        order;
        // format: tentheomay_SDT_STT
        let nameOnly = old_FileName.slice(0, old_FileName.lastIndexOf('.'));
        let fileFormat = old_FileName.slice(old_FileName.lastIndexOf('.'));
        let newFileName = nameOnly + "_" + this.addEditForm.get('phoneNumber').value + "_" + order + fileFormat;
        return newFileName.replace(/ /g, '');
    }

    checkEmailPhone(event, type) {
        let searchParam = `{"searchParam": "` + event.target.value.toLowerCase() + `"}`;
        this.search(searchParam, type);
    }
    search(search, type) {
        switch (type) {
            case 'phone':
                if (this.addEditForm.get('phoneNumber').invalid) {
                    this.phoneValid = false;
                    this.toastrService.error("Số điện thoại không hợp lệ.", "Thông báo", {
                        closeButton: true,
                        tapToDismiss: true,
                    })
                }
                else {
                    this.checkPhone();
                }
                break;
            case 'email':
                if (this.addEditForm.get('email').invalid) {
                    this.mailValid = false;
                    this.toastrService.error("Email không hợp lệ.", "Thông báo", {
                        closeButton: true,
                        tapToDismiss: true,
                    })
                }
                else {
                    this.checkEmail();
                }
                break;
            default:
                this.toastrService.error("Đã xảy ra lỗi", "Thông báo")
        }
    }

    checkEmail() {
        let searchMode = new SearchModel();
        searchMode.searchParam = this.addEditForm.value.email;
        console.log(searchMode);


        this.accountService.GetByEmail(searchMode).subscribe(
            response => {
                if (response.data.length != 0) {
                    this.mailValid = false;
                    this.toastrService.error("Email đã được sử dụng", "Thông báo", {
                        disableTimeOut: true,
                        closeButton: true
                    });
                } else {
                    this.mailValid = true;
                    this.toastrService.success("Email có thể sử dụng!", '', { closeButton: true });
                }
            },
            error => console.log(error)
        );
    }

    checkPhone() {
        let account = new AccountViewModel();
        let phoneNumber = this.addEditForm.value.phoneNumber;
        account.accountCode = "LX" + phoneNumber;

        this.accountService.GetByAccCode(account).subscribe(
            response => {
                if (response.data.length != 0) {
                    this.phoneValid = false;
                    this.toastrService.error("Số điện thoại đã được sử dụng cho Lái xe", "Thông báo", {
                        disableTimeOut: true,
                        closeButton: true
                    });
                } else {
                    this.phoneValid = true;
                    this.toastrService.success("Số điện thoại có thể sử dụng!", '', { closeButton: true });
                }
            }
        );
    }

    Save(event) {
        if (this.isAdd) {
            if (this.uploaderACD.queue.length == 0) {
                this.toastrService.error("Chưa chọn ảnh chân dung");
            }
            if (this.uploaderCMND.queue.length == 0) {
                this.toastrService.error("Chưa chọn ảnh Chứng minh nhân dân/ Căn cước");
            }
            if (this.uploaderGPLX.queue.length == 0) {
                this.toastrService.error("Chưa chọn ảnh Giấy phép lái xe");
            }
            if (this.uploaderSHK.queue.length == 0) {
                this.toastrService.error("Chưa chọn ảnh Sổ hộ khẩu");
            }
            if (this.uploaderACD.queue.length > 0 && this.uploaderCMND.queue.length > 0
                && this.uploaderGPLX.queue.length > 0 && this.uploaderSHK.queue.length > 0) {
                this.toastrService.clear();
                this.groupImg();
                this.uploadFileToServer(this.uploaderACD.queue, 'acd');
                this.uploadFileToServer(this.uploaderCMND.queue, 'cmnd');
                this.uploadFileToServer(this.uploaderGPLX.queue, 'gplx');
                this.uploadFileToServer(this.uploaderSHK.queue, 'shk');
                this._entity = this.addEditForm.value;
                this.convert();
                this.driverViewModelChange.emit(this._entity);
                this.closeModalEvent.emit();
            }
        } else {
            this._entity.attachProperties = this.oldAttachPro;
            this._entity = this.addEditForm.value;
            this.convert();
            this.driverViewModelChange.emit(this._entity);
            this.closeModalEvent.emit();
        }
    }

    uploadFileToServer(data: Array<any>, type: string) {

        var frmImg = new FormData();
        for (let i = 0; i < data.length; i++)
            frmImg.append('files', data[i]._file, this.setNewFileName(data[i]._file.name, i));
        this.dataService.postFile('upload/' + type, frmImg).subscribe(
            response => {
                console.log(response);
            }
        );
    }
    convert() {
        this._entity.issueDate = new Date(this._entity.issueDate).getTime();
        this._entity.extIssueDate = new Date(this._entity.extIssueDate).getTime();
        this._entity.birthday = new Date(this._entity.birthday).getTime();
        this._entity.email = this._entity.email.toLowerCase();
    }
}
