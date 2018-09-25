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
  businessLicense: string;
  businessLicenseIssueDate: any;
  businessLicenseIssueBy: string;
  moderator: string;
  moderatorLicense: string;
  moderatorLicenseIssueDate: any;
  moderatorLicenseExpDate: number;
  businessTransportLicense: string;
  businessTransportLicenseIssueDate: number;
  businessTransportLicenseExpDate: number;
  nationality: string;
  licenseNo: string;
  issueDate: any;
  issueBy: string;
  gender: number;
  ethnic: string;
  vehicleOwnerType: number;
  contactAddress: Map<string, string>;
  address: Map<string, string>;
  attachProperties: Array<any>;
  bankAccountLst: Array<any>;
}
