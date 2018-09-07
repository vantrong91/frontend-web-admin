import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonalViewModel} from '../../../../core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  /* Private Vảiables */
  _entity: PersonalViewModel;

  /* Public Variables */
  @Input()
  set personViewModel(personal: PersonalViewModel) {
    if (personal !== null || personal !== undefined) {
      this._entity = new PersonalViewModel();
      this._entity = personal;
      this.addEditForm.reset(personal);
    } else {
      this.addEditForm.reset();
    }
  }
  @Input() noneShow: boolean;
  @Output() personViewModelChange = new EventEmitter<PersonalViewModel>();
  datePickerConfig = {
    format: 'DD/MM/YYYY'
  };
  // Form Group
  public addEditForm: FormGroup;

  /* Ctor */
  constructor(private formBuilder: FormBuilder) {
    this.addEditForm = this.formBuilder.group({
      accountId: new FormControl(''),
      fullName: new FormControl('', [Validators.required]),
      contactPhone: new FormControl(''),
      email: new FormControl(''),
      contactPerson: new FormControl(''),
      contactPersonPhone: new FormControl(''),
      contactPersonEmail: new FormControl(''),
      businessLicense: new FormControl(''),
      businessLicenseIssueDate: new FormControl(new Date()),
      businessLicenseIssueBy: new FormControl(''),
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
      contactAddress: this.initContactAddress()
    });
  }

  ngOnInit() {
    console.log('Form', this.addEditForm.controls['bankAccountLst']);
  }

  onSave(event) {
    event.preventDefault();
    if (this.addEditForm.valid) {
      this._entity = this.addEditForm.value;
      this.personViewModelChange.emit(this._entity);
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
  onbusinessLicenseIssueDateSelect(event) { }

}
