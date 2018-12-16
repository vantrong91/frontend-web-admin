import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FeeViewModel } from 'src/app/core/models/fee.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  _entity: FeeViewModel;
  public addEditForm: FormGroup;
  isAdd = false;
  branchCount = 0;//k có chi nhánh
  @Input() set feeViewModel(bankFee: FeeViewModel) {
    if (bankFee.transferId !== 0) {
      this.isAdd = false;
      this._entity = new FeeViewModel();
      this._entity = bankFee;
      this.addEditForm.reset(bankFee);
    } else {
      this.isAdd = true;
      this._entity = new FeeViewModel();
      this.addEditForm.reset();
    }
  };

  @Output() closeForm = new EventEmitter<any>();
  @Output() feeViewModelChange = new EventEmitter<FeeViewModel>();

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.addEditForm = this.formBuilder.group({
      transferId: new FormControl(''),
      rootId: new FormControl('-1'),
      bankCode: new FormControl(''),
      bankName: new FormControl(''),
      fee: new FormControl(''),
      linkIB: new FormControl(''),
      connect: new FormControl(''),
      branch: new FormArray([]),
    });
  }
  ngOnInit() {
  }

  Save(event) {
    this._entity = this.addEditForm.value;
    console.log(this._entity);
    this.feeViewModelChange.emit(this._entity);
    this.closeForm.emit();
  }

  onAddBranch(event) {
    event.preventDefault();
    const banks = this.addEditForm.get('branch') as FormArray;
    banks.push(this.initBranchArray());
  }

  onRemoveBranch(event, groupIndex) {
    event.preventDefault();
    const banks = this.addEditForm.get('branch') as FormArray;
    this.branchCount -= 1;


    if (banks.length > 0) {
      banks.removeAt(groupIndex);
    }
  }

  initBranchArray() {
    this.branchCount += 1;
    if (this.branchCount == 1) {
      this.addEditForm.get('bankCode').setValue(null);
      this.addEditForm.get('fee').setValue(null);
    }
    return this.formBuilder.group({
      bankCode: new FormControl(),
      bankName: new FormControl(),
      bankShortName: new FormControl(),
      fee: new FormControl()
    });
  }
}
