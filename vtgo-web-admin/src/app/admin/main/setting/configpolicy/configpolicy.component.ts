import { Component, OnInit, Inject } from '@angular/core';
import { SearchModel, PolicyViewModel, IPolicyServiceToken, IPolicyService } from 'src/app/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-configpolicy',
  templateUrl: './configpolicy.component.html',
  styleUrls: ['./configpolicy.component.scss']
})
export class ConfigpolicyComponent implements OnInit {

  lstPolicy: any;
  searchObject: SearchModel;
  _entity: PolicyViewModel;
  isShow = false;
  txtNoti = '';
  isAdd: boolean;

  constructor(
    private modalService: NgbModal,
    @Inject(IPolicyServiceToken) private policyService: IPolicyService
  ) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.searchObject = new SearchModel();
    this.searchObject.searchParam = '';
    this.search(this.searchObject);
  }

  search(search: SearchModel) {
    this.policyService.Get(search).subscribe(
      (response: any) => {
        this.lstPolicy = response.data;
      }
    )
  }

  open(content) {
    this.isAdd = true;
    this._entity = new PolicyViewModel();
    this.modalService.open(content, { size: 'lg' });
  }

  edit(row, content) {
    this.isAdd = false;
    this._entity = new PolicyViewModel();
    this._entity = row;
    this.modalService.open(content, { size: 'lg' });
  }

  onAddPolicy(event) {
    this._entity = event;
    this.policyService.Create(this._entity).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.initData();
          this.isShow =  true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
          this.txtNoti = 'Thêm thành công chính sách'
        }else{
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          });
          this.txtNoti = "Có lỗi xảy ra: " + response.message;
        }

      }
    )
  }

  onEditPolicy(event) {
    this._entity = event;
    this.policyService.Put(this._entity).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.initData();
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
          this.txtNoti = 'Sửa thành công';
        } else {
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
          this.txtNoti = 'Có lỗi xảy ra: ' + response.message;
        }
      }
    )
  }

}
