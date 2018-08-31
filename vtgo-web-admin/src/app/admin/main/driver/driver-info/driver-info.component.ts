import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Pipe } from '@angular/core';
import { DriverViewModel } from './../driver-model/driver.model';
// import * as $ from 'jquery';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss']
})
export class DriverInfoComponent implements OnInit {
  _entity: DriverViewModel;

  @Input() set driverViewModel(driver: DriverViewModel) {
    if (driver !== null || driver !== undefined) {
      this._entity = new DriverViewModel();
      this._entity = driver;
      this.addEditForm.reset(driver);
    } else
      this.addEditForm.reset();
  };
  @Output() driverViewModelChange = new EventEmitter<DriverViewModel>();
  public addEditForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addEditForm = this.formBuilder.group({
      accountId: new FormControl(''),
      fullName: new FormControl(''),
      nationality: new FormControl(''),
      licenseNo: new FormControl(''),
      issueDate: new FormControl(''),
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
      extIssueDate: new FormControl(''),
      extIssueBy: new FormControl(''),

      attachProperties: this.formBuilder.group({
        CMND: new FormControl(''),
        ACD: new FormControl(''),
        GPLX: new FormControl(''),
        SHK: new FormControl(''),
      }),

      properties: new FormControl(''),
      vehicleId: new FormControl(''),
      state: new FormControl(''),
      birthday: new FormControl('')
    });
  }

  ngOnInit() {
  }


  Save(event) {
    // event.preventDefault();
    this._entity = this.addEditForm.value;
    this.convert();
    this.driverViewModelChange.emit(this._entity);


    //   if (this.addEditForm.valid) {
    //     console.log(this.addEditForm.value);
    //   } else {
    //     console.log("error!");
    //   }
  }
  strIssueDate: any;

  convert() {
    this.strIssueDate = this._entity.issueDate.toString().split('-').join('');
    this._entity.issueDate = parseInt(this.strIssueDate);

    this.strIssueDate = this._entity.extIssueDate.toString().split('-').join('');
    this._entity.extIssueDate = parseInt(this.strIssueDate);
  }
}
