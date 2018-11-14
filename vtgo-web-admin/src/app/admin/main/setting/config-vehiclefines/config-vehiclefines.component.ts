import { Component, OnInit, Inject } from '@angular/core';
import { SearchModel, CategoryViewModel, ICategoryServiceToken, ICategoryService } from 'src/app/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-config-vehiclefines',
  templateUrl: './config-vehiclefines.component.html',
  styleUrls: ['./config-vehiclefines.component.scss']
})
export class ConfigVehiclefinesComponent implements OnInit {

  lstCategory: any;
  searchObject: SearchModel;
  _entity: CategoryViewModel;
  closeResult: string;
  isShow = false;
  txtNoti = '';

  constructor(
    private modalService: NgbModal,
    @Inject(ICategoryServiceToken) private categoryService: ICategoryService
  ) { }

  ngOnInit() {
    this.initData();
  }

  initData(){
    this.searchObject = new SearchModel();
    this.searchObject.searchParam2 = 1;
    this.search(this.searchObject);
  }

  search(search: SearchModel){
    this.categoryService.GetType(search).subscribe(
      (response: any) => {
        if(response.status === 0){
          this.lstCategory = response.data;
          console.log(this.lstCategory.pk);
        }
      }
    )
  }
  getById(pk: number) {
    this._entity = new CategoryViewModel();
    this.categoryService.GetById(pk).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 0) {
          this._entity = response.data[0];
        }
      }
    )
  }

  edit(pk, content){
    this.getById(pk);
    this.modalService.open(content, { size: 'lg'});
  }

  onEditCategory(event){
    this._entity = event;
    this.categoryService.Put(this._entity).subscribe(
      (response:any) => {
        if(response.status === 0){
          this.initData();
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
          this.txtNoti = 'Sửa thành công';
        }else{
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
          this.txtNoti = 'Có lỗi xảy ra! Xin thử lại';

        }
      }
    )
  }

}
