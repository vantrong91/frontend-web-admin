import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { VehicleViewModel, DataService } from '../../../../core';
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
  uri = 'http://ngx-uploader.com/upload';
  imgUrl = '';

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

  // get route(): FormArray {
  //   return <FormArray>this.addEditForm.get('route');
  // }

  @Input()
  set vehicleViewModel(vehiclepopup: VehicleViewModel) {
    if (vehiclepopup.vehicleId !== 0) {

      this.isAdd = false;
      this._entity = new VehicleViewModel();
      this._entity = vehiclepopup;
      // this.addEditForm.setControl('route', this.formBuilder.array(vehiclepopup.route || []));
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
      // this.addRoute();
    }
  };
  @Input() noneShow: boolean;
  @Output() closeModalEvent = new EventEmitter<any>();
  @Output() vehicleViewModelChange = new EventEmitter<VehicleViewModel>();

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService) {
    this.addEditForm = this.formBuilder.group({
      vehicleId: '',
      ownerId: '',
      vehicleCode: '',
      route: ['', Validators.required],
      // route: this.formBuilder.array([]),
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
      //this.attachmentDKYXE.push(JSON.parse(response));
    };
    this.uploaderDKIEMXE.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //this.attachmentDKIEMXE.push(JSON.parse(response));
    };
    this.uploaderBHDSXE.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //this.attachmentBHDS.push(JSON.parse(response));
    };
    this.uploaderBHHHXE.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //this.attachmentBHHH.push(JSON.parse(response));
    };
    this.uploaderGXNTBGS.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //this.attachmentGSHT.push(JSON.parse(response));
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

  getUrlImg(folder: string) {
    this.imgUrl = this.dataService.GetBaseUrlImg(folder) + '/';
    return this.imgUrl;
  }
  onSave(event) {
    if (this.isAdd) {
      this.uploadFileToServer(this.uploaderDKYXE.queue, 'dkyxe');
      this.uploadFileToServer(this.uploaderDKIEMXE.queue, 'dkiemxe');
      this.uploadFileToServer(this.uploaderBHHHXE.queue,'bhhhxe');
      this.uploadFileToServer(this.uploaderBHDSXE.queue, 'bhdsxe');
      this.uploadFileToServer(this.uploaderGXNTBGS.queue,'gxntbgs')
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

  uploadFileToServer(data: Array<any>, type: string){
    var frmImg = new FormData();
    for(let i = 0; i < data.length; i++){
      frmImg.append('files', data[i]._file);
      this.dataService.postFile('upload/' + type, frmImg).subscribe(
        response => {
          console.log(response);
        }
      )
    }
  }

  // addRoute() {
  //   this.route.push(new FormControl());
  // }
  // subRoute(i) {
  //   this.route.removeAt(i);
  // }

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
