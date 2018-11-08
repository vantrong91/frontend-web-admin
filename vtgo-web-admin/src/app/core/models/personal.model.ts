export class PersonalViewModel {

  constructor() {
    this.bankAccountLst = [];
    this.attachProperties = [];
  }
  accountId: number;
  fullName: string;
  contactPhone: string;
  email: string;
  contactPerson: string;
  contactPersonPhone: string;
  contactPersonEmail: string;

  nationality: string;
  gender: number;
  ethnic: string;
 //CMND CCCD 
  licenseNo: string;
  issueDate: any;
  issueBy: string;
  //GPKDVT
  businessTransportLicense: string;
  businessTransportLicenseIssueDate: any;
  businessTransportLicenseExpDate: any;
  //GTDHVT
  moderator: string;
  moderatorLicense: string;
  moderatorLicenseIssueDate: any;
  moderatorLicenseExpDate: any;

  
  vehicleOwnerType: number;
  contactAddress: Map<string, string>;
  address: Map<string, string>;
  attachProperties: Array<any>;
  bankAccountLst: Array<any>;
}
