import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  PersonalViewModel,
  DataService, SearchModel,
  ICategoryServiceToken, ICategoryService,
  IAddressServiceToken, IAddressService,
  IBankListService, IBankListServiceToken, AddressCategoryModel, IBanksServiceToken, IBanksService
} from '../../../../../core';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyFormatter } from '../../../../../core/services/format-date.service';
import { FileUploader } from 'ng2-file-upload';
import { AddressConstant } from 'src/app/core/constant/address.constant.modal';
import { ToastrService } from 'ngx-toastr';

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

  addrProvince: AddressCategoryModel = new AddressCategoryModel();
  addrDistrict: AddressCategoryModel = new AddressCategoryModel();
  addrCommune: AddressCategoryModel = new AddressCategoryModel();

  //to get,set Address
  addressConstant = new AddressConstant();
  searchAddress = new SearchModel();;
  lstAddress_Country = [{ id: 1, name: "Việt Nam" }];
  lstAddress_Province = [];
  lstAddress_District = [];
  lstAddress_Wards = [];

  lstContactAddress_Country = [{ id: 1, name: "Việt Nam" }];
  lstContactAddress_Province = [];
  lstContactAddress_District = [];
  lstContactAddress_Wards = [];

  searchEthnic: SearchModel;
  lstEthnic = [];

  lstBank = [];

  imgSrcPreview_SHK = [];
  imgSrcPreview_CMND = [];
  imgSrcPreview_GPKDVT = [];
  imgSrcPreview_GPDHVT = [];


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

  // Form Group
  public addEditForm: FormGroup;

  /* Ctor */
  constructor(
    private dataService: DataService,
    private toastrService: ToastrService,
    private modalServices: NgbModal,
    @Inject(ICategoryServiceToken) private categoryService: ICategoryService,
    @Inject(IBanksServiceToken) private banksService: IBanksService,
    @Inject(IAddressServiceToken) private addressService: IAddressService,
    @Inject(IBankListServiceToken) private bankListService: IBankListService,
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

    this.getEthnic();
    this.getBankList();
    this.getAllProvince();
    if (!this.isAdd) {
      this.loadAddress();
    }

  }

  onSave(event) {
    this._entity = this.addEditForm.value;
    this.convert();
    if (this.isAdd) {
      if (this.uploaderCMND.queue.length == 0) {
        this.toastrService.error("Chưa chọn ảnh Chứng minh/ Căn cước");
      }
      if (this.uploaderSHK.queue.length == 0) {
        this.toastrService.error("Chưa chọn ảnh Sổ hộ khẩu");
      }
      if (this.uploaderGPKDVT.queue.length == 0) {
        this.toastrService.error("Chưa chọn ảnh Giấy giấy đăng ký vận tải");
      }
      if (this.uploaderGPDHVT.queue.length == 0) {
        this.toastrService.error("Chưa chọn ảnh Giấy điều hành vận tải");
      }
      if (this.uploaderCMND.queue.length > 0 && this.uploaderSHK.queue.length > 0
        && this.uploaderGPKDVT.queue.length > 0 && this.uploaderGPDHVT.queue.length > 0) {
        this.groupImg();
        this.uploadFileToServer(this.uploaderCMND.queue, 'cmnd');
        this.uploadFileToServer(this.uploaderSHK.queue, 'shk');
        this.uploadFileToServer(this.uploaderGPKDVT.queue, 'gpkdvt');
        this.uploadFileToServer(this.uploaderGPDHVT.queue, 'gpdhvt');
        this._entity.vehicleOwnerType = 1;
        this.personViewModelChange.emit(this._entity);
        this.closeForm.emit();
      }
    }
    else {
      this._entity.attachProperties = this.oldAttachPro;
      this._entity.vehicleOwnerType = 1;
      this.personViewModelChange.emit(this._entity);
      this.closeForm.emit();
    }
  }

  getEthnic() {
    //get Ethnic list
    this.searchEthnic = new SearchModel();
    this.searchEthnic.searchParam2 = 4;
    this.categoryService.Get(this.searchEthnic).subscribe(
      (response: any) => {
        this.lstEthnic = response.data;
      }
    );
  }

  getAllProvince() {
    let searchPr = new AddressCategoryModel();
    this.addressService.getProvince(searchPr).subscribe(
      (response: any) => {
        this.lstAddress_Province = response.data;
        this.lstContactAddress_Province = response.data;
      }
    );
  }

  getBankList() {
    let searchBanks = new SearchModel();
    this.banksService.GetBankList(searchBanks).subscribe(
      response => {
        if (response.data != null)
          this.lstBank = response.data;
      }
    );
  }

  loadAddress() {
    console.log(this._entity);

    //Load Address district
    if (Object.values(this._entity.address)[2] != null) {
      this.addrDistrict.codeId = Object.values(this._entity.address)[2];
      this.addressService.getDistrict(this.addrDistrict).subscribe(
        (response: any) => {
          this.lstAddress_District = response.data;
        }
      );
    }
    // Load Address Ward
    if (Object.values(this._entity.address)[4] != null) {
      this.addrCommune.codeId = Object.values(this._entity.address)[4];
      this.addressService.getCommune(this.addrCommune).subscribe(
        (response: any) => {
          this.lstAddress_Wards = response.data;
        }
      );
    }

    //Load contact Address district
    if (Object.values(this._entity.contactAddress)[1] != null) {
      this.addrDistrict.codeId = Object.values(this._entity.contactAddress)[1];
      this.addressService.getDistrict(this.addrDistrict).subscribe(
        (response: any) => {
          this.lstContactAddress_District = response.data;
        }
      );
    }
    // Load contact Address Ward
    if (Object.values(this._entity.contactAddress)[4] != null) {
      this.addrCommune.codeId = Object.values(this._entity.contactAddress)[4];
      this.addressService.getCommune(this.addrCommune).subscribe(
        (response: any) => {
          this.lstContactAddress_Wards = response.data;
        }
      );
    }

  }


  //On select change => reload list province address
  addressCountryChange(event) {

  }
  //reload District
  addressProvinceChange(event) {
    this.addrDistrict.codeId = event.target.value;
    this.addressService.getDistrict(this.addrDistrict).subscribe(
      (response: any) => {
        this.lstAddress_District = response.data;
        this.lstAddress_District.unshift('');
        this.lstAddress_Wards = [];
      }
    )
  }
  //reload Ward
  addressDistrictChange(event) {
    this.addrCommune.codeId = event.target.value;
    this.addressService.getCommune(this.addrCommune).subscribe(
      (response: any) => {
        this.lstAddress_Wards = response.data;
      }
    )
  }

  /////////////////////////////////////////////////contact Addr
  //get list Province of Contact Address
  contactAddressCountryChange(event) {

  }

  contactAddressProvinceChange(event) {
    this.addrDistrict.codeId = event.target.value;
    this.addressService.getDistrict(this.addrDistrict).subscribe(
      (response: any) => {
        this.lstContactAddress_District = response.data;
        this.lstContactAddress_District.unshift('');
        this.lstContactAddress_Wards = [];
      }
    )
  }
  contactAddressDistrictChange(event) {
    this.addrCommune.codeId = event.target.value;
    this.addressService.getCommune(this.addrCommune).subscribe(
      (response: any) => {
        this.lstContactAddress_Wards = response.data;
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

  groupImg() {
    if (this.addEditForm.controls.attachProperties.value.CMND.length)
      this.addEditForm.controls.attachProperties.value.CMND.length = 0;
    if (this.addEditForm.controls.attachProperties.value.SHK.length)
      this.addEditForm.controls.attachProperties.value.SHK.length = 0;
    if (this.addEditForm.controls.attachProperties.value.GPKDVT.length)
      this.addEditForm.controls.attachProperties.value.GPKDVT.length = 0;
    if (this.addEditForm.controls.attachProperties.value.GPDHVT.length)
      this.addEditForm.controls.attachProperties.value.GPDHVT.length = 0;
    this.uploaderCMND.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.CMND.push(this.setNewFileName(el.file.name, index)));
    this.uploaderSHK.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.SHK.push(this.setNewFileName(el.file.name, index)));
    this.uploaderGPKDVT.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.GPKDVT.push(this.setNewFileName(el.file.name, index)));
    this.uploaderGPDHVT.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.GPDHVT.push(this.setNewFileName(el.file.name, index)));
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

  loadPreviewGPKDVT() {
    this.imgSrcPreview_GPKDVT = [];
    for (let i = 0; i < this.uploaderGPKDVT.queue.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(this.uploaderGPKDVT.queue[i]._file);
      reader.onload = () => {
        this.imgSrcPreview_GPKDVT.push(reader.result);
      }
    }
  }
  loadPreviewGPDHVT() {
    this.imgSrcPreview_GPDHVT = [];
    for (let i = 0; i < this.uploaderGPDHVT.queue.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(this.uploaderGPDHVT.queue[i]._file);
      reader.onload = () => {
        this.imgSrcPreview_GPDHVT.push(reader.result);
      }
    }
  }

  setNewFileName(old_FileName: string, order): string {
    // ++order;
    // format: tentheomay_SDT_STT
    let nameOnly = old_FileName.slice(0, old_FileName.lastIndexOf('.'));
    let fileFormat = old_FileName.slice(old_FileName.lastIndexOf('.'));
    let newFileName = nameOnly + "_" + this.addEditForm.get('contactPhone').value + "_" + order + fileFormat;
    return newFileName.replace(/ /g, '');
  }
  uploadFileToServer(data: Array<any>, type: string) {

    var frmImg = new FormData();
    for (let i = 0; i < data.length; i++)
      frmImg.append('files', data[i]._file, this.setNewFileName(data[i]._file.name, i));
    this.dataService.postFile('upload/' + type, frmImg).subscribe(
      response => {
        console.log(response.data);
      }
    );
  }



  convert() {
    if (this._entity.email != null)
      this._entity.email = this._entity.email.toLowerCase();
    if (this._entity.contactPersonEmail != null)
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
  }

}
