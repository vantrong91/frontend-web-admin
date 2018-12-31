import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AccountViewModel, DataService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-technicalpopup',
  templateUrl: './technicalpopup.component.html',
  styleUrls: ['./technicalpopup.component.scss']
})
export class TechnicalpopupComponent implements OnInit {

  
  public addEditForm: FormGroup;
  _entity: AccountViewModel;
  uploaderAVATA: FileList;
  keyArr: any;
  imgUrl = '';
  ulrImgFull = '';
  imgName = '';
  confirmPassword: any;
  
  @Input() isShowAvatar;

  @Input() set _entityAccount(accountData: AccountViewModel) {
    if (accountData.accountId !== 0) {
      this._entity = new AccountViewModel();
      this._entity = accountData;
      this.keyArr = this._entity.fileAvata;
      
      this.addEditForm.reset(accountData);
    } else {
      this._entity = new AccountViewModel();
      this.addEditForm.reset();
    }
  };

  @Output() closeForm = new EventEmitter<any>();
  @Output() accountViewModelChange = new EventEmitter<AccountViewModel>();
  constructor(private dataService: DataService,private toastr: ToastrService,private modalServices: NgbModal,private formBuilder: FormBuilder) {
    this.addEditForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{9,15}$/)]),
      password: new FormControl('', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]),
      fileAvata: this.formBuilder.group({
        AVATA: new FormArray([])
      }),
      accountType: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {    
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
