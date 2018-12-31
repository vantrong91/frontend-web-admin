import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryViewModel } from 'src/app/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categorypopup',
  templateUrl: './categorypopup.component.html',
  styleUrls: ['./categorypopup.component.scss']
})
export class CategorypopupComponent implements OnInit {

  _entity: CategoryViewModel;
  public addEditForm: FormGroup;
  @Input() set categoryViewModel(category: CategoryViewModel) {
    if (category !== null) {
      this._entity = new CategoryViewModel;
      this._entity = category;
      this.addEditForm.reset(category);
    }else{
      this._entity = new CategoryViewModel();
      this.addEditForm.reset();
    }

  }
  @Output() closeModalEvent = new EventEmitter<any>();
  @Output() categoryViewModelChange = new EventEmitter<CategoryViewModel>();
  
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
    this.categoryViewModelChange.emit(this._entity);
    this.closeModalEvent.emit();
  }

}
