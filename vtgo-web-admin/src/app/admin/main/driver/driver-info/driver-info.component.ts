import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Pipe } from '@angular/core';
import { DriverViewModel } from './../driver-model/driver.model';
import { DataService } from '../../../../core/services/data.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { Parser } from '@angular/compiler';
import { Driver } from 'selenium-webdriver/ie';
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
    uri = 'http://ngx-uploader.com/upload';
    uploader: FileUploader = new FileUploader({ url: this.uri });
    attachmentList: any = [];

    uploaderCMND: FileUploader = new FileUploader({ url: 'CMND' });
    attachmentListCMND: any = [];
    uploaderGPLX: FileUploader = new FileUploader({ url: 'GPLX' });
    attachmentListGPLX: any = [];
    uploaderACD: FileUploader = new FileUploader({ url: 'ACD' });
    attachmentListACD: any = [];
    uploaderSHK: FileUploader = new FileUploader({ url: 'SHK' });
    attachmentListSHK: any = [];

    @Input() set driverViewModel(driver: DriverViewModel) {
        if (driver.accountId !== 0) {
            this.isAdd = false;
            this._entity = new DriverViewModel();
            this._entity = driver;
            this.addEditForm.reset(driver);
            this.oldAttachPro = this._entity.attachProperties;
            console.log(this.oldAttachPro);
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
        private formBuilder: FormBuilder) {
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

            typeLicenseno: new FormControl(''),
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
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            // this.attachmentList.push(JSON.parse(response));
        };
        this.uploaderCMND.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            // this.attachmentListCMND.push(JSON.parse(response));
        };
        this.uploaderGPLX.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            // this.attachmentListGPLX.push(JSON.parse(response));
        };
        this.uploaderSHK.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            // this.attachmentListSHK.push(JSON.parse(response));
        };
        this.uploaderACD.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            // this.attachmentListACD.push(JSON.parse(response));
        }
    }

    ngOnInit() {
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
        this.uploader.queue.length = 0;
        this.addEditForm.controls.attachProperties.value.CMND.length = 0;
        this.addEditForm.controls.attachProperties.value.ACD.length = 0;
        this.addEditForm.controls.attachProperties.value.GPLX.length = 0;
        this.addEditForm.controls.attachProperties.value.SHK.length = 0;
        this.uploaderCMND.queue.forEach(el => this.addEditForm.controls.attachProperties.value.CMND.push(el.file.name));
        this.uploaderACD.queue.forEach(el => this.addEditForm.controls.attachProperties.value.ACD.push(el.file.name));
        this.uploaderGPLX.queue.forEach(el => this.addEditForm.controls.attachProperties.value.GPLX.push(el.file.name));
        this.uploaderSHK.queue.forEach(el => this.addEditForm.controls.attachProperties.value.SHK.push(el.file.name));
    }
    // setAttachProp() {
    //     let data = {};
    //     for (let index = 0; index < this.uploader.queue.length; index++) {
    //         const element = this.uploader.queue[index];
    //         data[index] = { attachCode: element.url, attachName: element.file.name, attachPath: '../IMAGE/' + element.url + '/' }
    //     }
    //     this.addEditForm.get('attachProperties').setValue(data);
    // }

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

                    this.dataService.Post('driver/search', search).subscribe(
                        response => {
                            if (response.data.length === 0) {
                                this.phoneValid = true;
                                this.toastrService.clear();
                                this.toastrService.success("Số điện thoại có thể sử dụng!", "Thông báo", {
                                    closeButton: true,
                                    extendedTimeOut: 1000
                                });
                            } else {
                                this.phoneValid = false;
                                this.toastrService.clear();
                                this.toastrService.error("Số điện thoại đã được sử dụng.", "Thông báo", {
                                    closeButton: true,
                                    tapToDismiss: true,
                                    // disableTimeOut: true
                                });
                            }
                        }
                    );
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
                    this.dataService.Post('driver/search', search).subscribe(
                        response => {
                            if (response.data.length === 0) {
                                this.mailValid = true;
                                this.toastrService.clear();
                                this.toastrService.success(type + " có thể sử dụng!", "Thông báo", {
                                    closeButton: true,
                                    extendedTimeOut: 1000
                                });
                            } else {
                                this.mailValid = false;
                                this.toastrService.clear();
                                this.toastrService.error(type + " đã được sử dụng.", "Thông báo", {
                                    closeButton: true,
                                    tapToDismiss: true,
                                    // disableTimeOut: true
                                });
                            }
                        }
                    );
                }
                break;
            default:
                this.toastrService.error("Đã xảy ra lỗi", "Thông báo")
        }
    }

    Save(event) {
        if (this.isAdd)
            console.log('add new img');

        // this.setAttachProp();
        this._entity = this.addEditForm.value;

        if (!this.isAdd)
            this._entity.attachProperties = this.oldAttachPro;
        this.convert();

        // console.log(this.uploader);
        //console.log("Img uploading...")
        // uploader.uploadAll();
        console.log(this._entity);
        console.log(this.uploaderCMND);

        this.driverViewModelChange.emit(this._entity);
        this.closeModalEvent.emit();
    }


    convert() {
        this._entity.issueDate = new Date(this._entity.issueDate).getTime();
        this._entity.extIssueDate = new Date(this._entity.extIssueDate).getTime();
        this._entity.birthday = new Date(this._entity.birthday).getTime();
        this._entity.email = this._entity.email.toLowerCase();
    }
}
