import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CompanyViewModel } from '../../../../core';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  /* Private Vảiables */
  _entity: CompanyViewModel;
  /* Public Variables */
  @Input()
  set personViewModel(company: CompanyViewModel) {
    if (company !== null || company !== undefined) {
      this._entity = new CompanyViewModel();
      this._entity = company;
      this.addEditForm.reset(company);
    } else {
      this.addEditForm.reset();
    }
  }
  @Output() personViewModelChange = new EventEmitter<CompanyViewModel>();

  // Form Group
  public addEditForm: FormGroup;
  /* Ctor */
  constructor(private formBuilder: FormBuilder) {
    this.addEditForm = this.formBuilder.group({
      accountId: new FormControl(''),
      fullName: new FormControl('', [Validators.required]),
      director: new FormControl(''),
      taxcode: new FormControl(''),
      contactPhone: new FormControl(''),
      companyPhone: new FormControl(''),
      fax: new FormControl(''),
      website: new FormControl(''),
      email: new FormControl(''),
      contactPn: new FormControl(''),
      contactPnPhone: new FormControl(''),
      contactPnEmail: new FormControl(''),
      busiLic: new FormControl(''),
      busiLicIssDate: new FormControl(''),
      busiLicIssBy: new FormControl(''),
      tranLic: new FormControl(''),
      tranLicIssDate: new FormControl(''),
      tranLicExpDate: new FormControl(''),
      mod: new FormControl(''),
      modLic: new FormControl(''),
      modLicIssDate: new FormControl(''),
      modLicExpDate: new FormControl(''),
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
