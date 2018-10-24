import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { VehicleViewModel } from '../../../../core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MyFormatter } from '../../../../core/services/format-date.service';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-vehiclepopup',
  templateUrl: './vehiclepopup.component.html',
  styleUrls: ['./vehiclepopup.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: MyFormatter }]
})
export class VehiclepopupComponent implements OnInit {
  _entity: VehicleViewModel;
  snackbar: any;
  isAdd = false;
  oldAttachPro: any;
  oldvehicleCode: any;
  oldownerId: any;
  uri = '..DKYXE/';
  lstImg = [];

  uploader: FileUploader = new FileUploader({ url: this.uri });
  attachmentList: any = [];
  uploaderDKYXE: FileUploader = new FileUploader({ url: 'DKYXE' });
  attachmentDKYXE: any = [];
  uploaderDKIEMXE: FileUploader = new FileUploader({ url: 'DKIEMXE' });
  attachmentDKIEMXE: any = [];
  uploaderBHDS: FileUploader = new FileUploader({ url: 'BHDSXE' });
  attachmentBHDS: any = [];
  uploaderBHHH: FileUploader = new FileUploader({ url: 'BHHHXE' });
  attachmentBHHH: any = [];
  uploaderGSHT: FileUploader = new FileUploader({ url: 'GXNTBGS' });
  attachmentGSHT: any = [];

  public addEditForm: FormGroup;

  get route(): FormArray {
    return <FormArray>this.addEditForm.get('route');
  }

  @Input()
  set vehicleViewModel(vehiclepopup: VehicleViewModel) {
    if (vehiclepopup.vehicleId !== 0) {
      
      this.isAdd = false;
      this._entity = new VehicleViewModel();
      this._entity = vehiclepopup;
      this.addEditForm.setControl('route', this.formBuilder.array(vehiclepopup.route || []));
      if(vehiclepopup && (vehiclepopup.attachProperties !== undefined && vehiclepopup.attachProperties !==null)){
        this.lstImg = Object.keys(vehiclepopup.attachProperties);
      }
      this.addEditForm.reset(vehiclepopup);
      this.oldAttachPro = this._entity.attachProperties;
      this.oldvehicleCode = this._entity.vehicleCode;
      this.oldownerId = this._entity.ownerId;
      if (vehiclepopup.vehicleCode === null || vehiclepopup.vehicleCode === undefined) {
        this.addEditForm.controls['vehicleCode'].enable();
        this.addEditForm.controls['ownerId'].enable();

      } else {
        this.addEditForm.controls['vehicleCode'].disable();
        this.addEditForm.controls['ownerId'].disable();
      }
    } else {
      this.isAdd = true;
      this._entity = new VehicleViewModel();
      this.addEditForm.reset();
      this.addRoute();
    }
  };
  @Input() noneShow: boolean;
  @Output() closeModalEvent = new EventEmitter<any>();
  @Output() vehicleViewModelChange = new EventEmitter<VehicleViewModel>();

  constructor(private formBuilder: FormBuilder) {
    this.addEditForm = this.formBuilder.group({
      vehicleId: '',
      ownerId: '',
      vehicleCode: ['', [Validators.required]],
      route: this.formBuilder.array([]),
      vehicleType: ['', Validators.required],
      licencePlate: ['', [Validators.required]],
      weight: [, [Validators.required]],
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
      attachProperties: new FormData(),
      state: new FormControl('-- Trạng thái --'),
      driverId: '',
      driverName: '',
    });
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
    };
    this.uploaderDKYXE.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentDKYXE.push(JSON.parse(response));
    };
    this.uploaderDKIEMXE.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentDKIEMXE.push(JSON.parse(response));
    };
    this.uploaderBHDS.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentBHDS.push(JSON.parse(response));
    };
    this.uploaderBHHH.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentBHHH.push(JSON.parse(response));
    };
    this.uploaderGSHT.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentGSHT.push(JSON.parse(response));
    };
  }

  ngOnInit() {
    if (this.noneShow) {
      this.addEditForm.disable();
    } else {
      this.addEditForm.enable();
    }
  }

  selectFile(code: string) {
    switch (code) {
      case 'DKYXE':
        break;
      case 'DKIEMXE':
        break;
      case 'BHDS':
        break;
      case 'BHHH':
        break;
      case 'GSHT':
        break;
      default:
        alert("Error! Please try again late");
    }
    this.groupImg();
  }
  groupImg(): any {
    this.uploader.queue.length = 0;
    this.uploaderDKYXE.queue.forEach(e => this.uploader.queue.push(e));
    this.uploaderDKIEMXE.queue.forEach(e => this.uploader.queue.push(e));
    this.uploaderBHDS.queue.forEach(e => this.uploader.queue.push(e));
    this.uploaderBHHH.queue.forEach(e => this.uploader.queue.push(e));
    this.uploaderGSHT.queue.forEach(e => this.uploader.queue.push(e));
  }

  setAttachProp() {
    let data = {};
    for (let index = 0; index < this.uploader.queue.length; index++) {
      const element = this.uploader.queue[index];
      data[index] = { attachPath: '../IMAGE/' + element.url + '/', attachName: element.file.name, attachCode: element.url}
    }
    this.addEditForm.get('attachProperties').setValue(data);
  }


  onSave(event) {
    if (this.isAdd) {
      this.setAttachProp();
    }
    this._entity = this.addEditForm.value;
    if (!this.isAdd){
      this._entity.attachProperties = this.oldAttachPro;
      this._entity.vehicleCode = this.oldvehicleCode;
      this._entity.ownerId = this.oldownerId;
    }
    this.convert();
    this.vehicleViewModelChange.emit(this._entity);
    this.closeModalEvent.emit();

  }

  addRoute() {
    this.route.push(new FormControl());
  }
  subRoute(i) {
    this.route.removeAt(i);
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
