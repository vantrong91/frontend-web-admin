import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Pipe } from '@angular/core';
import { DriverViewModel } from './../driver-model/driver.model';
import { DriverImg } from './../driver-model/driver-img.model'
import { DataService } from '../../../../core/services/data.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { Parser } from '@angular/compiler';
// import * as $ from 'jquery';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss']
})
export class DriverInfoComponent implements OnInit {
  _entity: DriverViewModel;
  emailPhoneValid = true;
  attNum = "0";
  uri = '..CMND/';
  uploader: FileUploader = new FileUploader({ url: this.uri });
  attachmentList: any = [];
  @Input() set driverViewModel(driver: DriverViewModel) {
    if (driver.accountId !== 0) {
      this._entity = new DriverViewModel();
      this._entity = driver;
      this.addEditForm.reset(driver);
    } else {
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
      fullName: new FormControl(''),
      nationality: new FormControl(''),
      licenseNo: new FormControl(''),
      issueDate: new FormControl('', Validators.required),
      issueBy: new FormControl(''),
      gender: new FormControl(''),
      ethnic: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      address: this.formBuilder.group({
        country: ['', Validators.required],
        province: ['', Validators.required],
        district: ['', Validators.required],
        wards: ['', Validators.required],
        householdNo: ['', Validators.required],
      }),

      contactAddress: this.formBuilder.group({
        country: new FormControl(''),
        province: new FormControl(''),
        district: new FormControl(''),
        wards: new FormControl(''),
        street: new FormControl(''),
      }),

      typeLicenseno: new FormControl(''),
      extLicenseNo: new FormControl(''),
      extIssueDate: new FormControl('', Validators.required),
      extIssueBy: new FormControl(''),
      attachProperties: new FormData(),
      properties: new FormControl(''),
      vehicleId: new FormControl(''),
      state: new FormControl(''),
      birthday: new FormControl('')
    });
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
    }
  }

  ngOnInit() {
  }
  selectFile(ev, code: string) {
    // console.log(this.uploader);
    // console.log(this.uploader.queue);

    let reader = new FileReader();
    if (ev.target.files && ev.target.files.length > 0) {
      let file = ev.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.addEditForm.get('attachProperties').setValue({
          attachPath: `../IMAGE/` + code + `/`,
          attachName: file.name,
          attachCode: code,
          // value: reader.result.split(',')[1]
        })
      };
    }

    console.log(this.addEditForm.get('attachProperties').value);
  }



  checkEmailPhone(event, type) {
    console.log(this.addEditForm);
    let searchParam = `{"searchParam": "` + event.target.value + `"}`;
    console.log("Checking phonenumber: " + searchParam);
    this.search(searchParam, type);
  }
  search(search, type) {
    this.dataService.Post('driver/search', search).subscribe(
      response => {
        console.log(response);
        if (response.data.length === 0) {
          // this.toastrService.clear();
          this.emailPhoneValid = true;
          this.toastrService.success(type + " có thể sử dụng", "Thông báo", {
            closeButton: true,
            extendedTimeOut: 1000
          });
        } else {
          this.emailPhoneValid = false;
          this.toastrService.error(type + " đã được sử dụng hoặc không hợp lệ...", "Thông báo", {
            closeButton: true,
            tapToDismiss: true,
            // disableTimeOut: true
          });
        }
      }
    );
  }

  Save(event) {
    // event.preventDefault();
    this._entity = this.addEditForm.value;
    this.convert();
    console.log(this._entity);
    this.driverViewModelChange.emit(this._entity);
    this.closeModalEvent.emit();
  }

  convert() {
    this._entity.issueDate = new Date(this._entity.issueDate).getTime();
    this._entity.extIssueDate = new Date(this._entity.extIssueDate).getTime();
  }
}
