import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Pipe } from '@angular/core';
import { OwnerViewModel } from './../model/owner.model';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { DataService } from '../../../../core';

// import * as $ from 'jquery';
@Component({
  selector: 'app-goodsowner-info',
  templateUrl: './goodsowner-info.component.html',
  styleUrls: ['./goodsowner-info.component.scss']
})
export class GoodsownerInfoComponent implements OnInit {
  _entity: OwnerViewModel;
  public addEditForm: FormGroup;
  uri = '..CMND/';
  uploader: FileUploader = new FileUploader({ url: this.uri });
  attachmentList: any = [];

  uploaderCMND: FileUploader = new FileUploader({ url: 'CMND' });
  attachmentListCMND: any = [];
  isEditImg: boolean = false;
  @Input() set ownerViewModel(owner: OwnerViewModel) {
    if (owner !== null || owner !== undefined) {
      this._entity = new OwnerViewModel();
      this._entity = owner;
      this.addEditForm.reset(owner);
    } else
      this.addEditForm.reset();
  };
  @Input('imgList') arrimg2: any;
  @Output() ownerViewModelChange = new EventEmitter<OwnerViewModel>();
  @Output() closeForm = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private dataService: DataService) {
    this.addEditForm = this.formBuilder.group({
      accountId: '',
      fullName: '',
      nationality: '',
      licenseNo: '',
      issueDate: '',
      issueBy: '',
      gender: '',
      phoneNumber: ['', Validators.required],
      address: '',
      identityNo: ['', Validators.required],
      dateOfBirth: '',
      attachProperties: new FormData(),
    });
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
    };
    this.uploaderCMND.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentListCMND.push(JSON.parse(response));
    };
    // console.log(this.temp);
  }


  ngOnInit() {

  }

  Save(event) {
    // event.preventDefault();
    let temp = this._entity.attachProperties;
    if(this.isEditImg){
      this.addEditForm.get('attachProperties').setValue(JSON.parse(this.fetchImg()));
    }else{
      this.addEditForm.get('attachProperties').setValue(temp);
    }
    
    this._entity = this.addEditForm.value;
    this.convert();
    this.ownerViewModelChange.emit(this._entity);
    this.closeForm.emit();
  }


  fetchImg() {

    let myJson = '{';
    let i = 0;
    this.uploader.queue.forEach(element => {
      let path = '../IMAGE/' + element.url + '/';
      if (i < this.uploader.queue.length - 1)
        myJson += '"' + i + '":{"attachPath":"' + path + '","attachName":"' + element.file.name + '","attachCode":"' + element.url + '"},';
      else
        myJson += '"' + i + '":{"attachPath":"' + path + '","attachName":"' + element.file.name + '","attachCode":"' + element.url + '"}';

      i++;
    });
    myJson += '}';
    console.log(myJson);
    return myJson;

  }




  convert() {
    this._entity.dateOfBirth = new Date(this._entity.dateOfBirth).getTime();
    this._entity.issueDate = new Date(this._entity.issueDate).getTime();

  }



  selectFile(code: string) {
    switch (code) {
      case 'CMND':
        //upload Here!
        break;
      default:
        alert("Đã xảy ra lỗi xin vui lòng thử lại!");
    }
    console.log(this.uploader.queue);
    this.groupImg();
    this.isEditImg = true;
  }

  groupImg() {
    this.uploader.queue.length = 0;
    this.uploaderCMND.queue.forEach(el => this.uploader.queue.push(el));
  }

}