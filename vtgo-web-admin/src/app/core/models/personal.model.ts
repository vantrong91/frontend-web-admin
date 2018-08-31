export class PersonalViewModel {

  constructor() {
    this.accountId = 0;
  }
  accountId: number;
  fullName: string;
  contactPhone: string;
  email: string;
  contactPerson: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
  businessLicense: string;
  businessLicenseIssueDate: number;
  businessLicenseIssueBy: string;
  moderator: string;
  moderatorLicense: string;
  moderatorLicenseIssueDate: number;
  moderatorLicenseExpDate: number;
  businessTransportLicense: string;
  businessTransportLicenseIssueDate: number;
  businessTransportLicenseExpDate: number;
  nationality: string;
  licenseNo: string;
  issueDate: number;
  issueBy: string;
  gender: number;
  ethnic: string;
  vehicleOwnerType: number;
  contactAddress: Map<string, string>;
  address: Map<string, string>;
  attachProperties: Map<string, string>;
}
