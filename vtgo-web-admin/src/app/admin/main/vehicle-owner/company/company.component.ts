import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {
  CompanyViewModel, DataService,
  SearchModel, AddressConstant,
  ICategoryServiceToken, ICategoryService,
  IAddressServiceToken, IAddressService,
  IBankListServiceToken, IBankListService
} from '../../../../core';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyFormatter } from '../../../../core/services/format-date.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: MyFormatter }]
})
export class CompanyComponent implements OnInit {

  //upload Img
  uploaderDKKD: FileUploader = new FileUploader({ url: '' });
  uploaderDAUCT: FileUploader = new FileUploader({ url: '' });
  uploaderGPKDVT: FileUploader = new FileUploader({ url: '' });
  uploaderGPDHVT: FileUploader = new FileUploader({ url: '' });

  oldAttachPro: any;
  imgUrl = '';
  ulrImgFull = '';
  imgName = '';

  isAdd = false; //isAdd =true => add new; flase => edit

  addressConstant=new AddressConstant();
  searchAddress: SearchModel;
  lstAddress_Country = [];
  lstAddress_Province = [];
  lstAddress_District = [];
  lstAddress_Wards = [];

  lstContactAddress_Country = [];
  lstContactAddress_Province = [];
  lstContactAddress_District = [];
  lstContactAddress_Wards = [];

  lstBank = [];

  /* Private Vảiables */
  _entity: CompanyViewModel;
  /* Public Variables */
  @Input()
  set companyViewModel(company: CompanyViewModel) {
    if (company.accountId != null) {
      this.isAdd = false;
      this._entity = new CompanyViewModel();
      this._entity = company;
      this.oldAttachPro = this._entity.attachProperties;

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
      console.log('add New');
      //add New
      this.isAdd = true;
      this.addEditForm.reset();
    }
  }
  @Input() noneShow: boolean;
  @Output() companyViewModelChange = new EventEmitter<CompanyViewModel>();
  @Output() closeEvent = new EventEmitter<any>();
  datePickerConfig = {
    format: 'DD/MM/YYYY'
  };
  // Form Group
  public addEditForm: FormGroup;
  /* Ctor */
  constructor(private dataService: DataService,
    private modalServices: NgbModal,
    @Inject(ICategoryServiceToken) private categoryService: ICategoryService,
    @Inject(IAddressServiceToken) private addressService: IAddressService,
    @Inject(IBankListServiceToken) private bankListService: IBankListService,

    private formBuilder: FormBuilder) {
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
      attachProperties: this.formBuilder.group({
        DKKD: new FormArray([]),
        DAUCT: new FormArray([]),
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
    this.searchAddress = new SearchModel();
    this.getCountryProvince();
    this.getBankList();

    if (!this.isAdd) {
      this.loadAddress();//to show + update
    }
  }


  onSave(event) {
    this._entity = this.addEditForm.value;
    this.convert();
    if (this.isAdd) {
      console.log('add new img');
      this.uploadFileToServer(this.uploaderDAUCT.queue, 'dauct');
      this.uploadFileToServer(this.uploaderDKKD.queue, 'dkkd');
      this.uploadFileToServer(this.uploaderGPKDVT.queue, 'gpkdvt');
      this.uploadFileToServer(this.uploaderGPDHVT.queue, 'gpdhvt');
    }
    else
      this._entity.attachProperties = this.oldAttachPro;
    this._entity.vehicleOwnerType = 0;
    this.companyViewModelChange.emit(this._entity);
    this.closeEvent.emit();
    // }
  }

  getCountryProvince() {
    //getAllCountry
    this.searchAddress.searchParam2 =this.addressConstant.COUNTRY;
    this.addressService.getProvince(this.searchAddress).subscribe(
      (response: any) => {
        this.lstAddress_Country = response.data;

        this.lstContactAddress_Country = response.data;
      }
    )

    //get ALL Province of VN
    this.searchAddress.searchParam2 = this.addressConstant.PROVINCE;
    this.addressService.getProvince(this.searchAddress).subscribe(
      (response: any) => {
        this.lstAddress_Province = response.data;
        this.lstContactAddress_Province = response.data;
      }
    );
  }

  getBankList() {
    this.bankListService.Get(new SearchModel).subscribe(
      response => {
        this.lstBank = response.data;
      },
      error => console.log(error)
    );
  }

  loadAddress() {
    // console.log(this._entity.address);
    // console.log(Object.values(this._entity.address));
    // console.log(this._entity.contactAddress);
    // console.log(Object.values(this._entity.contactAddress));

    //Load Address district
    if (Object.values(this._entity.address)[1] != null) {
      this.searchAddress.searchParam2 = Object.values(this._entity.address)[1];
      this.addressService.getProvince(this.searchAddress).subscribe(
        (response: any) => {
          this.lstAddress_District = response.data;
        }
      );
    }
    // Load Address Ward
    if (Object.values(this._entity.address)[4] != null) {
      this.searchAddress.searchParam2 = Object.values(this._entity.address)[4];
      this.addressService.getProvince(this.searchAddress).subscribe(
        (response: any) => {
          this.lstAddress_Wards = response.data;
        }
      );
    }

    //Load contact Address district
    if (Object.values(this._entity.contactAddress)[1] != null) {
      this.searchAddress.searchParam2 = Object.values(this._entity.contactAddress)[1];
      this.addressService.getProvince(this.searchAddress).subscribe(
        (response: any) => {
          this.lstContactAddress_District = response.data;
        }
      );
    }
    // Load contact Address Ward
    if (Object.values(this._entity.contactAddress)[4] != null) {
      this.searchAddress.searchParam2 = Object.values(this._entity.contactAddress)[4];
      this.addressService.getProvince(this.searchAddress).subscribe(
        (response: any) => {
          this.lstContactAddress_Wards = response.data;
        }
      );
    }

  }

  //On select change => reload list province address
  addressCountryChange(event) {
    console.log(event.target.value);

    this.searchAddress.searchParam2 = event.target.value;
    this.addressService.getProvince(this.searchAddress).subscribe(
      (response: any) => {
        this.lstAddress_Province = response.data;
        this.lstAddress_Province.unshift('');  
        // this.lstAddress_District = [];
        // this.lstAddress_Wards = [];
      }
    )
  }
  //reload District
  addressProvinceChange(event) {
    console.log(event.target.value);
    this.searchAddress.searchParam2 = event.target.value;
    this.addressService.getProvince(this.searchAddress).subscribe(
      (response: any) => {
        this.lstAddress_District = response.data;
        this.lstAddress_District.unshift('');
        this.lstAddress_Wards = [];
      }
    )
  }
  //reload Ward
  addressDistrictChange(event) {
    console.log(event.target.value);
    this.searchAddress.searchParam2 = event.target.value;
    this.addressService.getProvince(this.searchAddress).subscribe(
      (response: any) => {
        this.lstAddress_Wards = response.data;
        this.lstAddress_Wards.unshift('');
      }
    )
  }

  /////////////////////////////////////////////////contact Addr
  //get list Province of Contact Address
  contactAddressCountryChange(event) {
    this.searchAddress.searchParam2 = event.target.value;
    this.addressService.getProvince(this.searchAddress).subscribe(
      (response: any) => {
        this.lstContactAddress_Province = response.data;
        this.lstContactAddress_Province.unshift('');
        // this.lstContactAddress_District=[];
        // this.lstContactAddress_Wards = [];
      }
    )
  }

  contactAddressProvinceChange(event) {
    console.log(event.target.value);
    this.searchAddress.searchParam2 = event.target.value;
    this.addressService.getProvince(this.searchAddress).subscribe(
      (response: any) => {
        this.lstContactAddress_District = response.data;
        this.lstContactAddress_District.unshift('');
        this.lstContactAddress_Wards = [];
      }
    )
  }
  contactAddressDistrictChange(event) {
    this.searchAddress.searchParam2 = event.target.value;
    this.addressService.getProvince(this.searchAddress).subscribe(
      (response: any) => {
        this.lstContactAddress_Wards = response.data;
        this.lstContactAddress_Wards.unshift('');
      }
    )
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
  selectFile(code: string) {
    switch (code) {
      case 'DKKD':
        //upload Here!
        break;
      case 'DAUCT':
        break;
      case 'GPKDVT':
        break;
      case 'GPDHVT':
        break;
      default:
        alert("Đã xảy ra lỗi xin vui lòng thử lại!");
    }
    // console.log(this.uploader.queue);
    this.groupImg();
  }

  groupImg() {
    this.addEditForm.controls.attachProperties.value.DKKD.length = 0;
    this.addEditForm.controls.attachProperties.value.DAUCT.length = 0;
    this.addEditForm.controls.attachProperties.value.GPKDVT.length = 0;
    this.addEditForm.controls.attachProperties.value.GPDHVT.length = 0;
    this.uploaderDKKD.queue.forEach(el => this.addEditForm.controls.attachProperties.value.DKKD.push(el.file.name));
    this.uploaderDAUCT.queue.forEach(el => this.addEditForm.controls.attachProperties.value.DAUCT.push(el.file.name));
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
    this._entity.businessLicenseIssueDate = new Date(this._entity.businessLicenseIssueDate.month + '/' + this._entity.businessLicenseIssueDate.day + '/' + this._entity.businessLicenseIssueDate.year).getTime();
    this._entity.moderatorLicenseIssueDate = new Date(this._entity.moderatorLicenseIssueDate.month + '/' + this._entity.moderatorLicenseIssueDate.day + '/' + this._entity.moderatorLicenseIssueDate.year).getTime();
    this._entity.moderatorLicenseExpDate = new Date(this._entity.moderatorLicenseExpDate.month + '/' + this._entity.moderatorLicenseExpDate.day + '/' + this._entity.moderatorLicenseExpDate.year).getTime();
    this._entity.businessTransportLicenseIssueDate = new Date(this._entity.businessTransportLicenseIssueDate.month + '/' + this._entity.businessTransportLicenseIssueDate.day + '/' + this._entity.businessTransportLicenseIssueDate.year).getTime();
    this._entity.businessTransportLicenseExpDate = new Date(this._entity.businessTransportLicenseExpDate.month + '/' + this._entity.businessTransportLicenseExpDate.day + '/' + this._entity.businessTransportLicenseExpDate.year).getTime();
  }

  checkDisabled() {
    if (this.noneShow === true) {
      return true;
    } else {
      return null;
    }
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
        "fullName": "ThaiCompany",
        "director": "tengiamdoc",
        "taxCode": "123456",
        "contactPhone": "0999888111",
        "email": "ThaiCompany001@gmail.com",
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
