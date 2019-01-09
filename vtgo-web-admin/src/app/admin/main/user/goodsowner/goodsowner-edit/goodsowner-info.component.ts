import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Pipe } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService, OwnerViewModel } from 'src/app/core';
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
  uploaderCMND: FileUploader = new FileUploader({ url: 'CMND' });
  ulrImgFull = '';
  imgName = '';
  imgOld: any;
  imgSrcPreview = [];
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
    if (this.uploaderCMND.queue.length > 0) {
      this.groupImg();
      this.uploadFileToServer(this.uploaderCMND.queue, 'cmnd-owner');
      this._entity = this.addEditForm.value;
    } else {
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

  uploadFileToServer(data: Array<any>, type: string) {
    var frmImg = new FormData();
    for (let i = 0; i < data.length; i++)
      frmImg.append('files', data[i]._file, this.setNewFileName(data[i]._file.name, i));
    this.dataService.postFile('upload/' + type, frmImg).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  setNewFileName(old_FileName: string, order): string {
    ++order;
    // format: tentheomay_SDT_STT
    let nameOnly = old_FileName.slice(0, old_FileName.lastIndexOf('.'));
    let fileFormat = old_FileName.slice(old_FileName.lastIndexOf('.'));
    let newFileName = nameOnly + "_" + this.addEditForm.get('phoneNumber').value + "_" + order + fileFormat;
    return newFileName.replace(/ /g, '');
  }

  loadPreviewCMND() {
    this.imgSrcPreview = [];
    for (let i = 0; i < this.uploaderCMND.queue.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(this.uploaderCMND.queue[i]._file);
      reader.onload = () => {
        this.imgSrcPreview.push(reader.result);
      }
    }
    console.log(this.imgSrcPreview);

  };

  selectFile() {
  }

  groupImg() {
    this.addEditForm.controls.attachProperties.value.CMND.length = 0;
    this.uploaderCMND.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.CMND.push(this.setNewFileName(el.file.name, index)));
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