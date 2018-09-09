import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { VehicleViewModel } from '../../../../core';


@Component({
  selector: 'app-vehiclepopup',
  templateUrl: './vehiclepopup.component.html',
  styleUrls: ['./vehiclepopup.component.scss']
})
export class VehiclepopupComponent implements OnInit {

  _entity: VehicleViewModel;
  snackbar: any;
  strIssueDate: any;
  public addEditForm: FormGroup;
  isShow = true;

  get route(): FormArray {
    return <FormArray>this.addEditForm.get('route');
  }
  datePickerConfig = {
    format: 'DD/MM/YYYY'
  };

  @Input()
  set vehicleViewModel(vehiclepopup: VehicleViewModel) {
    if (vehiclepopup !== undefined) {
      this._entity = new VehicleViewModel();

      this._entity = vehiclepopup;
      this.addEditForm.reset(vehiclepopup);

      console.log('onEdit');
    } else {
      this.addEditForm.clearValidators();
      console.log('onreset');
    }
  }

  @Output() vehicleViewModelChange = new EventEmitter<VehicleViewModel>();


  constructor(private formBuilder: FormBuilder) {
    this.addEditForm = this.formBuilder.group({
      userId: '',
      vehicleId: '',
      ownerId: '',
      vehicleCode: ['', [Validators.required]],
      route: '',
      //VehicleType: new FormControl(''),
      licencePlate: ['', [Validators.required]],
      //Weight: new FormControl(''),
      licence: ['',[Validators.required]],
      licenceIssueDate: '',
      licenceIssueBy: '1',
      registrationNo: ['', [Validators.required]],
      registrationIssueDate: new FormControl(''),
      registrationExpDate: new FormControl(''),
      civilInsurance: new FormControl(''),
      civilInsuranceIssueDate: new FormControl(''),

      civilInsuranceExpDate: new FormControl(''),
      cargoInsurance: new FormControl(''),
      cargoInsuranceIssueDate: new FormControl(''),
      cargoInsuranceExpDate: new FormControl(''),
      itineraryMonitoring: new FormControl(''),
      itineraryMonitoringIssueDate: new FormControl(''),
      itineraryMonitoringExpDate: new FormControl(''),
      //AttachProp: new FormControl(''),
      state: new FormControl(''),
      driverId: new FormControl(''),
      driverName: new FormControl(''),
      //password: new FormControl(''),
    })
  }

  ngOnInit() {
  }

  onSave(event) {
    event.preventDefault();
    if (this.addEditForm.valid) {
      this._entity = this.addEditForm.value;
      //this.convert();
      this.vehicleViewModelChange.emit(this._entity);
    }
  }

  addRoute() {
    
    this.isShow = false;
  }

  subRoute(i) {
    if (this.route.length === 1) {
      this.isShow = true;
    } else {
      this.route.removeAt(i);
    }
  }
  setDate(): void {
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
  // convert() {
  //   this.strIssueDate = this._entity.licenceIssueDate.toString().replace(/-/g, "");
  //   this._entity.licenceIssueDate = parseInt(this.strIssueDate);

  //   this.strIssueDate = this._entity.registrationIssueDate.toString().replace(/-/g, "");
  //   this._entity.registrationIssueDate = parseInt(this.strIssueDate);

  //   this.strIssueDate = this._entity.civilInsuranceExpDate.toString().replace(/-/g, "");
  //   this._entity.civilInsuranceExpDate = parseInt(this.strIssueDate);

  //   this.strIssueDate = this._entity.civilInsuranceIssueDate.toString().replace(/-/g, "");
  //   this._entity.civilInsuranceIssueDate = parseInt(this.strIssueDate);

  //   this.strIssueDate = this._entity.cargoInsuranceIssueDate.toString().replace(/-/g, "");
  //   this._entity.cargoInsuranceIssueDate = parseInt(this.strIssueDate);

  //   this.strIssueDate = this._entity.cargoInsuranceExpDate.toString().replace(/-/g, "");
  //   this._entity.cargoInsuranceExpDate = parseInt(this.strIssueDate);

  //   this.strIssueDate = this._entity.itineraryMonitoringIssueDate.toString().replace(/-/g, "");
  //   this._entity.itineraryMonitoringIssueDate = parseInt(this.strIssueDate);

  //   this.strIssueDate = this._entity.itineraryMonitoringExpDate.toString().replace(/-/g, "");
  //   this._entity.itineraryMonitoringExpDate = parseInt(this.strIssueDate);
  // }
}
