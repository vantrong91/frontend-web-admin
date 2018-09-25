import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalViewModel } from '../../../../core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MyFormatter } from '../../../../core/services/format-date.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: MyFormatter }]
})
export class PersonalComponent implements OnInit {
  fileChoseRegistrationBook = 'Choose file';
  fileChosePassport = 'Choose file';
  fileChoseTransportationBusiness = 'Choose file';
  fileChoseTransportOperator = 'Choose file';
  /* Private Vảiables */
  _entity: PersonalViewModel;

  /* Public Variables */
  @Input()
  set personViewModel(personal: PersonalViewModel) {
    if (personal !== null || personal !== undefined) {
      this._entity = new PersonalViewModel();
      this._entity = personal;
      if (personal && personal.bankAccountLst && personal.bankAccountLst.length > 0) {
        const bankAccountLstGroups = personal.bankAccountLst.map((bankAccount: any) => {
          return this.formBuilder.group(bankAccount);
        });
        const bankAccountLstArrays = this.formBuilder.array(bankAccountLstGroups);
        this.addEditForm.setControl('bankAccountLst', bankAccountLstArrays);
      }
      if (personal && (personal.attachProperties !== undefined || personal.attachProperties !== null)) {
        const attachments = Object.keys(personal.attachProperties).map(function (index) {
          const attachment = personal.attachProperties[index];
          return attachment;
        });
        personal.attachProperties = attachments;
        if (attachments && attachments.length > 0) {
          const attachmentGroups = attachments.map(attachment => {
            return this.formBuilder.group(attachment);
          });
          const attachmenttArrays = this.formBuilder.array(attachmentGroups);
          this.addEditForm.setControl('attachProperties', attachmenttArrays);
        }
      }
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
  bankList = [{
    'bankCode': 'MBB',
    'bankName': 'Ngân hàng quân đội'
  },
  {
    'bankCode': 'VPB',
    'bankName': 'Ngân hàng VPbank'
  }];
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
  initAttachProperties() {
    return this.formBuilder.group({
      attachCode: new FormControl(),
      attachName: new FormControl(),
      attachPath: new FormControl()
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
  // file
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
  fileRegistrationBook(event) {
    this.fileChoseRegistrationBook = this.fileEvent(event);
  }
  filePassport(event) {
    this.fileChosePassport = this.fileEvent(event);
  }
  fileTransportationBusiness(event) {
    this.fileChoseTransportationBusiness = this.fileEvent(event);
  }
  fileTransportOperator(event) {
    this.fileChoseTransportOperator = this.fileEvent(event);
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
