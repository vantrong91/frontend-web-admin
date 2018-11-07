import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CompanyViewModel } from '../../../../core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MyFormatter } from '../../../../core/services/format-date.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: MyFormatter }]
})
export class CompanyComponent implements OnInit {

  fileChoseBusinessLicense = 'Choose file';
  fileChoseCompanySeal = 'Choose file';
  fileChoseBusinessTransport = 'Choose file';
  fileChoseModerator = 'Choose file';
  /* Private Vảiables */
  _entity: CompanyViewModel;
  /* Public Variables */
  @Input()
  set companyViewModel(company: CompanyViewModel) {
    if (company.accountId != 0) {
      this._entity = new CompanyViewModel();
      this._entity = company;
      if (company && company.bankAccountLst && company.bankAccountLst.length > 0) {
        const bankAccountLstGroups = company.bankAccountLst.map((bankAccount: any) => {
          return this.formBuilder.group(bankAccount);
        });
        const bankAccountLstArrays = this.formBuilder.array(bankAccountLstGroups);
        this.addEditForm.setControl('bankAccountLst', bankAccountLstArrays);
      }
      if (company && (company.attachProperties !== undefined || company.attachProperties !== null)) {
        const attachments = Object.keys(company.attachProperties).map(function (index) {
          const attachment = company.attachProperties[index];
          return attachment;
        });
        company.attachProperties = attachments;
        if (attachments && attachments.length > 0) {
          const attachmentGroups = attachments.map(attachment => {
            return this.formBuilder.group(attachment);
          });
          const attachmenttArrays = this.formBuilder.array(attachmentGroups);
          this.addEditForm.setControl('attachProperties', attachmenttArrays);
        }
      }
      this.addEditForm.reset(company);
    } else {
      // console.log(this.obj());
      this.addEditForm.reset();
    }
  }
  @Input() noneShow: boolean;
  @Output() personViewModelChange = new EventEmitter<CompanyViewModel>();
  datePickerConfig = {
    format: 'DD/MM/YYYY'
  };
  // Form Group
  public addEditForm: FormGroup;
  /* Ctor */
  constructor(private formBuilder: FormBuilder) {
    this.addEditForm = this.formBuilder.group({
      accountId: new FormControl(''),
      fullName: new FormControl('', [Validators.required]),
      director: new FormControl(''),
      taxCode: new FormControl(''),
      contactPhone: new FormControl(''),
      companyPhone: new FormControl(''),
      fax: new FormControl(''),
      website: new FormControl(''),
      email: new FormControl(''),
      contactPerson: new FormControl(''),
      contactPersonPhone: new FormControl(''),
      contactPersonEmail: new FormControl(''),
      businessLicense: new FormControl(''),
      businessLicenseIssueDate: new FormControl(new Date()),
      businessLicenseIssueBy: new FormControl(''),
      businessTransportLicense: new FormControl(''),
      businessTransportLicenseIssueDate: new FormControl(new Date()),
      businessTransportLicenseExpDate: new FormControl(new Date()),
      businessTransportLicenseIssueBy: new FormControl(''),
      moderator: new FormControl(''),
      moderatorLicense: new FormControl(''),
      moderatorLicenseIssueDate: new FormControl(new Date()),
      moderatorLicenseExpDate: new FormControl(new Date()),
      vehicleOwnerType: new FormControl(''),
      bankAccountLst: new FormArray([this.initBankArray()]),
      address: this.initAddress(),
      contactAddress: this.initContactAddress(),
      attachProperties: new FormArray([this.initAttachProperties()])
    });
  }

  ngOnInit() {
    if (this.noneShow) {
      this.addEditForm.disable();
    } else {
      this.addEditForm.enable();
    }
  }

  onSave(event) {
    // event.preventDefault();
    console.log(this.addEditForm.valid);

    // if (this.addEditForm.valid) {
      this._entity = this.addEditForm.value;
      this.convert();
      console.log(this._entity);
      this.personViewModelChange.emit(this._entity);
    // }
  }

  convert(){
    console.log(this._entity.businessLicenseIssueDate);
    this._entity.businessLicenseIssueDate = new Date(this._entity.businessLicenseIssueDate.month+'/'+this._entity.businessLicenseIssueDate.day+'/'+this._entity.businessLicenseIssueDate.year).getTime();
    this._entity.moderatorLicenseIssueDate = new Date(this._entity.moderatorLicenseIssueDate.month+'/'+this._entity.moderatorLicenseIssueDate.day+'/'+this._entity.moderatorLicenseIssueDate.year).getTime();
    this._entity.moderatorLicenseExpDate = new Date(this._entity.moderatorLicenseExpDate.month+'/'+this._entity.moderatorLicenseExpDate.day+'/'+this._entity.moderatorLicenseExpDate.year).getTime();
    this._entity.businessTransportLicenseIssueDate = new Date(this._entity.businessTransportLicenseIssueDate.month+'/'+this._entity.businessTransportLicenseIssueDate.day+'/'+this._entity.businessTransportLicenseIssueDate.year).getTime();
    this._entity.businessTransportLicenseExpDate = new Date(this._entity.businessTransportLicenseExpDate.month+'/'+this._entity.businessTransportLicenseExpDate.day+'/'+this._entity.businessTransportLicenseExpDate.year).getTime();
    // // // // this._entity.issueDate = new Date(this._entity.issueDate.month+'/'+this._entity.issueDate.day+'/'+this._entity.issueDate.year).getTime();    
  }

  checkDisabled() {
    if (this.noneShow === true) {
      return true;
    } else {
      return null;
    }
  }

  initAttachProperties() {
    return this.formBuilder.group({
      attachCode: new FormControl(),
      attachName: new FormControl(),
      attachPath: new FormControl()
    });
  }

  initBankArray() {
    return this.formBuilder.group({
      bankCode: new FormControl(),
      branch: new FormControl(),
      accountNumber: new FormControl(),
      ownerName: new FormControl()
    });
  }

  initAddress() {
    return this.formBuilder.group({
      country: new FormControl(),
      district: new FormControl(),
      province: new FormControl(),
      street: new FormControl(),
      wards: new FormControl()
    });
  }

  initContactAddress() {
    return this.formBuilder.group({
      country: new FormControl(),
      district: new FormControl(),
      province: new FormControl(),
      street: new FormControl(),
      wards: new FormControl()
    });
  }

  fileEvent(event) {
    const getFiles = event.target.files;
    if (getFiles.length !== null) {
      if (getFiles.length === 1) {
        return getFiles[0].name;
      } else {
        return 'So file da chon ' + getFiles.length + '(hover mouse watch name file)';
      }
    }
  }
  fileChoseBusiness(event) {
    this.fileChoseBusinessLicense = this.fileEvent(event);
  }

  fileCompanySeal(event) {
    this.fileChoseCompanySeal = this.fileEvent(event);
  }
  fileBusinessTransport(event) {
    this.fileChoseBusinessTransport = this.fileEvent(event);
  }
  fileModerator(event) {
    this.fileChoseModerator = this.fileEvent(event);
  }

  setDate(): void {
    // Set today date using the patchValue function
    const date = new Date();
    this.addEditForm.patchValue({
      myDate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  onAddBankGroup(event) {
    event.preventDefault();
    const banks = this.addEditForm.get('bankAccountLst') as FormArray;
    banks.push(this.initBankArray());
  }

  onRemoveBankGroup(event, groupIndex) {
    event.preventDefault();
    const banks = this.addEditForm.get('bankAccountLst') as FormArray;
    if (banks.length > 1) {
      banks.removeAt(groupIndex);
    }
  }
  onbusinessLicenseIssueDateSelect(event) { }


  initData() {

    this.addEditForm.reset(this.obj());
  }

  obj() {
    return JSON.parse(`
      {
        "fullName": "NameCompanyVV",
        "director": "tengiamdoc",
        "taxCode": "123456",
        "contactPhone": "07799999777",
        "email": "doanhnghiep12@gmail.com",
        "fax": "012344777",
        "website": "webcompany.vn",
        "contactPerson": "tennguoilienhe",
        "contactPersonPhone": "sdtlenhe",
        "contactPersonEmail": "emaillienhe",
        "businessLicense": "sogiayphepKDVT",
        "businessLicenseIssueDate": {
            "year": 2018,
            "month": 6,
            "day": 4
        },
        "businessLicenseIssueBy": "noicap",
        "moderator": "tennguoidieuhanh",
        "moderatorLicense": "sogiayphepdieuhanh",
        "moderatorLicenseIssueDate": {
            "year": 2018,
            "month": 6,
            "day": 4
        },
        "moderatorLicenseExpDate": {
            "year": 2018,
            "month": 6,
            "day": 4
        },
        "companyPhone": "0777797777",
        "businessTransportLicense": "12333",
        "businessTransportLicenseIssueDate": {
            "year": 2018,
            "month": 6,
            "day": 4
        },
        "businessTransportLicenseExpDate": {
          "year": 2011,
          "month": 1,
          "day": 1
      },
        "nationality": null,
        "licenseNo": null,
        "issueDate": 0,
        "issueBy": null,
        "gender": 0,
        "ethnic": null,
        "vehicleOwnerType": 0,
        "contactAddress": {
            "country": "VN",
            "province": "NA",
            "wards": "HD",
            "street": "sonhaduongCty",
            "district": "ND"
        },
        "address": {
            "country": "VN",
            "householdNo": "sonhaduogCty",
            "province": "NA",
            "wards": "HD",
            "district": "ND"
        },
        "attachProperties": {
            "DKKD": ["testavata.jpg", "tesss.jpg"],
            "GPKDVT": ["tesss2.jpg"],
            "DAUCT": ["tesss.jpg"],
            "GPDHVT": ["1538560824-458-13-1538556895-width650height458.png"]
        },
        "bankAccountLst": [{
            "accountId": null,
            "bankCode": "AAA",
            "accountNumber": "177777777337",
            "branch": "NA",
            "ownerName": "van2"
        }, {
            "accountId": null,
            "bankCode": "",
            "accountNumber": "111112233422444",
            "branch": "",
            "ownerName": "Van3"
        }, {
            "accountId": null,
            "bankCode": "CS",
            "accountNumber": "2022222222331",
            "branch": "NA",
            "ownerName": "van1"
        }]
    }`);
  }
}
