import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthenService } from '../../../core/services/authen.service';

import {

  SearchModel,
  IVehicleServiceToken,
  IVehicleService,
  VehicleViewModel
} from '../../../core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  closeResult: string;
  entityVehicle: VehicleViewModel;
  listVehicle: any;
  searchObject: SearchModel;
  isAdd = false;
  isShow = false;
  txtNoti = '';
  element: any;
  noneShow: boolean;

  constructor(private modalService: NgbModal,
    @Inject(IVehicleServiceToken) private vehicleService: IVehicleService) {
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
  getVehicleById(vehicleId: number) {
    this.vehicleService.GetVehicleById(vehicleId).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.entityVehicle = new VehicleViewModel();
          this.entityVehicle = response.data[0];
        }
      }
    );
  }
  // if (this.entityCompany) {
        
  // } else {
  //   this.entityCompany = new CompanyViewModel();
  //   this.entityCompany.fullName = 'Company';
  // }
  
  open(content) {
    if(this.entityVehicle){} else{
      this.entityVehicle = new VehicleViewModel;
      //this.entityVehicle.driverName='Hoang';
      this.entityVehicle = undefined;
    }
    //this.entityVehicle = new VehicleViewModel;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  edit(vehicleId, content) {
    this.getVehicleById(vehicleId);
    this.noneShow = false;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Close with : ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

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
            alert("Đã xảy ra lỗi vui lòng thử lại!");
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

  onSubmitVehicle(event) {
    this.entityVehicle = event;
    console.log('save');
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
        alert('Có lỗi xảy ra');
      }
    })
  }

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
