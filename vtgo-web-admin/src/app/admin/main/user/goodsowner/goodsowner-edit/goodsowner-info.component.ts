import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Pipe } from '@angular/core';
import { OwnerViewModel } from './../model/owner.model';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/core';
import { FileUploader } from 'ng2-file-upload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import * as $ from 'jquery';
@Component({
  selector: 'app-goodsowner-info',
  templateUrl: './goodsowner-info.component.html',
  styleUrls: ['./goodsowner-info.component.scss']
})
export class GoodsownerInfoComponent implements OnInit {
  _entity: OwnerViewModel;
  public addEditForm: FormGroup;
  imgUrl = '';
  keyArr: any;
  uploaderCMND: FileList;
  ulrImgFull = '';
  imgName = '';
  isSelectFile = false;
  imgOld: any;

  @Input() set ownerViewModel(owner: OwnerViewModel) {
    if (owner !== null || owner !== undefined) {
      this._entity = new OwnerViewModel();
      this._entity = owner;
      this.imgOld = this._entity.attachProperties;
      this.keyArr = Object.values(this._entity.attachProperties);
      this.addEditForm.reset(owner);
    } else
      this.addEditForm.reset();
  };
  @Output() ownerViewModelChange = new EventEmitter<OwnerViewModel>();
  @Output() closeForm = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private modalServices: NgbModal, private dataService: DataService, private toastr: ToastrService) {
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
    if (this.isSelectFile == true) {
      this.uploadFileToServer(this.uploaderCMND, 'cmnd-owner');
      this._entity = this.addEditForm.value;
    } else{
      this._entity = this.addEditForm.value;
      this._entity.attachProperties = this.imgOld;
    }
    this.convert();
    this.ownerViewModelChange.emit(this._entity);
    this.closeForm.emit();
  }

  convert() {
    this._entity.dateOfBirth = new Date(this._entity.dateOfBirth).getTime();
    this._entity.issueDate = new Date(this._entity.issueDate).getTime();

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


  propCMND: any;
  selectFile(ev, type: string) {
    this.addEditForm.value.attachProperties.CMND = [];
    this.uploaderCMND = ev.target.files;
    const fileListAsArray = Array.from(this.uploaderCMND);
    for (let item of fileListAsArray) {
      this.addEditForm.controls.attachProperties.value.CMND.push(item.name);
    }
    this.getUrlImg('cmnd-owner');
    this.isSelectFile = true;
  }

  getUrlImg(folder: string) {
    this.imgUrl = this.dataService.GetBaseUrlImg(folder) + '/';
    return this.imgUrl;
  }

  openImg(ele, imgUrl, fileName) {
    this.ulrImgFull = imgUrl + fileName;
    this.imgName = fileName;
    this.modalServices
      .open(ele, { windowClass: 'dark-modal', size: 'lg' });
  }
}