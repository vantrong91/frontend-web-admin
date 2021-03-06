import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { InsuOrderViewModel, GenericValidator } from 'src/app/core';
import { FormGroup, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Observable, merge, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-insuran-info',
  templateUrl: './insuran-info.component.html',
  styleUrls: ['./insuran-info.component.scss']
})
export class InsuranInfoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  public addEditForm: FormGroup;
  _entity: InsuOrderViewModel
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  @Input() set insuOrderViewModel(insuOrder: InsuOrderViewModel) {
    if (insuOrder !== null) {
      this._entity = new InsuOrderViewModel();
      this._entity = insuOrder;
      this.addEditForm.reset(insuOrder);
    }
  }
  @Output() closeModalEvent = new EventEmitter<any>();
  @Output() insuOrderViewModelChange = new EventEmitter<InsuOrderViewModel>();
  constructor(private fb: FormBuilder) {
    this.addEditForm = this.fb.group({
      accountId: '',
      orderId: '',
      contractNo: ['', [Validators.required]],
      insuranPrice: ['', [Validators.required, Validators.pattern(/^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/)]],
      insuranSpend: ['', [Validators.required, Validators.pattern(/^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/)]],
      sumInsuPrice: ['', [Validators.required]],
      state: ['', [Validators.required]],
      updateTime: ''
    });
    this.validationMessages = {
      contractNo: {
        required: 'Giá trị không được để trống',
      },
      insuranPrice: {
        required: 'Giá trị không được để trống',
        pattern: 'Giá trị nhập vào phải là số'
      },
      insuranSpend: {
        required: 'Giá trị không được để trống',
        pattern: 'Giá trị nhập vào phải là số'
      },
      sumInsuPrice: {
        required: 'Giá trị không được để trống',
      },
      state: {
        required: 'Vui lòng chọn trạng thái',
      }
    }
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  onSave(event) {
    event.preventDefault();
    this._entity = this.addEditForm.value;
    this.convert();
    this.insuOrderViewModelChange.emit(this._entity);
    this.closeModalEvent.emit();
  }

  sum(event){
    console.log(this.addEditForm.get('insuranPrice').value);
    if(this.addEditForm.get('insuranPrice').value === null && this.addEditForm.get('insuranSpend').value === null){
      this.addEditForm.patchValue({
        sumInsuPrice: 0,
      });
    }
    if(this.addEditForm.get('insuranPrice').value === null && this.addEditForm.get('insuranSpend').value !== null){
      this.addEditForm.patchValue({
        sumInsuPrice: this.addEditForm.get('insuranSpend').value,
      });
    }
    if(this.addEditForm.get('insuranPrice').value !== null && this.addEditForm.get('insuranSpend').value === null){
      this.addEditForm.patchValue({
        sumInsuPrice: this.addEditForm.get('insuranPrice').value,
      });
    }
    if(this.addEditForm.get('insuranPrice').value !== null && this.addEditForm.get('insuranSpend').value !== null){
      this.addEditForm.patchValue({
        sumInsuPrice: this.addEditForm.get('insuranPrice').value/1 + this.addEditForm.get('insuranSpend').value/1,
      });
    }
    
  }
  convert() {
    this._entity.updateTime = new Date(this._entity.updateTime).getTime();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Theo dõi sự thay đổi ẩn của form từng tí 1
    const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    //Hợp nhất sự kiện ẩn đã theo dõi với giá trị ko ẩn
    merge(this.addEditForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.addEditForm);
    })
  }

}
