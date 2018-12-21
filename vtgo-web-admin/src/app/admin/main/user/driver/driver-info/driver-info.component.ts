import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Pipe, Inject } from '@angular/core';
import { DriverViewModel } from './../driver-model/driver.model';
import {
    DataService, AccountService,
    AccountTypeConstant, AccountViewModel,
    IAccountServiceToken
} from 'src/app/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { Parser } from '@angular/compiler';
import { Driver } from 'selenium-webdriver/ie';
import { ICategoryService, ICategoryServiceToken, SearchModel, IAddressServiceToken, IAddressService } from 'src/app/core';
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
    lstEthnic: any;
    lstContry: any;
    lstProvince: any;
    lstProvince2: any;
    lstTown: any;
    lstTown2: any;
    addrwards: any;
    addrwards2: any;
    lstTypeLicense: any;



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
            console.log(this._entity);
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
        private dataService: DataService,
        private toastrService: ToastrService,
        private formBuilder: FormBuilder,
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
        this.searchEthnic = new SearchModel();
        this.searchEthnic.searchParam2 = 4;
        this.categoryService.Get(this.searchEthnic).subscribe(
            (response: any) => {
                this.lstEthnic = response.data;
            }
        )
        this.searchEthnic.searchParam2 = -1;
        this.addressService.getProvince(this.searchEthnic).subscribe(
            (response: any) => {
                this.lstContry = response.data;
            }
        )
        this.searchEthnic.searchParam2 = 0;
        this.addressService.getProvince(this.searchEthnic).subscribe(
            (response: any) => {
                this.lstProvince = response.data;
                this.lstProvince2 = response.data;
            }
        )
        this.searchEthnic.searchParam2 = 6;
        this.categoryService.Get(this.searchEthnic).subscribe(
            (response: any) => {
                this.lstTypeLicense = response.data;
            }
        )
    }


    ChangingValue(event) {
        this.searchEthnic.searchParam2 = event.target.value;
        this.addressService.getProvince(this.searchEthnic).subscribe(
            (response: any) => {
                this.lstProvince = response.data;
            }
        )
    }

    ChangingValue2(event) {
        this.searchEthnic.searchParam2 = event.target.value;
        this.addressService.getProvince(this.searchEthnic).subscribe(
            (response: any) => {
                this.lstProvince2 = response.data;
            }
        )
    }

    ChagingValueProvince(event) {
        console.log(event.target.value);
        this.searchEthnic.searchParam2 = event.target.value;
        this.addressService.getProvince(this.searchEthnic).subscribe(
            (response: any) => {
                this.lstTown = response.data;
            }
        )
    }

    ChagingValueProvince2(event) {
        console.log(event.target.value);
        this.searchEthnic.searchParam2 = event.target.value;
        this.addressService.getProvince(this.searchEthnic).subscribe(
            (response: any) => {
                this.lstTown2 = response.data;
            }
        )
    }

    ChagingValueDistrict(event) {
        this.searchEthnic.searchParam2 = event.target.value;
        this.addressService.getProvince(this.searchEthnic).subscribe(
            (response: any) => {
                this.addrwards = response.data;
            }
        )
    }

    ChagingValueDistrict2(event) {
        this.searchEthnic.searchParam2 = event.target.value;
        this.addressService.getProvince(this.searchEthnic).subscribe(
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
        this.uploaderCMND.queue.forEach(el => this.addEditForm.controls.attachProperties.value.CMND.push(el.file.name));
        this.uploaderACD.queue.forEach(el => this.addEditForm.controls.attachProperties.value.ACD.push(el.file.name));
        this.uploaderGPLX.queue.forEach(el => this.addEditForm.controls.attachProperties.value.GPLX.push(el.file.name));
        this.uploaderSHK.queue.forEach(el => this.addEditForm.controls.attachProperties.value.SHK.push(el.file.name));
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
                    this.phoneValid = false;
                    this.toastrService.error("Email đã được sử dụng", "Thông báo", {
                        disableTimeOut: true,
                        closeButton: true
                    });
                } else {
                    this.phoneValid = true;
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
            },
            error => console.log(error)
        );
    }

    Save(event) {
        if (this.uploaderACD.queue.length == 0) {
            this.toastrService.error("Chưa chọn Ảnh chân dung");
        }
        if (this.uploaderCMND.queue.length == 0) {
            this.toastrService.error("Chưa chọn Chứng minh nhân dân/ Căn cước");
        }
        if (this.uploaderGPLX.queue.length == 0) {
            this.toastrService.error("Chưa chọn ảnh Giấy phép lái xe");
        }
        if (this.uploaderSHK.queue.length == 0) {
            this.toastrService.error("Chưa chọn ảnh Sổ hộ khẩu");
        }
        if (this.uploaderACD.queue.length > 0 && this.uploaderCMND.queue.length > 0
            && this.uploaderGPLX.queue.length > 0 && this.uploaderSHK.queue.length > 0) {
            if (this.isAdd) {
                this.uploadFileToServer(this.uploaderACD.queue, 'acd');
                this.uploadFileToServer(this.uploaderCMND.queue, 'cmnd');
                this.uploadFileToServer(this.uploaderGPLX.queue, 'gplx');
                this.uploadFileToServer(this.uploaderSHK.queue, 'shk');
            }
            else
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
            frmImg.append('files', data[i]._file);
        this.dataService.postFile('upload/' + type, frmImg).subscribe(
            response => {
                console.log(response);
                // this.toastrService.success("Tải " + type + " lên ảnh thành công!", "Thông báo", {
                //     closeButton: true,
                //     tapToDismiss: true,
                // })
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
