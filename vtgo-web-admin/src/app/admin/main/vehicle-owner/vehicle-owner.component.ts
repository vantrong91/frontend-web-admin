import { Component, Inject, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CompanyViewModel,
  IVehicleOwnerService,
  IVehicleOwnerServiceToken,
  PersonalViewModel,
  SearchModel,
  IHelperService,
  IHelperServiceToken
} from '../../../core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-vehicle-owner',
  templateUrl: './vehicle-owner.component.html',
  styleUrls: ['./vehicle-owner.component.scss']
})
export class VehicleOwnerComponent implements OnInit, AfterViewChecked {
  closeResult: string;
  tabCompany = true;
  modalCompany = false;
  entityPersonal: PersonalViewModel;
  entityCompany: CompanyViewModel;
  searchObject: SearchModel;
  listOwnerCompany: any;
  listOwnerPersonal: any;
  noneShow: boolean;
  constructor(private modalService: NgbModal,
    @Inject(IVehicleOwnerServiceToken) private vehicleOwnerService: IVehicleOwnerService,
    @Inject(IHelperServiceToken) private helperService: IHelperService) {
  }
  @ViewChild('companyTable') _companyTable: DatatableComponent;
  @ViewChild('personTable') _personTable: DatatableComponent;
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
          if (this.searchObject.ownerType === 0) {
            this.listOwnerCompany = response.data;
          } else {
            this.listOwnerPersonal = response.data;
          }
        }
      },
      error => {
      }
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
            this.entityCompany = this.mapingCompanyModel(response.data[0]);
          } else {
            this.entityPersonal = new PersonalViewModel();
            this.entityPersonal = this.mapingPersonalModel(response.data[0]);
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
      }
    } else {
      // Function change data Personal code here
      this.entityCompany = undefined;
      if (this.entityPersonal) {
      } else {
        this.entityPersonal = new PersonalViewModel();
      }
    }

    // gan data vao service
    this.modalService.open(content, { size: 'lg' });
  }

  edit(accountId, content) {
    this.getOwnerById(accountId);
    this.noneShow = false;
    // gan data vao service
    this.modalService.open(content, { size: 'lg' });
  }

  view(accountId, content) {
    this.getOwnerById(accountId);
    this.noneShow = true;

    // gan data vao service
    this.modalService.open(content, { size: 'lg' });
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
  ngAfterViewChecked() {
    if (this.tabCompany) {
      this._companyTable.recalculate();
    } else {
      this._personTable.recalculate();
    }
  }

  mapingCompanyModel(responseModel): CompanyViewModel {
    let entity = new CompanyViewModel();
    entity = responseModel;

    if (entity.businessLicenseIssueDate) {
      entity.businessLicenseIssueDate = this.helperService.formatDateTime(entity.businessLicenseIssueDate);
    }

    if (entity.businessTransportLicenseExpDate) {
      entity.businessTransportLicenseExpDate = this.helperService.formatDateTime(entity.businessTransportLicenseExpDate);
    }

    if (entity.businessTransportLicenseIssueDate) {
      entity.businessTransportLicenseIssueDate = this.helperService.formatDateTime(entity.businessTransportLicenseIssueDate);
    }

    if (entity.moderatorLicenseExpDate) {
      entity.moderatorLicenseExpDate = this.helperService.formatDateTime(entity.moderatorLicenseExpDate);
    }

    if (entity.moderatorLicenseIssueDate) {
      entity.moderatorLicenseIssueDate = this.helperService.formatDateTime(entity.moderatorLicenseIssueDate);
    }

    console.log(entity);
    return entity;
  }
  mapingPersonalModel(responseModel): PersonalViewModel {
    let entity = new PersonalViewModel();
    entity = responseModel;

    if (entity.businessLicenseIssueDate) {
      entity.businessLicenseIssueDate = this.helperService.formatDateTime(entity.businessLicenseIssueDate);
    }

    if (entity.businessTransportLicenseExpDate) {
      entity.businessTransportLicenseExpDate = this.helperService.formatDateTime(entity.businessTransportLicenseExpDate);
    }

    if (entity.businessTransportLicenseIssueDate) {
      entity.businessTransportLicenseIssueDate = this.helperService.formatDateTime(entity.businessTransportLicenseIssueDate);
    }

    if (entity.moderatorLicenseExpDate) {
      entity.moderatorLicenseExpDate = this.helperService.formatDateTime(entity.moderatorLicenseExpDate);
    }

    if (entity.moderatorLicenseIssueDate) {
      entity.moderatorLicenseIssueDate = this.helperService.formatDateTime(entity.moderatorLicenseIssueDate);
    }

    console.log(entity);
    return entity;
  }
}
