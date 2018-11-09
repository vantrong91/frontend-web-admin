import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalViewModel, DataService } from '../../../../core';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyFormatter } from '../../../../core/services/format-date.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: MyFormatter }]
})
export class PersonalComponent implements OnInit {
  //upload Img
  uploaderSHK: FileUploader = new FileUploader({ url: '' });
  uploaderCMND: FileUploader = new FileUploader({ url: '' });
  uploaderGPKDVT: FileUploader = new FileUploader({ url: '' });
  uploaderGPDHVT: FileUploader = new FileUploader({ url: '' });

  oldAttachPro: any;
  imgUrl = '';
  ulrImgFull = '';
  imgName = '';

  isAdd = false; //isAdd =true => add new;  flase => edit

  /* Private Vảiables */
  _entity: PersonalViewModel;

  /* Public Variables */
  @Input()
  set personViewModel(personal: PersonalViewModel) {
    if (personal.accountId != null) {
      this.oldAttachPro = personal.attachProperties;
      this._entity = new PersonalViewModel();
      this._entity = personal;
      this.isAdd = false;
      if (personal && personal.bankAccountLst && personal.bankAccountLst.length > 0) {
        const bankAccountLstGroups = personal.bankAccountLst.map((bankAccount: any) => {
          return this.formBuilder.group(bankAccount);
        });
        const bankAccountLstArrays = this.formBuilder.array(bankAccountLstGroups);
        this.addEditForm.setControl('bankAccountLst', bankAccountLstArrays);
      }
      this.addEditForm.reset(personal);
    } else {
      this.isAdd = true;
      this.addEditForm.reset();
    }
  }
  @Input() noneShow: boolean;
  @Output() personViewModelChange = new EventEmitter<PersonalViewModel>();
  @Output() closeForm = new EventEmitter<any>();
  datePickerConfig = {
    format: 'DD/MM/YYYY'
  };
  bankList = [{
    'bankCode': 'MBB',
    'bankName': 'Ngân hàng quân đội'
  },
  {
    'bankCode': 'VPB',
    'bankName': 'Ngân hàng VPbank'
  }];
  // Form Group
  public addEditForm: FormGroup;

  /* Ctor */
  constructor(
    private dataService: DataService,
    private modalServices: NgbModal,
    private formBuilder: FormBuilder) {
    this.addEditForm = this.formBuilder.group({
      accountId: new FormControl(''),
      fullName: new FormControl('', [Validators.required]),
      contactPhone: new FormControl(''),
      email: new FormControl(''),
      contactPerson: new FormControl(''),
      contactPersonPhone: new FormControl(''),
      contactPersonEmail: new FormControl(''),
      // businessLicense: new FormControl(''),
      // businessLicenseIssueDate: new FormControl(new Date()),
      // businessLicenseIssueBy: new FormControl(''),
      moderator: new FormControl(''),
      moderatorLicense: new FormControl(''),
      moderatorLicenseIssueDate: new FormControl(new Date()),
      moderatorLicenseExpDate: new FormControl(new Date()),

      businessTransportLicense: new FormControl(''),
      businessTransportLicenseIssueDate: new FormControl(new Date()),
      businessTransportLicenseExpDate: new FormControl(new Date()),

      nationality: new FormControl(''),
      licenseNo: new FormControl(''),
      issueDate: new FormControl(''),
      issueBy: new FormControl(''),
      gender: new FormControl(''),
      ethnic: new FormControl(''),
      vehicleOwnerType: new FormControl(''),
      bankAccountLst: new FormArray([this.initBankArray()]),
      address: this.initAddress(),
      contactAddress: this.initContactAddress(),
      attachProperties: this.formBuilder.group({
        CMND: new FormArray([]),
        SHK: new FormArray([]),
        GPKDVT: new FormArray([]),
        GPDHVT: new FormArray([])
      }),
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
    this._entity = this.addEditForm.value;
    this.convert();
    if (this.isAdd) {
      console.log('add new img');
      this.uploadFileToServer(this.uploaderCMND.queue, 'cmnd');
      this.uploadFileToServer(this.uploaderSHK.queue, 'shk');
      this.uploadFileToServer(this.uploaderGPKDVT.queue, 'gpkdvt');
      this.uploadFileToServer(this.uploaderGPDHVT.queue, 'gpdhvt');
    }
    else {
      this._entity.attachProperties = this.oldAttachPro;
    }
    // if (this.addEditForm.valid) {
      this._entity.vehicleOwnerType = 1;
    this.personViewModelChange.emit(this._entity);
    this.closeForm.emit();
    // }
  }

  //show img
  getUrlImg(folder: string) {
    this.imgUrl = this.dataService.GetBaseUrlImg(folder) + '/';
    return this.imgUrl;
  }
  openImg(ele, imgUrl, fileName) {
    this.ulrImgFull = imgUrl + fileName;
    this.imgName = fileName;
    this.modalServices
      .open(ele, { windowClass: 'dark-modal', size: 'lg' });
  }

  //select+upload file

  groupImg() {
    if (this.addEditForm.controls.attachProperties.value.CMND.length)
      this.addEditForm.controls.attachProperties.value.CMND.length = 0;
    if (this.addEditForm.controls.attachProperties.value.SHK.length)
      this.addEditForm.controls.attachProperties.value.SHK.length = 0;
    if (this.addEditForm.controls.attachProperties.value.GPKDVT.length)
      this.addEditForm.controls.attachProperties.value.GPKDVT.length = 0;
    if (this.addEditForm.controls.attachProperties.value.GPDHVT.length)
      this.addEditForm.controls.attachProperties.value.GPDHVT.length = 0;
    this.uploaderCMND.queue.forEach(el => this.addEditForm.controls.attachProperties.value.CMND.push(el.file.name));
    this.uploaderSHK.queue.forEach(el => this.addEditForm.controls.attachProperties.value.SHK.push(el.file.name));
    this.uploaderGPKDVT.queue.forEach(el => this.addEditForm.controls.attachProperties.value.GPKDVT.push(el.file.name));
    this.uploaderGPDHVT.queue.forEach(el => this.addEditForm.controls.attachProperties.value.GPDHVT.push(el.file.name));
  }
  uploadFileToServer(data: Array<any>, type: string) {

    var frmImg = new FormData();
    for (let i = 0; i < data.length; i++)
      frmImg.append('files', data[i]._file);
    this.dataService.postFile('upload/' + type, frmImg).subscribe(
      response => {
        console.log(response.data);
      }
    );
  }


  convert() {
    this._entity.email = this._entity.email.toLowerCase();
    this._entity.contactPersonEmail = this._entity.contactPersonEmail.toLowerCase();

    this._entity.businessTransportLicenseExpDate = new Date(this._entity.businessTransportLicenseExpDate.month + '/' + this._entity.businessTransportLicenseExpDate.day + '/' + this._entity.businessTransportLicenseExpDate.year).getTime();
    this._entity.businessTransportLicenseIssueDate = new Date(this._entity.businessTransportLicenseIssueDate.month + '/' + this._entity.businessTransportLicenseIssueDate.day + '/' + this._entity.businessTransportLicenseIssueDate.year).getTime();

    this._entity.moderatorLicenseIssueDate = new Date(this._entity.moderatorLicenseIssueDate.month + '/' + this._entity.moderatorLicenseIssueDate.day + '/' + this._entity.moderatorLicenseIssueDate.year).getTime();
    this._entity.moderatorLicenseExpDate = new Date(this._entity.moderatorLicenseExpDate.month + '/' + this._entity.moderatorLicenseExpDate.day + '/' + this._entity.moderatorLicenseExpDate.year).getTime();
    this._entity.issueDate = new Date(this._entity.issueDate.month + '/' + this._entity.issueDate.day + '/' + this._entity.issueDate.year).getTime();
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
      householdNo: new FormControl(),
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


  initData() {
    this.addEditForm.reset(this.obj());
  }

  obj() {
    return JSON.parse(`
    {
      "fullName": "Nguyen Van Hoang",
      "director": "Pham Huu Nam",
      "taxCode": 1111,
      "contactPhone": "017577799",
      "email": "EmlNamePersional@gmail.com",
      "fax": 22222,
      "website": "Nam.vn",
      "contactPerson": "tennguoilienhe",
      "contactPersonPhone": "sdtlenhe",
      "contactPersonEmail": "emaillienhe",

      "moderator": "tennguoidieuhanh",
      "moderatorLicense": "sogiayphepdieuhanh",
      "businessTransportLicense": 33333,
      "businessTransportLicenseIssueDate":  {
        "year": 2012,
        "month": 2,
        "day": 2
      },
      "businessTransportLicenseExpDate":  {
        "year": 2013,
        "month": 3,
        "day": 3
      },
      "moderatorLicenseIssueDate": {
        "year": 2014,
        "month": 4,
        "day": 4
      },
      "moderatorLicenseExpDate": {
        "year": 2015,
        "month": 5,
        "day": 5
      },
      "companyPhone": 2222,
      "nationality": "vietNam",
      "licenseNo": "123456",
      "issueDate": {
          "year": 2011,
          "month": 1,
          "day": 1
      },
      "issueBy": "NA",
      "gender": 1,
      "ethnic": "Kinh",
      "vehicleOwnerType": 1,
      "contactAddress": {
          "country": "VN",
          "province": "NA",
          "wards": "HD",
          "street": "sonhaduong",
          "district": "ND"
      },
      "address": {
          "country": "VN",
          "householdNo": "sohokhau",
          "province": "NA",
          "wards": "HD",
          "district": "ND"
      },
      "attachProperties": {
          "GPKDVT": ["tesss2.jpg"],
          "GPDHVT": ["tesss.jpg"],
          "SHK": ["tesss.jpg"],
          "CMND": ["cmnd2.jpg", "cmnd1.jpg"]
      },
      "bankAccountLst": [{
          "accountId": null,
          "bankCode": "AAAAA",
          "accountNumber": "999999999999",
          "branch": "NA",
          "ownerName": "van2"
      }, {
          "accountId": null,
          "bankCode": "",
          "accountNumber": "888888888888",
          "branch": "",
          "ownerName": "Van3"
      }, {
          "accountId": null,
          "bankCode": "CS",
          "accountNumber": "777777777777",
          "branch": "NA",
          "ownerName": "van1"
      }]
  }`);
  }
}
