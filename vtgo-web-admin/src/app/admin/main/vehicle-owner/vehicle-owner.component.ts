import { Component, OnInit, Inject } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  PersonalViewModel,
  CompanyViewModel,
  SearchModel,
  IVehicleOwnerServiceToken,
  IVehicleOwnerService
} from '../../../core';

@Component({
  selector: 'app-vehicle-owner',
  templateUrl: './vehicle-owner.component.html',
  styleUrls: ['./vehicle-owner.component.scss']
})
export class VehicleOwnerComponent implements OnInit {
  closeResult: string;
  tabCompany = true;
  modalCompany = false;
  entityPersonal: PersonalViewModel;
  entityCompany: CompanyViewModel;
  searchObject: SearchModel;
  listOwner: any;

  constructor(private modalService: NgbModal, @Inject(IVehicleOwnerServiceToken) private vehicleOwnerService: IVehicleOwnerService) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.searchObject = new SearchModel();
    this.search(this.searchObject);
  }

  search(search: SearchModel) {
    this.vehicleOwnerService.Get(search).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.listOwner = response.data;
        }
      },
      error => { }
    );
  }

  selectType(event) {
    this.searchObject.searchParam = '';
    if (event.value === '0') {
      this.tabCompany = true;
      this.searchObject.ownerType = 0;
    } else {
      this.tabCompany = false;
      this.searchObject.ownerType = 1;
    }
  }

  getOwnerById(accountId: number) {
    this.vehicleOwnerService.GetOwnerById(accountId).subscribe(
      (response: any) => {
        if (response.status === 0) {
          if (this.tabCompany) {
            this.entityCompany = new CompanyViewModel();
            this.entityCompany = response.data[0];
          } else {
            this.entityPersonal = new PersonalViewModel();
            this.entityPersonal = response.data[0];
          }
        }
      }
    );
  }

  update(entityCompany) {
    this.vehicleOwnerService.Put(entityCompany).subscribe(
      (response: any) => {
        if (response.status === 0) {
        }
      }
    );
  }

  delete(accountId: number) {
    this.vehicleOwnerService.Delete(accountId).subscribe(
      (response: any) => {
        if (response.status === 0) {
        }
      }
    );
  }

  open(content) {
    // Instant Object
    if (this.tabCompany) {
      // Function change data Campany code here
      this.entityPersonal = undefined;
      if (this.entityCompany) {

      } else {
        this.entityCompany = new CompanyViewModel();
        this.entityCompany.fullName = 'Company';
      }
    } else {
      // Function change data Personal code here
      this.entityCompany = undefined;
      if (this.entityPersonal) {

      } else {
        this.entityPersonal = new PersonalViewModel();
        this.entityPersonal.fullName = 'Personal';
        this.entityPersonal.licenseNo = '1231230';
      }
    }

    // gan data vao service
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  edit(accountId, content) {
    this.getOwnerById(accountId);

    // gan data vao service
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  openSm(del) {
    this.modalService.open(del);
  }

  onSubmitPerson(event) {
    this.entityPersonal = event;
    console.log('Data', this.entityPersonal);
  }

  // getValueInMap(map: Map, key: string) {
  //   return map.get(key);
  // }
}
