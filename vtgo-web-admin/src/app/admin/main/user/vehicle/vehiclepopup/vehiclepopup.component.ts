import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {
  VehicleViewModel, DataService,
  IVehicleServiceToken, IVehicleService,
  SearchModel, CategoryViewModel,
  IAddressServiceToken, IAddressService, IVehicleOwnerServiceToken, IVehicleOwnerService
} from '../../../../../core';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyFormatter } from '../../../../../core/services/format-date.service';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vehiclepopup',
  templateUrl: './vehiclepopup.component.html',
  styleUrls: ['./vehiclepopup.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: MyFormatter }]
})
export class VehiclepopupComponent implements OnInit {
  _entity: VehicleViewModel;
  searchObject; searchObject2: SearchModel;
  snackbar: any;
  isAdd = false;
  oldAttachPro: any;
  oldvehicleCode: any;
  oldownerId: any;
  uri = 'http://ngx-uploader.com/upload';
  lstCategory: any;
  lstAddress: any;
  lstVehicle: any;
  typeOwner = '';
  loaiXe = '';
  taiTrong = '';
  maXe = '';
  tuyenXe = '';
  bienSo = '';


  uploaderDKYXE: FileUploader = new FileUploader({ url: 'DKYXE' });
  uploaderDKIEMXE: FileUploader = new FileUploader({ url: 'DKIEMXE' });
  uploaderBHDSXE: FileUploader = new FileUploader({ url: 'BHDSXE' });
  uploaderBHHHXE: FileUploader = new FileUploader({ url: 'BHHHXE' });
  uploaderGXNTBGS: FileUploader = new FileUploader({ url: 'GXNTBGS' });
  uploaderAPHXE: FileUploader = new FileUploader({ url: 'APHXE' });
  uploaderACHXE: FileUploader = new FileUploader({ url: 'ACHXE' });


  public addEditForm: FormGroup;

  @Input()
  set vehicleViewModel(vehiclepopup: VehicleViewModel) {
    if (vehiclepopup.vehicleId !== 0) {
      this.isAdd = false;
      this._entity = new VehicleViewModel();
      this._entity = vehiclepopup;
      if (vehiclepopup.attachProperties === null) {
        vehiclepopup.attachProperties = {
          "GXNTBGS": [
          ],
          "BHHHXE": [
          ],
          "BHDSXE": [
          ],
          "DKYXE": [
          ],
          "DKIEMXE": [
          ],
          "ACHXE": [
          ],
          "APHXE": [
          ]
        };
      }
      // this.addEditForm.setControl('route', this.formBuilder.array(vehiclepopup.route || []));
      this.addEditForm.reset(vehiclepopup);
      //Luu lai attachPro + vehicleCode cu~
      this.oldAttachPro = this._entity.attachProperties;
      this.oldvehicleCode = this._entity.vehicleCode;
      this.oldownerId = this._entity.ownerId;
      if (vehiclepopup.vehicleCode === null || vehiclepopup.vehicleCode === undefined) {
        this.addEditForm.controls['ownerId'].enable();

      } else {
        this.addEditForm.controls['ownerId'].disable();
      }
    } else {
      this.isAdd = true;
      this._entity = new VehicleViewModel();
      this.addEditForm.reset();
    }
  };
  @Output() closeModalEvent = new EventEmitter<any>();
  @Output() vehicleViewModelChange = new EventEmitter<VehicleViewModel>();

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastrService: ToastrService,
    @Inject(IVehicleServiceToken) private vehicleService: IVehicleService,
    @Inject(IAddressServiceToken) private addressService: IAddressService,
    @Inject(IVehicleOwnerServiceToken) private ownerService: IVehicleOwnerService) {
    this.addEditForm = this.formBuilder.group({
      vehicleId: '',
      ownerId: '',
      vehicleCode: '',
      route: ['', Validators.required],
      // route: this.formBuilder.array([]),
      vehicleType: ['', Validators.required],
      licencePlate: ['', [Validators.required]],
      weight: '',
      licence: ['', [Validators.required]],
      licenceIssueDate: ['', [Validators.required]],
      licenceIssueBy: ['-1', [Validators.required]],
      registrationNo: ['', [Validators.required]],
      registrationIssueDate: ['', [Validators.required]],
      registrationExpDate: ['', [Validators.required]],
      civilInsurance: ['', [Validators.required]],
      civilInsuranceIssueDate: ['', [Validators.required]],
      civilInsuranceExpDate: ['', [Validators.required]],
      cargoInsurance: '',
      cargoInsuranceIssueDate: '',
      cargoInsuranceExpDate: '',
      itineraryMonitoring: '',
      itineraryMonitoringIssueDate: '',
      itineraryMonitoringExpDate: '',
      carBadges: '',
      carBaIssDate: '',
      carBaExpDate: '',
      attachProperties: this.formBuilder.group({
        GXNTBGS: new FormArray([]),
        BHHHXE: new FormArray([]),
        BHDSXE: new FormArray([]),
        DKYXE: new FormArray([]),
        DKIEMXE: new FormArray([]),
        ACHXE: new FormArray([]),
        APHXE: new FormArray([])
      }),
      state: '',
      driverId: '',
      driverName: '',
      ipMonitoring: '',
    });
  }

  ngOnInit() {
    this.searchObject2 = new SearchModel();
    this.searchObject2.searchParam2 = 0;
    this.addressService.getProvince1(this.searchObject2).subscribe(
      (response: any) => {
        this.lstAddress = response.data;
      }
    );
    this.searchObject2.searchParam2 = 1;
    this.vehicleService.GetListVehicleType(this.searchObject2).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.lstVehicle = response.data;
        }
      }
    )
  }

  selectFile(code: string) {
    switch (code) {
      case 'DKYXE':
        break;
      case 'DKIEMXE':
        break;
      case 'BHDSXE':
        break;
      case 'BHHHXE':
        break;
      case 'GXNTBGS':
        break;
      case 'ACHXE':
        break;
      case 'APHXE':
        break;
      default:
        console.log("Error selectFile");
    }
    this.groupImg();
  }
  groupImg(): any {
    this.addEditForm.controls.attachProperties.value.DKYXE.length = 0;
    this.addEditForm.controls.attachProperties.value.DKIEMXE.length = 0;
    this.addEditForm.controls.attachProperties.value.BHHHXE.length = 0;
    this.addEditForm.controls.attachProperties.value.BHDSXE.length = 0;
    this.addEditForm.controls.attachProperties.value.GXNTBGS.length = 0;
    this.addEditForm.controls.attachProperties.value.ACHXE.length = 0;
    this.addEditForm.controls.attachProperties.value.APHXE.length = 0;
    this.uploaderDKYXE.queue.forEach((e, index) => this.addEditForm.controls.attachProperties.value.DKYXE.push(this.setNewFileName(e.file.name, index)));
    this.uploaderDKIEMXE.queue.forEach((e, index) => this.addEditForm.controls.attachProperties.value.DKIEMXE.push(this.setNewFileName(e.file.name, index)));
    this.uploaderBHDSXE.queue.forEach((e, index) => this.addEditForm.controls.attachProperties.value.BHDSXE.push(this.setNewFileName(e.file.name, index)));
    this.uploaderBHHHXE.queue.forEach((e, index) => this.addEditForm.controls.attachProperties.value.BHHHXE.push(this.setNewFileName(e.file.name, index)));
    this.uploaderGXNTBGS.queue.forEach((e, index) => this.addEditForm.controls.attachProperties.value.GXNTBGS.push(this.setNewFileName(e.file.name, index)));
    this.uploaderACHXE.queue.forEach((e, index) => this.addEditForm.controls.attachProperties.value.ACHXE.push(this.setNewFileName(e.file.name, index)));
    this.uploaderAPHXE.queue.forEach((e, index) => this.addEditForm.controls.attachProperties.value.APHXE.push(this.setNewFileName(e.file.name, index)));
  }

  setNewFileName(old_FileName: string, order): string {
    ++order;
    // format: tentheomay_licencePlate_STT
    let nameOnly = old_FileName.slice(0, old_FileName.lastIndexOf('.'));
    let fileFormat = old_FileName.slice(old_FileName.lastIndexOf('.'));
    let newFileName = nameOnly + "_" + this.addEditForm.get('licencePlate').value + "_" + order + fileFormat;
    return newFileName.replace(/ /g, '');
  }
  onSave(event) {
    if (this.isAdd) {
      this.groupImg();
      this.uploadFileToServer(this.uploaderDKYXE.queue, 'dkyxe');
      this.uploadFileToServer(this.uploaderDKIEMXE.queue, 'dkiemxe');
      this.uploadFileToServer(this.uploaderBHHHXE.queue, 'bhhhxe');
      this.uploadFileToServer(this.uploaderBHDSXE.queue, 'bhdsxe');
      this.uploadFileToServer(this.uploaderGXNTBGS.queue, 'gxntbgs');
      this.uploadFileToServer(this.uploaderACHXE.queue, 'achxe');
      this.uploadFileToServer(this.uploaderAPHXE.queue, 'aphxe');
    }
    this._entity = this.addEditForm.value;
    if (!this.isAdd) {
      this._entity.attachProperties = this.oldAttachPro;
      this._entity.vehicleCode = this.oldvehicleCode;
      this._entity.ownerId = this.oldownerId;
    }
    this.convert();
    console.log(this._entity);

    this.vehicleViewModelChange.emit(this._entity);
    this.closeModalEvent.emit();

  }

  uploadFileToServer(data: Array<any>, type: string) {
    var frmImg = new FormData();
    for (let i = 0; i < data.length; i++) {
      frmImg.append('files', data[i]._file, this.setNewFileName(data[i]._file.name, i));
      this.dataService.postFile('upload/' + type, frmImg).subscribe(
        response => {
          console.log(response);
          
        }
      )
    }
  }

  checkOwnerId(event, key) {
    switch (key) {
      case 'id':
        this.ownerService.GetOwnerById(event.target.value).subscribe((response: any) => {
          if (response.data != null && response.data.length > 0) {
            if (response.data[0].vehicleOwnerType === 0) {
              this.typeOwner = 'CT.';
            } else {
              this.typeOwner = 'CN.';
            }
            this.maXe = this.typeOwner + this.tuyenXe + this.loaiXe + this.taiTrong + this.bienSo;
          }
          else {
            this.toastrService.error("ID của chủ xe không tồn tại.", "Thông báo", {
              closeButton: true,
              tapToDismiss: true,
            });
          }
        })
        break;
      case 'plate':
        this.bienSo = event.target.value;
        this.maXe = this.typeOwner + this.tuyenXe + this.loaiXe + this.taiTrong + this.bienSo;
        break;
      case 'route':
        if (event.target.value === '71') {
          this.tuyenXe = '1.';
        } else {
          this.tuyenXe = '0.';
        }
        this.maXe = this.typeOwner + this.tuyenXe + this.loaiXe + this.taiTrong + this.bienSo;
        break;
      case 'type':
        this.searchObject = new SearchModel();
        this.searchObject.searchParam2 = event.target.value;
        this.vehicleService.GetListVehicleType(this.searchObject).subscribe(
          (response: any) => {
            if (response.status === 0) {
              this.lstCategory = response.data;
            }
          }
        );
        switch (event.target.value) {
          case '10':
            this.loaiXe = '1.';
            break;
          case '18':
            this.loaiXe = '2.';
            break;
          case '26':
            this.loaiXe = '3.';
            break;
          case '34':
            this.loaiXe = '4.';
            break;
          case '42':
            this.loaiXe = '5.';
            break;
          case '50':
            this.loaiXe = '6.';
            break;
          case '51':
            this.loaiXe = '7.';
            break;
          case '52':
            this.loaiXe = '8.';
            break;
          case '53':
            this.loaiXe = '9.';
            break;
          case '54':
            this.loaiXe = '10.';
            break;
          case '62':
            this.loaiXe = '11.';
            break;
          default:
            this.loaiXe = '0';
            break;
        }
        this.maXe = this.typeOwner + this.tuyenXe + this.loaiXe + this.taiTrong + this.bienSo;
        break;
      case 'weight':
        var arr1 = ['11', '19', '27', '35', '55', '262', '43', '64', '241', '248', '255'];
        var arr2 = ['12', '20', '28', '36', '56', '263', '44', '65', '242', '249', '256'];
        var arr3 = ['13', '21', '29', '37', '57', '264', '45', '66', '243', '250', '257'];
        var arr4 = ['14', '22', '30', '38', '58', '265', '46', '67', '244', '251', '258'];
        var arr5 = ['15', '23', '31', '39', '59', '266', '47', '68', '245', '252', '259'];
        var arr6 = ['16', '24', '32', '40', '60', '267', '48', '69', '246', '253', '260'];
        var arr7 = ['17', '25', '33', '41', '61', '268', '49', '70', '247', '254', '261'];
        if (arr1.includes(event.target.value)) {
          this.taiTrong = '1.';
        }
        if (arr2.includes(event.target.value)) {
          this.taiTrong = '2.';
        }
        if (arr3.includes(event.target.value)) {
          this.taiTrong = '3.';
        }
        if (arr4.includes(event.target.value)) {
          this.taiTrong = '4.'
        }
        if (arr5.includes(event.target.value)) {
          this.taiTrong = '5.';
        }
        if (arr6.includes(event.target.value)) {
          this.taiTrong = '6.';
        }
        if (arr7.includes(event.target.value)) {
          this.taiTrong = '7.';
        }
        this.maXe = this.typeOwner + this.tuyenXe + this.loaiXe + this.taiTrong + this.bienSo;
        break;

      default:
        console.log('a');
        break;
    }
    this.addEditForm.patchValue({
      vehicleCode: this.maXe,
    });
  }

  convert() {
    this._entity.licenceIssueDate = new Date(this._entity.licenceIssueDate).getTime();
    this._entity.registrationIssueDate = new Date(this._entity.registrationIssueDate).getTime();
    this._entity.registrationExpDate = new Date(this._entity.registrationExpDate).getTime();
    this._entity.civilInsuranceExpDate = new Date(this._entity.civilInsuranceExpDate).getTime();
    this._entity.civilInsuranceIssueDate = new Date(this._entity.civilInsuranceIssueDate).getTime();
    this._entity.cargoInsuranceIssueDate = new Date(this._entity.cargoInsuranceIssueDate).getTime();
    this._entity.cargoInsuranceExpDate = new Date(this._entity.cargoInsuranceExpDate).getTime();
    this._entity.itineraryMonitoringIssueDate = new Date(this._entity.itineraryMonitoringIssueDate).getTime();
    this._entity.itineraryMonitoringExpDate = new Date(this._entity.itineraryMonitoringExpDate).getTime();
    this._entity.carBaExpDate = new Date(this._entity.carBaExpDate).getTime();
    this._entity.carBaIssDate = new Date(this._entity.carBaIssDate).getTime();
  }
}
