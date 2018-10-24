import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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
      bankCode: new FormControl(''),
      bankName: new FormControl(''),
      fee: new FormControl(''),
      linkIB: new FormControl(''),
      connect: new FormControl(''),
    });
  }
  ngOnInit() {
  }

  Save(event) {
    this._entity = this.addEditForm.value;
    this.feeViewModelChange.emit(this._entity);
    this.closeForm.emit();
  }

}
