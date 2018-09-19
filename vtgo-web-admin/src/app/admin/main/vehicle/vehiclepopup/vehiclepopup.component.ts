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
  uri = '..DKYXE/';

  uploader: FileUploader = new FileUploader({ url: this.uri });
  attachmentList: any = [];
  uploaderDKYXE: FileUploader = new FileUploader({ url: 'DKYXE' });
  attachmentDKYXE: any = [];
  uploaderDKIEMXE: FileUploader = new FileUploader({ url: 'DKIEMXE' });
  attachmentDKIEMXE: any = [];
  uploaderBHDS: FileUploader = new FileUploader({ url: 'BHDS' });
  attachmentBHDS: any = [];
  uploaderBHHH: FileUploader = new FileUploader({ url: 'BHHH' });
  attachmentBHHH: any = [];
  uploaderGSHT: FileUploader = new FileUploader({ url: 'GSHT' });
  attachmentGSHT: any = [];

  public addEditForm: FormGroup;

  get route(): FormArray {
    return <FormArray>this.addEditForm.get('route');
  }

  @Input()
  set vehicleViewModel(vehiclepopup: VehicleViewModel) {
    if (vehiclepopup !== null) {
      this._entity = new VehicleViewModel();
      this.resetFormData();
      this._entity = vehiclepopup;
      this.addEditForm.reset(vehiclepopup);
    } else {
      this.addEditForm.reset();
    }
  };
  @Input() noneShow: boolean;
  @Output() closeModalEvent = new EventEmitter<any>();
  @Output() vehicleViewModelChange = new EventEmitter<VehicleViewModel>();

  constructor(private formBuilder: FormBuilder) {
    this.addEditForm = this.formBuilder.group({
      //userId: '',
      vehicleId: '',
      ownerId: '',
      vehicleCode: ['', [Validators.required]],
      route: this.formBuilder.array([this.buildRoute()]),
      vehicleType: [, [Validators.required]],,
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
      //password: new FormControl(''),
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
    if(this.noneShow){
      this.addEditForm.disable();
    } else {
      this.addEditForm.enable();
    }
  }

  checkDisabled() {
    if (this.noneShow === true) {
      return true;
    } else {
      return null;
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

  fetchImg() {
    let myJson = '{';
    let i = 0;
    this.uploader.queue.forEach(element => {
      let path = '../IMAGE/' + element.url + '/';
      if (i < this.uploader.queue.length - 1)
        myJson += '"' + i + '":{"attachPath":"' + path + '","attachName":"' + element.file.name + '","attachCode":"' + element.url + '"},';
      else
        myJson += '"' + i + '":{"attachPath":"' + path + '","attachName":"' + element.file.name + '","attachCode":"' + element.url + '"}';

      i++;
    });
    myJson += '}';
    return myJson;
  }

  onSave(event) {
    this.addEditForm.get('attachProperties').setValue(JSON.parse(this.fetchImg()))
    event.preventDefault();
    if (this.addEditForm.valid) {
      this._entity = this.addEditForm.value;
      this.convert();
      this.vehicleViewModelChange.emit(this._entity);
      this.closeModalEvent.emit();
    }
  }
  resetFormData(){
    this.addEditForm.patchValue({
      licenceIssueDate: '',
      registrationIssueDate: '',
      registrationExpDate: '',
      civilInsuranceExpDate: '',
      civilInsuranceIssueDate: '',
      cargoInsuranceIssueDate: '',
      cargoInsuranceExpDate: '',
      itineraryMonitoringIssueDate: '',
      itineraryMonitoringExpDate: ''
    })
  }
  populateTestData() {
    this.addEditForm.patchValue({
      ownerId: 123,
      vehicleCode: 'Tanker123',
      licencePlate: '37E1-31201',
      licence: 'Test data',
      licenceIssueBy: 2,
      registrationNo: 'Test data',
      civilInsurance: 'Test data',
      cargoInsurance: 'Test data',
      itineraryMonitoring: 'Test data',
      driverName: 'Hoang TV',
      driverId: 123,
	  vehicleType: 1,
      state: 4,
      weight: 100,
      licenceIssueDate: '2018-01-01',
      registrationIssueDate: '2018-02-02',
      registrationExpDate: '2018-03-03',
      civilInsuranceExpDate: '2018-04-04',
      civilInsuranceIssueDate: '2018-05-05',
      cargoInsuranceIssueDate: '2018-06-06',
      cargoInsuranceExpDate: '2018-07-07',
      itineraryMonitoringIssueDate: '2018-08-08',
      itineraryMonitoringExpDate: '2018-09-09'
    })
  }

  buildRoute(): FormGroup {
    return this.formBuilder.group({
      routeName: '',
    });
  }

  addRoute() {
    this.route.push(this.buildRoute());
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

    let routeData = {};
    let myRoute = this.addEditForm.get('route').value;
    for (let index = 0; index < myRoute.length; index++) {
      routeData[index+1] = myRoute[index].routeName;  
    }
    this._entity.route = routeData;
  }
}
