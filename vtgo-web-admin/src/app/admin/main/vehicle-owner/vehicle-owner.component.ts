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
import { ToastrService } from 'ngx-toastr';

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

  isAddCompany = true;
  isAddPerson = true;

  nameDelete: any;

  constructor(private modalService: NgbModal,
    private toastr: ToastrService,
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
        console.log(response.data);
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
    this.search(this.searchObject);
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

    this.noneShow = false;
    this.isAddCompany = true;
    this.isAddPerson = true;
    // Instant Object
    if (this.tabCompany) {
      // Function change data Campany code here
      this.entityPersonal = undefined;
      this.entityCompany = new CompanyViewModel();
    } else {
      // Function change data Personal code here
      this.entityCompany = undefined;
      this.entityPersonal = new PersonalViewModel();
    }

    // gan data vao service
    this.modalService.open(content, { size: 'lg' });
  }

  edit(accountId, content) {
    this.isAddCompany = false;
    this.isAddPerson = false;
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

  openSm(del, id, name) {
    this.nameDelete = name;
    this.modalService.open(del, { size: 'sm' })
      .result.then(
        result => {
          this.closeResult = `Close with: ${result}`;
          this.vehicleOwnerService.Delete(id).subscribe(
            result => {
              if (result.status === 0) {
                this.toastr.info("Đã xóa id " + id, "Thông báo..");
                this.search(this.searchObject);
              } else {
                this.toastr.error("Đã xả ra lỗi xin vui lòng thử lại", "Thông báo...");
              }
            }
          );
        },
        reason => (this.closeResult = `Dismissed ${this.getDismissReason(reason)}`),
      );
  }

  onSubmitPerson(event) {
    this.entityPersonal = event;
    console.log('AddData', this.entityPersonal);
    this.vehicleOwnerService.Create(this.entityPersonal).subscribe(
      response => {
        if (response.status === 0) {
          this.toastr.success("Đã thêm khách hàng cá nhân!", "Thông báo...");
          this.search(this.searchObject);
        }
        else {
          switch (response.message) {
            case 'PhoneNumber was existed':
              this.toastr.clear();
              this.toastr.error("Số điện thoại đã được sử dụng.", "Đã xảy ra lỗi...",
                {
                  closeButton: true,
                  disableTimeOut: true
                });
              break;
            case 'Email was existed':
              this.toastr.clear();
              this.toastr.error("Email đã được sử dụng.", "Đã xảy ra lỗi...",
                {
                  closeButton: true,
                  disableTimeOut: true
                });
              break;
            default:
              this.toastr.clear();
              this.toastr.error("Đã xảy ra lỗi xin vui lòng thử lại!", "Thông báo...",
                {
                  closeButton: true,
                  disableTimeOut: true
                });
          }
        }
      }
    );
  }
  onEditPerson(event) {
    this.entityPersonal = event;
    console.log('EditData', this.entityPersonal);
  }

  onSubmitCompany(event) {
    console.log('Company: ', event);

    this.vehicleOwnerService.Create(event).subscribe(
      response => {
        if (response.status === 0) {
          this.toastr.success("Đã thêm khách hàng doanh nghiệp!", "Thông báo...");
          this.search(this.searchObject);
        }
        else {
          switch (response.message) {
            case 'PhoneNumber was existed':
              this.toastr.clear();
              this.toastr.error("Số điện thoại đã được sử dụng.", "Đã xảy ra lỗi...",
                {
                  closeButton: true,
                  disableTimeOut: true
                });
              break;
            case 'Email was existed':
              this.toastr.clear();
              this.toastr.error("Email đã được sử dụng.", "Đã xảy ra lỗi...",
                {
                  closeButton: true,
                  disableTimeOut: true
                });
              break;
            default:
              this.toastr.clear();
              this.toastr.error("Đã xảy ra lỗi xin vui lòng thử lại!", "Thông báo...",
                {
                  closeButton: true,
                  disableTimeOut: true
                });
          }
        }
      }
    );
  }

  onEditCompany(event) {
    console.log('edit:' + event);
    console.log(event);

    this.vehicleOwnerService.Put(event).subscribe(
      response => {
        if (response.message === "Successful") {
          this.search(this.searchObject);
          this.toastr.info("Chỉnh sửa thành công!", "Thông báo...");
        }
        else {
          this.toastr.clear();
          this.toastr.error("Đã xảy ra lỗi. Xin vui lòng thử lại", "Thông báo...");
        }
      },
      error => {
        this.toastr.clear();
        this.toastr.error("Lỗi máy chủ. Xin vui lòng thử lại", "Thông báo...");
      }
    );
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
      const businessLicense = new Date(entity.businessLicenseIssueDate);
      const businessLicenseFormat = {
        year: businessLicense.getUTCFullYear(),
        month: businessLicense.getUTCMonth(),
        day: businessLicense.getUTCDay()
      };
      entity.businessLicenseIssueDate = businessLicenseFormat;
    } else {
      entity.businessLicenseIssueDate = null;
    }

    if (entity.businessTransportLicenseExpDate) {
      const businessTransportExpDate = new Date(entity.businessTransportLicenseExpDate);
      const businessTransportExpDateFormat = {
        year: businessTransportExpDate.getUTCFullYear(),
        month: businessTransportExpDate.getUTCMonth(),
        day: businessTransportExpDate.getUTCDay()
      };
      entity.businessTransportLicenseExpDate = businessTransportExpDateFormat;
    } else {
      entity.businessTransportLicenseExpDate = null;
    }

    if (entity.businessTransportLicenseIssueDate) {
      const businessTransportIssueDate = new Date(entity.businessTransportLicenseIssueDate);
      const businessTransportIssueDateFormat = {
        year: businessTransportIssueDate.getUTCFullYear(),
        month: businessTransportIssueDate.getUTCMonth(),
        day: businessTransportIssueDate.getUTCDay()
      };
      entity.businessTransportLicenseIssueDate = businessTransportIssueDateFormat;
    } else {
      entity.businessTransportLicenseIssueDate = null;
    }

    if (entity.moderatorLicenseExpDate) {
      const moderatorLicenseIssueExp = new Date(entity.moderatorLicenseExpDate);
      const moderatorLicenseExpDateFormat = {
        year: moderatorLicenseIssueExp.getUTCFullYear(),
        month: moderatorLicenseIssueExp.getUTCMonth(),
        day: moderatorLicenseIssueExp.getUTCDay()
      };
      entity.moderatorLicenseExpDate = moderatorLicenseExpDateFormat;
    } else {
      entity.moderatorLicenseExpDate = null;
    }

    if (entity.moderatorLicenseIssueDate) {
      const moderatorLicenseIssue = new Date(entity.moderatorLicenseIssueDate);
      const businessTransportIssueDateFormat = {
        year: moderatorLicenseIssue.getUTCFullYear(),
        month: moderatorLicenseIssue.getUTCMonth(),
        day: moderatorLicenseIssue.getUTCDay()
      };
      entity.moderatorLicenseIssueDate = businessTransportIssueDateFormat;
    } else {
      entity.moderatorLicenseIssueDate = null;
    }
    console.log(entity);
    return entity;
  }
  mapingPersonalModel(responseModel): PersonalViewModel {
    let entity = new PersonalViewModel();
    entity = responseModel;

    // if (entity.businessLicenseIssueDate) {
    //   const businessLicense = new Date(entity.businessLicenseIssueDate);
    //   const businessLicenseFormat = {
    //     year: businessLicense.getUTCFullYear(),
    //     month: businessLicense.getUTCMonth(),
    //     day: businessLicense.getUTCDay()
    //   };
    //   entity.businessLicenseIssueDate = businessLicenseFormat;
    // } else {
    //   entity.businessLicenseIssueDate = null;
    // }

    if (entity.issueDate) {
      const issueDates = new Date(entity.issueDate);
      const issueDatesFormat = {
        year: issueDates.getUTCFullYear(),
        month: issueDates.getUTCMonth(),
        day: issueDates.getUTCDay()
      };
      entity.issueDate = issueDatesFormat;
    } else {
      entity.issueDate = null;
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
      const moderatorLicenseIssue = new Date(entity.moderatorLicenseIssueDate);
      const businessTransportIssueDateFormat = {
        year: moderatorLicenseIssue.getUTCFullYear(),
        month: moderatorLicenseIssue.getUTCMonth(),
        day: moderatorLicenseIssue.getUTCDay()
      };
      entity.moderatorLicenseIssueDate = businessTransportIssueDateFormat;
    } else {
      entity.moderatorLicenseIssueDate = null;
    }

    console.log(entity);
    return entity;
  }
}
