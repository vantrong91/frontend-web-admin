import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {
  VehicleViewModel, DataService,
  IVehicleServiceToken, IVehicleService,
  SearchModel, CategoryViewModel,
  IAddressServiceToken, IAddressService
} from '../../../../../core';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyFormatter } from '../../../../../core/services/format-date.service';
import { FileUploader } from 'ng2-file-upload';


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


  uploaderDKYXE: FileUploader = new FileUploader({ url: 'DKYXE' });
  attachmentDKYXE: any = [];
  uploaderDKIEMXE: FileUploader = new FileUploader({ url: 'DKIEMXE' });
  attachmentDKIEMXE: any = [];
  uploaderBHDSXE: FileUploader = new FileUploader({ url: 'BHDSXE' });
  attachmentBHDSXE: any = [];
  uploaderBHHHXE: FileUploader = new FileUploader({ url: 'BHHHXE' });
  attachmentBHHHXE: any = [];
  uploaderGXNTBGS: FileUploader = new FileUploader({ url: 'GXNTBGS' });
  attachmentGXNTBGS: any = [];

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
    @Inject(IVehicleServiceToken) private vehicleService: IVehicleService,
    @Inject(IAddressServiceToken) private addressService: IAddressService) {
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
      attachProperties: this.formBuilder.group({
        GXNTBGS: new FormArray([]),
        BHHHXE: new FormArray([]),
        BHDSXE: new FormArray([]),
        DKYXE: new FormArray([]),
        DKIEMXE: new FormArray([])
      }),
      state: '',
      driverId: '',
      driverName: '',
    });
    this.uploaderDKYXE.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };
    this.uploaderDKIEMXE.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };
    this.uploaderBHDSXE.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };
    this.uploaderBHHHXE.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };
    this.uploaderGXNTBGS.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };
  }

  ngOnInit() {
    this.searchObject2 = new SearchModel();
    this.searchObject2.searchParam2 = 0;
    this.addressService.getProvince(this.searchObject2).subscribe(
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
      default:
        console.log("Error selectFile");
    }
    this.groupImg();
  }
  groupImg(): any {
    this, this.addEditForm.controls.attachProperties.value.DKYXE.length = 0;
    this, this.addEditForm.controls.attachProperties.value.DKIEMXE.length = 0;
    this, this.addEditForm.controls.attachProperties.value.BHHHXE.length = 0;
    this, this.addEditForm.controls.attachProperties.value.BHDSXE.length = 0;
    this, this.addEditForm.controls.attachProperties.value.GXNTBGS.length = 0;
    this.uploaderDKYXE.queue.forEach(e => this.addEditForm.controls.attachProperties.value.DKYXE.push(e.file.name));
    this.uploaderDKIEMXE.queue.forEach(e => this.addEditForm.controls.attachProperties.value.DKIEMXE.push(e.file.name));
    this.uploaderBHDSXE.queue.forEach(e => this.addEditForm.controls.attachProperties.value.BHHHXE.push(e.file.name));
    this.uploaderBHHHXE.queue.forEach(e => this.addEditForm.controls.attachProperties.value.BHDSXE.push(e.file.name));
    this.uploaderGXNTBGS.queue.forEach(e => this.addEditForm.controls.attachProperties.value.GXNTBGS.push(e.file.name));
  }

  onSave(event) {
    if (this.isAdd) {
      this.uploadFileToServer(this.uploaderDKYXE.queue, 'dkyxe');
      this.uploadFileToServer(this.uploaderDKIEMXE.queue, 'dkiemxe');
      this.uploadFileToServer(this.uploaderBHHHXE.queue, 'bhhhxe');
      this.uploadFileToServer(this.uploaderBHDSXE.queue, 'bhdsxe');
      this.uploadFileToServer(this.uploaderGXNTBGS.queue, 'gxntbgs')
    }
    this._entity = this.addEditForm.value;
    if (!this.isAdd) {
      this._entity.attachProperties = this.oldAttachPro;
      this._entity.vehicleCode = this.oldvehicleCode;
      this._entity.ownerId = this.oldownerId;
    }
    this.convert();
    this.vehicleViewModelChange.emit(this._entity);
    this.closeModalEvent.emit();

  }

  ChangingValue(event) {
    this.searchObject = new SearchModel();
    this.searchObject.searchParam2 = event.target.value;
    this.vehicleService.GetListVehicleType(this.searchObject).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.lstCategory = response.data;
        }
      }
    )
  }

  uploadFileToServer(data: Array<any>, type: string) {
    var frmImg = new FormData();
    for (let i = 0; i < data.length; i++) {
      frmImg.append('files', data[i]._file);
      this.dataService.postFile('upload/' + type, frmImg).subscribe(
        response => {
        }
      )
    }
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
  }
}
