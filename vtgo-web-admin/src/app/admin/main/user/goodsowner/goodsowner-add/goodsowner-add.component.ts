import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Pipe } from '@angular/core';
import { OwnerViewModel } from './../model/owner.model';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/core';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-goodsowner-add',
  templateUrl: './goodsowner-add.component.html',
  styleUrls: ['./goodsowner-add.component.scss']
})
export class GoodsownerAddComponent implements OnInit {

  _entity: OwnerViewModel;
  public addEditForm: FormGroup;
  uploaderCMND: FileList;
  isSelectFile = false;

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


  constructor(private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService) {
    this.addEditForm = this.formBuilder.group({
      accountId: [''],
      fullName: ['', Validators.required],
      nationality: ['', Validators.required],
      licenseNo: [''],
      issueDate: ['', Validators.required],
      issueBy: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      identityNo: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      attachProperties: this.formBuilder.group({
        CMND: new FormArray([])
      })
    });
  }
  ngOnInit() {

  }


  Save(event) {
    // event.preventDefault();
    if (this.isSelectFile == true) {
      this.uploadFileToServer(this.uploaderCMND, 'cmnd-owner');
      this._entity = this.addEditForm.value;
      this.convert();
      this.ownerViewModelChange.emit(this._entity);
      this.closeForm.emit();
    } else {
      this.toastr.warning('Bạn chưa chọn Chứng minh nhân dân', 'Cảnh báo');
    }

  }

  convert() {
    this._entity.dateOfBirth = new Date(this._entity.dateOfBirth).getTime();
    this._entity.issueDate = new Date(this._entity.issueDate).getTime();
  }


  propCMND: any;
  selectFile(ev, type: string) {
    this.uploaderCMND = ev.target.files;
    const fileListAsArray = Array.from(this.uploaderCMND);
    for (let item of fileListAsArray) {
      this.addEditForm.controls.attachProperties.value.CMND.push(item.name);
    }
    this.isSelectFile = true;
  }

  uploadFileToServer(data: FileList, type: string) {

    var frmImg = new FormData();
    const fileListAsArray = Array.from(data);
    for (let item of fileListAsArray) {
      frmImg.append('files', item);
    }
    this.dataService.postFile('upload/' + type, frmImg).subscribe(
      response => {
      }
    );
  }



}
