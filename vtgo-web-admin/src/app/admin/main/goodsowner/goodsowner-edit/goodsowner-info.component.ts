import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Pipe } from '@angular/core';
import { OwnerViewModel } from './../model/owner.model';
import { ToastrService } from 'ngx-toastr';

// import * as $ from 'jquery';
@Component({
  selector: 'app-goodsowner-info',
  templateUrl: './goodsowner-info.component.html',
  styleUrls: ['./goodsowner-info.component.scss']
})
export class GoodsownerInfoComponent implements OnInit {
  _entity: OwnerViewModel;
  public addEditForm: FormGroup;

  @Input() set ownerViewModel(owner: OwnerViewModel) {
    if (owner !== null || owner !== undefined) {
      this._entity = new OwnerViewModel();
      this._entity = owner;
      this.addEditForm.reset(owner);
    } else
      this.addEditForm.reset();
  };
  @Output() ownerViewModelChange = new EventEmitter<OwnerViewModel>();
  @Output() closeForm = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.addEditForm = this.formBuilder.group({
      accountId: new FormControl(''),
      fullName: new FormControl(''),
      nationality: new FormControl(''),
      licenseNo: new FormControl(''),
      issueDate: new FormControl(''),
      issueBy: new FormControl(''),
      gender: new FormControl(''),
      phoneNumber: new FormControl(''),
      address: new FormControl(''),
      identityNo: new FormControl(''),
      dateOfBirth: new FormControl(''),
      attachProperties: this.formBuilder.group({
        CMND: new FormControl('')
      })
    });
  }


  ngOnInit() {

  }


  Save(event) {
    // event.preventDefault();
    this._entity = this.addEditForm.value;
    this.convert();
    this.ownerViewModelChange.emit(this._entity);
    this.closeForm.emit();
  }

  convert() {
    this._entity.dateOfBirth = new Date(this._entity.dateOfBirth).getTime();
    this._entity.issueDate = new Date(this._entity.issueDate).getTime();

  }


  propCMND: any;
  selectFile(ev, type: string) {
    switch (type) {
      case 'CMND':
        this.propCMND = ev.target.files;
        this.addEditForm.controls.attachProperties.value.CMND.length = 0;
        for (let item of this.propCMND) {
          let attachName = item.name;
          let filePath = "../IMAGE/CMND/";
          let attachCode = "CMND";
          this.addEditForm.controls.attachProperties.value.CMND.push(filePath);
          this.addEditForm.controls.attachProperties.value.CMND.push(attachName);
          this.addEditForm.controls.attachProperties.value.CMND.push(attachCode);
        }
        break;
      default:
        this.toastr.error('Đã xảy ra lỗi!', 'Cảnh báo');
    }
  }



}