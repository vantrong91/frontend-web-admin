import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {
  CompanyViewModel, DataService,
  SearchModel, AddressConstant,
  ICategoryServiceToken, ICategoryService,
  IAddressServiceToken, IAddressService,
  IBankListServiceToken, IBankListService, AddressCategoryModel
} from '../../../../../core';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyFormatter } from '../../../../../core/services/format-date.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

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

  addressConstant = new AddressConstant();
  searchAddress: SearchModel;

  addrProvince: AddressCategoryModel = new AddressCategoryModel();
  addrDistrict: AddressCategoryModel = new AddressCategoryModel();
  addrCommune: AddressCategoryModel = new AddressCategoryModel();

  lstAddress_Country = [{ id: 1, name: "Việt Nam" }];
  lstAddress_Province = [];
  lstAddress_District = [];
  lstAddress_Wards = [];

  lstContactAddress_Country = [{ id: 1, name: "Việt Nam" }];
  lstContactAddress_Province = [];
  lstContactAddress_District = [];
  lstContactAddress_Wards = [];

  lstBank = [];

  imgSrcPreview_DKKD = [];
  imgSrcPreview_DAUCT = [];
  imgSrcPreview_GPKDVT = [];
  imgSrcPreview_GPDHVT = [];

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
    private toastrService: ToastrService,
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
    this.getAllProvince();
    this.getBankList();

    if (!this.isAdd) {
      this.loadAddress();//to show + update
    }
  }


  onSave(event) {
    this._entity = this.addEditForm.value;
    this.convert();
    if (this.isAdd) {
      if (this.uploaderDAUCT.queue.length == 0) {
        this.toastrService.error("Chưa chọn ảnh Dấu công ty");
      }
      if (this.uploaderDKKD.queue.length == 0) {
        this.toastrService.error("Chưa chọn ảnh Đăng ký kinh doanh");
      }
      if (this.uploaderGPKDVT.queue.length == 0) {
        this.toastrService.error("Chưa chọn ảnh Giấy giấy đăng ký vận tải");
      }
      if (this.uploaderGPDHVT.queue.length == 0) {
        this.toastrService.error("Chưa chọn ảnh Giấy điều hành vận tải");
      }
      if (this.uploaderDAUCT.queue.length > 0 && this.uploaderDKKD.queue.length > 0
        && this.uploaderGPKDVT.queue.length > 0 && this.uploaderGPDHVT.queue.length > 0) {
        this.groupImg();
        this.uploadFileToServer(this.uploaderDAUCT.queue, 'dauct');
        this.uploadFileToServer(this.uploaderDKKD.queue, 'dkkd');
        this.uploadFileToServer(this.uploaderGPKDVT.queue, 'gpkdvt');
        this.uploadFileToServer(this.uploaderGPDHVT.queue, 'gpdhvt');
        this._entity.vehicleOwnerType = 0;
        this.companyViewModelChange.emit(this._entity);
        this.closeEvent.emit();
      }
    } else {
      this._entity.attachProperties = this.oldAttachPro;
      this._entity.vehicleOwnerType = 0;
      this.companyViewModelChange.emit(this._entity);
      this.closeEvent.emit();
    }
  }

  getAllProvince() {
    let searchPr = new AddressCategoryModel()
    this.addressService.getProvince(searchPr).subscribe(
      (response: any) => {
        this.lstAddress_Province = response.data;
        this.lstContactAddress_Province = response.data;
      }
    );
  }

  getBankList() {
    // this.bankListService.Get(new SearchModel).subscribe(
    //   response => {
    //     this.lstBank = response.data;
    //   }
    // );
  }

  loadAddress() {
    console.log(this._entity);

    //Load Address district
    if (Object.values(this._entity.address)[1] != null) {
      this.addrDistrict.codeId = Object.values(this._entity.address)[1];
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
    this.groupImg();
  }

  groupImg() {
    this.addEditForm.controls.attachProperties.value.DKKD.length = 0;
    this.addEditForm.controls.attachProperties.value.DAUCT.length = 0;
    this.addEditForm.controls.attachProperties.value.GPKDVT.length = 0;
    this.addEditForm.controls.attachProperties.value.GPDHVT.length = 0;
    this.uploaderDKKD.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.DKKD.push(this.setNewFileName(el.file.name, index)));
    this.uploaderDAUCT.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.DAUCT.push(this.setNewFileName(el.file.name, index)));
    this.uploaderGPKDVT.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.GPKDVT.push(this.setNewFileName(el.file.name, index)));
    this.uploaderGPDHVT.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.GPDHVT.push(this.setNewFileName(el.file.name, index)));
  }
  setNewFileName(old_FileName: string, order): string {
    ++order;
    // format: tentheomay_SDT_STT
    let nameOnly = old_FileName.slice(0, old_FileName.lastIndexOf('.'));
    let fileFormat = old_FileName.slice(old_FileName.lastIndexOf('.'));
    let newFileName = nameOnly + "_" + this.addEditForm.get('companyPhone').value + "_" + order + fileFormat;
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

  loadPreviewDKKD() {
    this.imgSrcPreview_DKKD = [];
    for (let i = 0; i < this.uploaderDKKD.queue.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(this.uploaderDKKD.queue[i]._file);
      reader.onload = () => {
        this.imgSrcPreview_DKKD.push(reader.result);
      }
    }
  }
  loadPreviewDAUCT() {
    this.imgSrcPreview_DAUCT = [];
    for (let i = 0; i < this.uploaderDAUCT.queue.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(this.uploaderDAUCT.queue[i]._file);
      reader.onload = () => {
        this.imgSrcPreview_DAUCT.push(reader.result);
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
}
