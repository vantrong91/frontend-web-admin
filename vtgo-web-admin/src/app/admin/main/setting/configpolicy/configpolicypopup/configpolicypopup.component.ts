import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PolicyViewModel } from 'src/app/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-configpolicypopup',
  templateUrl: './configpolicypopup.component.html',
  styleUrls: ['./configpolicypopup.component.scss']
})
export class ConfigpolicypopupComponent implements OnInit {

  _entity: PolicyViewModel;
  public addEditForm: FormGroup;

  @Input() set configPolicyViewModel(policy: PolicyViewModel) {
    if (policy.policyId !== 0) {
      console.log(policy);
      this._entity = new PolicyViewModel();
      this._entity = policy;
      this.addEditForm.reset(this._entity);
    }else{
      this._entity = new PolicyViewModel();
      this.addEditForm.reset();
    }
  }
  @Input() isAdd: boolean
  @Output() closeModalEvent = new EventEmitter<any>();
  @Output() configPolicyViewModelChange = new EventEmitter<PolicyViewModel>();

  constructor(private fb: FormBuilder) {
    this.addEditForm = this.fb.group({
      policyId: '',
      ratioVat: '',
      constant: '',
      ratiRoseNoVat: '',
      ratioRoseVat: '',
      ratioVatTax: '',
      ratioPerTax: '',
      description: '',
    })
  }

  ngOnInit() {
  }

  onSave(event){
    event.preventDefault();
    this._entity = this.addEditForm.value;
    this.configPolicyViewModelChange.emit(this._entity);
    this.closeModalEvent.emit();
  }

}
