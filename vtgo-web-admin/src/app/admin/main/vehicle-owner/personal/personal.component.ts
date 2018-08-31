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

  @Output() personViewModelChange = new EventEmitter<PersonalViewModel>();

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
      businessLicenseIssueDate: new FormControl(''),
      businessLicenseIssueBy: new FormControl(''),
      moderator: new FormControl(''),
      moderatorLicense: new FormControl(''),
      moderatorLicenseIssueDate: new FormControl(''),
      moderatorLicenseExpDate: new FormControl(''),
      businessTransportLicense: new FormControl(''),
      businessTransportLicenseIssueDate: new FormControl(''),
      businessTransportLicenseExpDate: new FormControl(''),
      nationality: new FormControl(''),
      licenseNo: new FormControl(''),
      issueDate: new FormControl(''),
      issueBy: new FormControl(''),
      gender: new FormControl(''),
      ethnic: new FormControl(''),
      vehicleOwnerType: new FormControl(''),
      banks: new FormArray([this.initBankArray()])
    });
  }

  ngOnInit() {
    console.log('Form', this.addEditForm.controls['Banks']);
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
      nameOwner: new FormControl()
    });
  }

  onAddBankGroup(event) {
    event.preventDefault();
    const banks = this.addEditForm.get('Banks') as FormArray;
    banks.push(this.initBankArray());
  }

  onRemoveBankGroup(event, groupIndex) {
    event.preventDefault();
    const banks = this.addEditForm.get('Banks') as FormArray;
    if (banks.length > 1) {
      banks.removeAt(groupIndex);
    }
  }
}
