import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankAdminModel } from 'src/app/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-bankpopup',
  templateUrl: './bankpopup.component.html',
  styleUrls: ['./bankpopup.component.scss']
})
export class BankPopupComponent implements OnInit {

  _entity: BankAdminModel;
  public addEditForm: FormGroup;
  @Input() set bankViewModel(bankAd: BankAdminModel) {
    if (bankAd !== null) {
      this._entity = new BankAdminModel;
      this._entity = bankAd;
      this.addEditForm.reset(bankAd);
    } else {
      this._entity = new BankAdminModel();
      this.addEditForm.reset();
    }

  }
  @Output() closeModalEvent = new EventEmitter<any>();
  @Output() bankAdminModelChange = new EventEmitter<BankAdminModel>();

  constructor(private fb: FormBuilder) {
    this.addEditForm = this.fb.group({
      bankCode: new FormControl('', Validators.required),
      accountId: new FormControl('', Validators.required),
      bankName: new FormControl('', Validators.required),
      bankNumber: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      bankBranch: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  onSave(event) {
    event.preventDefault();
    this._entity = this.addEditForm.value;

    this.bankAdminModelChange.emit(this._entity);
    this.closeModalEvent.emit();
  }

}
