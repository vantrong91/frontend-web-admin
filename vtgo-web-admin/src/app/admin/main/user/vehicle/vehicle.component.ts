import { Component, OnInit, Inject, AfterViewChecked, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, } from '@ng-bootstrap/ng-bootstrap';

import {

  SearchModel,
  IVehicleServiceToken,
  IVehicleService,
  VehicleViewModel,
  DataService,
  IAddressServiceToken,
  IAddressService
} from '../../../../core';
import { DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  @ViewChild('vehicleTable') _vehicleTable: any;
  closeResult: string;
  _entityVehicle: VehicleViewModel;
  listVehicle: any;
  searchObject; searchObject2: SearchModel;
  isAdd = false;
  isShow = false;
  txtNoti = '';
  imgUrl = '';
  ulrImgFull = '';
  imgName = '';
  isToggle = false;
  oldLicenceIssueBy: string;



  constructor(private modalService: NgbModal,
    private dataService: DataService,
    @Inject(IVehicleServiceToken) private vehicleService: IVehicleService,
    @Inject(IAddressServiceToken) private addressService: IAddressService) {
  }
  ngOnInit() {
    this.initData();
  }

  initData() {
    this.searchObject = new SearchModel();
    this.searchObject.searchParam = '';
    this.search(this.searchObject);
  }

  search(search: SearchModel) {
    this.vehicleService.Get(search).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.listVehicle = response.data;
        }
      }
    )
  }

  searchByPressEnter(event) {
    if (event.keyCode == 13)
      this.search(this.searchObject);
  }

  getVehicleById(vehicleId: number) {
    this.vehicleService.GetVehicleById(vehicleId).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this._entityVehicle = new VehicleViewModel();
          this._entityVehicle = response.data[0];
        }
      }
    );
  }

  getUrlImg(folder: string) {
    this.imgUrl = this.dataService.GetBaseUrlImg(folder) + '/';
    return this.imgUrl;
  }

  openImg(ele, imgUrl, fileName) {
    this.ulrImgFull = imgUrl + fileName;
    this.imgName = fileName;
    this.modalService.open(ele, { windowClass: 'dark-modal', size: 'lg' });
  }

  toggleExpandRow(row) {
    if (row.licenceIssueBy > 0) {
      this.isToggle = true;
    } else {
      this.isToggle = false;
    }
    if (this.isToggle) {
      this.addressService.getById(row.licenceIssueBy).subscribe(
        (response: any) => {
          this.oldLicenceIssueBy = row.licenceIssueBy;
          row.licenceIssueBy = response.data[0].tenDinhDanh;
        }
      );
    }
    this._vehicleTable.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
    // console.log('Detail Toggled', event);
  }
  //New Vehicle
  open(content) {
    this._entityVehicle = new VehicleViewModel;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  //View Vehicle
  // EDIT Vehicle
  edit(row, content) {
    if (this.oldLicenceIssueBy !== undefined) {
      row.licenceIssueBy = this.oldLicenceIssueBy;
    }
    this._entityVehicle = row;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Close with : ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  //Delete Vehicle
  openSm(del, vehicleId) {
    this.modalService.open(del).result.then(result => {
      this.closeResult = `Close with: ${result}`;
      this.vehicleService.Delete(vehicleId).subscribe(
        (response: any) => {
          if (response.status === 0) {
            this.initData();
            this.isShow = true;
            setTimeout(() => {
              this.isShow = false;
            }, 2000);
            this.txtNoti = 'Xóa thành công';
          } else {
            this.txtNoti = 'Xóa thất bại';
          }
        }
      );
    }, reason => { this.closeResult = `Dismissed ${this.getDismissReason(reason)}` })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // add Vehicle
  onSubmitVehicle(event) {
    this._entityVehicle = event;
    this.vehicleService.Create(this._entityVehicle).subscribe((response: any) => {
      if (response.status === 0) {
        this.initData();
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 2000);
        this.txtNoti = 'Thêm thành công';
      } else {
        this.txtNoti = 'Có lỗi xảy ra, thêm thất bại';
      }
    })
  }

  // Edit Vehicle
  onEditVehicle(event) {
    this._entityVehicle = event;

    this.vehicleService.Put(this._entityVehicle).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.initData();
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
          this.txtNoti = 'Sửa thành công';
        } else {
          alert('ERROR');
        }
      }
    );
  }



}
