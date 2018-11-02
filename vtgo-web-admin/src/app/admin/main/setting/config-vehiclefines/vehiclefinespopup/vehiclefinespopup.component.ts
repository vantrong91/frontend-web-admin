import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CategoryViewModel } from 'src/app/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vehiclefinespopup',
  templateUrl: './vehiclefinespopup.component.html',
  styleUrls: ['./vehiclefinespopup.component.scss']
})
export class VehiclefinespopupComponent implements OnInit {

  _entity: CategoryViewModel;
  public addEditForm: FormGroup;
  @Input() set vehicleFineViewModel(category: CategoryViewModel){
    if(category !== null){
      this._entity = new CategoryViewModel;
      this._entity = category;
      this.addEditForm.reset(this._entity);
    }else{
      this._entity = new CategoryViewModel();
      this.addEditForm.reset();
    }
  }
  @Output() closeModalEvent = new EventEmitter<any>();
  @Output() configvefiViewModelChange = new EventEmitter<CategoryViewModel>();
  constructor(private fb: FormBuilder) {
    this.addEditForm = this.fb.group({
      pk: '',
      id_cha: '',
      type: '',
      item: '',
      feeCharge:'',
      latefine: '',
    })
   }

  ngOnInit() {
  }
  onSave(event){
    event.preventDefault();
    this._entity =  this.addEditForm.value;
    this.configvefiViewModelChange.emit(this._entity);
    this.closeModalEvent.emit();
  }

}
