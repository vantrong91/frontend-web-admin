import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Pipe, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OwnerViewModel, DataService, IAccountServiceToken, AccountService, AccountViewModel } from 'src/app/core';
import { FileUploader } from 'ng2-file-upload';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-goodsowner-add',
  templateUrl: './goodsowner-add.component.html',
  styleUrls: ['./goodsowner-add.component.scss']
})
export class GoodsownerAddComponent implements OnInit {

  _entity: OwnerViewModel;
  public addEditForm: FormGroup;
  uploaderCMND: FileUploader = new FileUploader({ url: 'CMND' });
  isSelectFile = false;
  phoneValid = false;

  imgSrcPreview = [];

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


  constructor(
    @Inject(IAccountServiceToken) private accountService: AccountService,
    private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService) {
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
    if (this.uploaderCMND.queue != null && this.uploaderCMND.queue.length > 0) {
      this._entity = this.addEditForm.value;
      this.uploadFileToServer(this.uploaderCMND.queue, 'cmnd-owner');
      this.convert();
      this.ownerViewModelChange.emit(this._entity);
      this.closeForm.emit();
    } else {
      this.toastr.warning('Bạn chưa chọn Chứng minh nhân dân', 'Cảnh báo');
    }

  }
 
  checkPhone() {
    let account = new AccountViewModel();
    let phoneNumber = this.addEditForm.value.phoneNumber;
    account.accountCode = "CH" + phoneNumber;

    this.accountService.GetByAccCode(account).subscribe(
      response => {
        if (response.data.length != 0) {
          this.phoneValid = false;
          this.toastr.clear();
          this.toastr.error("Số điện thoại đã được sử dụng cho Chủ hàng", "Thông báo", {
            disableTimeOut: true,
            closeButton: true
          });
        } else {
          this.phoneValid = true;
          this.toastr.success("Số điện thoại có thể sử dụng!", '', { closeButton: true });
        }
      }
    );
  }

  convert() {
    this._entity.dateOfBirth = new Date(this._entity.dateOfBirth).getTime();
    this._entity.issueDate = new Date(this._entity.issueDate).getTime();
  }


  selectFile() {
    this.groupImg();
  }

  groupImg() {
    this.addEditForm.controls.attachProperties.value.CMND.length = 0;
    this.uploaderCMND.queue.forEach((el, index) => this.addEditForm.controls.attachProperties.value.CMND.push(this.setNewFileName(el.file.name, index)));
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
  };

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
}
