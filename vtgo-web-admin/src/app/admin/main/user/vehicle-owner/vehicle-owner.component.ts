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
} from '../../../../core';
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
      },
      error => {
      }
    );
  }

  searchByPressEnter(event) {
    if (event.keyCode == 13)
      this.search(this.searchObject);
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


  getOwnerById(accountId: number, content) {
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
          this.modalService.open(content, { size: 'lg' });
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
    this.getOwnerById(accountId, content);
    this.noneShow = false;
  }

  view(accountId, content) {
    this.getOwnerById(accountId, content);
    this.noneShow = true;
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
        reason => { }
      );
  }

  onCreate(event) {

    this.vehicleOwnerService.Create(event).subscribe(
      response => {
        if (response.status === 0) {
          this.toastr.success("Đã thêm khách hàng!", "Thông báo...");
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

  onEdit(event) {


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
      const date = new Date(entity.businessLicenseIssueDate);
      const businessTransportIssueDateFormat = {
        year: date.getUTCFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      entity.businessLicenseIssueDate = businessTransportIssueDateFormat;
    } else {
      entity.businessLicenseIssueDate = null;
    }

    if (entity.businessTransportLicenseExpDate) {
      const date = new Date(entity.businessTransportLicenseExpDate);
      const businessTransportIssueDateFormat = {
        year: date.getUTCFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      entity.businessTransportLicenseExpDate = businessTransportIssueDateFormat;
    } else {
      entity.businessTransportLicenseExpDate = null;
    }

    if (entity.businessTransportLicenseIssueDate) {
      const date = new Date(entity.businessTransportLicenseIssueDate);
      const businessTransportIssueDateFormat = {
        year: date.getUTCFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      entity.businessTransportLicenseIssueDate = businessTransportIssueDateFormat;
    } else {
      entity.businessTransportLicenseIssueDate = null;
    }

    if (entity.moderatorLicenseExpDate) {
      const date = new Date(entity.moderatorLicenseExpDate);
      const businessTransportIssueDateFormat = {
        year: date.getUTCFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      entity.moderatorLicenseExpDate = businessTransportIssueDateFormat;
    } else {
      entity.moderatorLicenseExpDate = null;
    }

    if (entity.moderatorLicenseIssueDate) {
      const date = new Date(entity.moderatorLicenseIssueDate);
      const businessTransportIssueDateFormat = {
        year: date.getUTCFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      entity.moderatorLicenseIssueDate = businessTransportIssueDateFormat;
    } else {
      entity.moderatorLicenseIssueDate = null;
    }
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
        month: issueDates.getMonth() + 1,
        day: issueDates.getDate()
      };
      entity.issueDate = issueDatesFormat;
    } else {
      entity.issueDate = null;
    }

    if (entity.businessTransportLicenseExpDate) {
      const date = new Date(entity.businessTransportLicenseExpDate);
      const dateFormat = {
        year: date.getUTCFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      entity.businessTransportLicenseExpDate = dateFormat;
    } else {
      entity.businessTransportLicenseExpDate = null;
    }

    if (entity.businessTransportLicenseIssueDate) {
      const date = new Date(entity.businessTransportLicenseIssueDate);
      const dateFormat = {
        year: date.getUTCFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      entity.businessTransportLicenseIssueDate = dateFormat;
    } else {
      entity.businessTransportLicenseIssueDate = null;
    }
    if (entity.moderatorLicenseExpDate) {
      const date = new Date(entity.moderatorLicenseExpDate);
      const dateFormat = {
        year: date.getUTCFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      entity.moderatorLicenseExpDate = dateFormat;
    } else {
      entity.moderatorLicenseExpDate = null;
    }

    if (entity.moderatorLicenseIssueDate) {
      const date = new Date(entity.moderatorLicenseIssueDate);
      const businessTransportIssueDateFormat = {
        year: date.getUTCFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      entity.moderatorLicenseIssueDate = businessTransportIssueDateFormat;
    } else {
      entity.moderatorLicenseIssueDate = null;
    }

    return entity;
  }
}
