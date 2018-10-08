import { Component, OnInit, Inject, AfterViewChecked, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, } from '@ng-bootstrap/ng-bootstrap';

import {

  SearchModel,
  IVehicleServiceToken,
  IVehicleService,
  VehicleViewModel,
  VehicleImg,
  IHelperService,
  IHelperServiceToken
} from '../../../core';
import { DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit, AfterViewChecked {
  closeResult: string;
  entityVehicle: VehicleViewModel;
  listVehicle: any;
  searchObject: SearchModel;
  isAdd = false;
  isShow = false;
  txtNoti = '';
  noneShow: boolean;

  constructor(private modalService: NgbModal,
    @Inject(IVehicleServiceToken) private vehicleService: IVehicleService,
    @Inject(IHelperServiceToken) private helperService: IHelperService) {
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
        console.log(response);
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
          this.entityVehicle = new VehicleViewModel();
          this.entityVehicle = response.data[0];
          console.log('mapping', this.entityVehicle.route);

        }
      }
    );
  }
  //New Vehicle
  open(content) {
    this.noneShow = false;
    this.entityVehicle = new VehicleViewModel;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  //View Vehicle
  view(vehicleId, content) {
    this.entityVehicle = new VehicleViewModel;
    this.getVehicleById(vehicleId);
    this.noneShow = true;
    this.modalService.open(content, { size: 'lg' });
  }
  // EDIT Vehicle
  edit(vehicleId, content) {
    this.entityVehicle = new VehicleViewModel;
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
            console.log('done');
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


  // mapingVehicleModel(responseModel): VehicleViewModel {
  //   let entity = new VehicleViewModel();
  //   entity = responseModel;
  //   if (entity.cargoInsuranceExpDate) {
  //     entity.cargoInsuranceExpDate = this.helperService.formatDateTime(entity.cargoInsuranceExpDate);
  //   }
  //   if (entity.cargoInsuranceIssueDate) {
  //     entity.cargoInsuranceIssueDate = this.helperService.formatDateTime(entity.cargoInsuranceIssueDate);
  //   }
  //   if (entity.civilInsuranceExpDate) {
  //     entity.civilInsuranceExpDate = this.helperService.formatDateTime(entity.civilInsuranceExpDate);
  //   }
  //   if (entity.civilInsuranceIssueDate) {
  //     entity.civilInsuranceIssueDate = this.helperService.formatDateTime(entity.civilInsuranceIssueDate);
  //   }
  //   if (entity.itineraryMonitoringExpDate) {
  //     entity.itineraryMonitoringExpDate = this.helperService.formatDateTime(entity.itineraryMonitoringExpDate);
  //   }
  //   if (entity.itineraryMonitoringIssueDate) {
  //     entity.itineraryMonitoringIssueDate = this.helperService.formatDateTime(entity.itineraryMonitoringIssueDate);
  //   }
  //   if (entity.licenceIssueDate) {
  //     entity.licenceIssueDate = this.helperService.formatDateTime(entity.licenceIssueDate);
  //   }
  //   if (entity.registrationExpDate) {
  //     entity.registrationExpDate = this.helperService.formatDateTime(entity.registrationExpDate);
  //   }
  //   if (entity.registrationIssueDate) {
  //     entity.registrationIssueDate = this.helperService.formatDateTime(entity.registrationIssueDate);
  //   }
  //   return entity;
  // }

  ngAfterViewChecked() {
    this._vehicleTable.recalculate();
  }
  // add Vehicle
  onSubmitVehicle(event) {
    this.entityVehicle = event;
    console.log('save');
    console.log(event);
    this.vehicleService.Create(this.entityVehicle).subscribe((response: any) => {
      if (response.status === 0) {
        this.initData();
        console.log('sucssces');
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
    this.entityVehicle = event;
    console.log('update')
    this.vehicleService.Put(this.entityVehicle).subscribe(
      (response: any) => {
        if (response.status === 0) {
          console.log('done');
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
