import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CompanyViewModel } from '../../../../core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MyFormatter } from '../../../../core/services/format-date.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: MyFormatter }]
})
export class CompanyComponent implements OnInit {

  fileChoseBusinessLicense = 'Choose file';
  fileChoseCompanySeal = 'Choose file';
  fileChoseBusinessTransport = 'Choose file';
  fileChoseModerator = 'Choose file';
  /* Private Vảiables */
  _entity: CompanyViewModel;
  /* Public Variables */
  @Input()
  set companyViewModel(company: CompanyViewModel) {
    if (company !== null) {
      this._entity = new CompanyViewModel();
      this._entity = company;
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
      this.addEditForm.reset();
    }
  }
  @Input() noneShow: boolean;
  @Output() personViewModelChange = new EventEmitter<CompanyViewModel>();
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
      attachProperties: new FormArray([this.initAttachProperties()])
    });
  }

  ngOnInit() {
    if (this.noneShow) {
      this.addEditForm.disable();
    } else {
      this.addEditForm.enable();
    }
  }

  onSave(event) {
    event.preventDefault();
    if (this.addEditForm.valid) {
      this._entity = this.addEditForm.value;
      console.log(this._entity);
      this.personViewModelChange.emit(this._entity);
    }
  }

  checkDisabled() {
    if (this.noneShow === true) {
      return true;
    } else {
      return null;
    }
  }

  initAttachProperties() {
    return this.formBuilder.group({
      attachCode: new FormControl(),
      attachName: new FormControl(),
      attachPath: new FormControl()
    });
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

  fileEvent(event) {
    const getFiles = event.target.files;
    if (getFiles.length !== null) {
      if (getFiles.length === 1) {
        return getFiles[0].name;
      } else {
        return 'So file da chon ' + getFiles.length + '(hover mouse watch name file)';
      }
    }
  }
  fileChoseBusiness(event) {
    this.fileChoseBusinessLicense = this.fileEvent(event);
  }

  fileCompanySeal(event) {
    this.fileChoseCompanySeal = this.fileEvent(event);
  }
  fileBusinessTransport(event) {
    this.fileChoseBusinessTransport = this.fileEvent(event);
  }
  fileModerator(event) {
    this.fileChoseModerator = this.fileEvent(event);
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
