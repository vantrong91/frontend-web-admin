import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { SearchModel, CategoryViewModel, ICategoryServiceToken, ICategoryService } from 'src/app/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-config-vehiclefines',
  templateUrl: './config-vehiclefines.component.html',
  styleUrls: ['./config-vehiclefines.component.scss']
})
export class ConfigVehiclefinesComponent implements OnInit {

  lstCategory: any;
  lstCategoryToggle: any;
  searchObject: SearchModel;
  _entity: CategoryViewModel;
  closeResult: string;
  isShow = false;
  txtNoti = '';
  submitted = true;
  @ViewChild('myTable') table: any;

  constructor(private modalService: NgbModal,
    @Inject(ICategoryServiceToken) private categoryService: ICategoryService) {}

  ngOnInit() {
    this.initData();
    this.table.rowDetail.expandAllRows()
  }

  //Load all data
  initData() {
    this.searchObject = new SearchModel();
    this.searchObject.searchParam2 = 1;
    this.search(this.searchObject);
    this.searchType(this.searchObject);
    
    
    
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
  //Lay ra list cha
  search(search: SearchModel) {
    this.categoryService.Get(search).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.lstCategory = response.data;
        }
      }
    )
  }
  //Lay ra list con
  searchType(search: SearchModel) {
    this.categoryService.GetType(search).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.lstCategoryToggle = response.data;
        }
      }
    )
  }
  onSumit(pk){
    console.log(pk);
    
    this.submitted = !this.submitted;
  }

  getById(pk: number) {
    this._entity = new CategoryViewModel();
    this.categoryService.GetById(pk).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this._entity = response.data[0];
        }
      }
    )
  }

  edit(pk, content) {
    this.getById(pk);
    this.modalService.open(content, { size: 'lg' });
  }

  onEditCategory(event) {
    this._entity = event;
    console.log(event);
    this.categoryService.Put(this._entity).subscribe(
      (response: any) => {
        if (response.status === 0) {
          console.log(response);
          this.initData();
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 3000);
          this.txtNoti = 'Sửa thành công loại xe có mã: ' + event.pk;
        } else {
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
          this.txtNoti = 'Có lỗi xảy ra! Xin thử lại' + response.message;
        }
      }
    )
  }
}
