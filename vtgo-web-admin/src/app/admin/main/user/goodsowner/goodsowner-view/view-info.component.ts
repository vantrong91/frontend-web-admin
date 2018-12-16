import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OwnerViewModel } from '../model/owner.model';
import { DataService } from 'src/app/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.scss']
})
export class ViewInfoComponent implements OnInit {

  _entity: OwnerViewModel;
  public addEditForm: FormGroup;
  imgUrl = '';
  ulrImgFull = '';
  imgName = '';
  keyArr: any;


  @Input() set ownerViewModel(owner: OwnerViewModel) {
    if (owner !== null || owner !== undefined) {
      this._entity = new OwnerViewModel();
      this._entity = owner;
      this.keyArr = Object.values(this._entity.attachProperties);
      this.addEditForm.reset(owner);
    } else
      this.addEditForm.reset();
  };
  constructor(private dataService: DataService,
    private formBuilder: FormBuilder,
    private modalServices: NgbModal) {
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
