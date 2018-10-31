import { Component, OnInit, Inject, AfterViewChecked, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, } from '@ng-bootstrap/ng-bootstrap';

import {

  SearchModel,
  IVehicleServiceToken,
  IVehicleService,
  VehicleViewModel
} from '../../../core';
import { DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  closeResult: string;
  _entityVehicle: VehicleViewModel;
  listVehicle: any;
  searchObject: SearchModel;
  isAdd = false;
  isShow = false;
  txtNoti = '';
  noneShow: boolean;

  constructor(private modalService: NgbModal,
    @Inject(IVehicleServiceToken) private vehicleService: IVehicleService) {
  }
  @ViewChild('vehicleTable') _vehicleTable: DatatableComponent;
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
  //New Vehicle
  open(content) {
    this.noneShow = false;
    this._entityVehicle = new VehicleViewModel;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  //View Vehicle
  view(vehicleId, content) {
    this._entityVehicle = new VehicleViewModel();
    this.getVehicleById(vehicleId);
    this.noneShow = true;
    this.modalService.open(content, { size: 'lg' });
  }
  // EDIT Vehicle
  edit(vehicleId, content) {
    this.getVehicleById(vehicleId);
    this.noneShow = false;
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
