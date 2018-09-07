export class CompanyViewModel {

    constructor() {
    }
  accountId: number;
  fullName: string;
  contactPhone: string;
  email: string;
  director: string;
  taxCode: string;
  fax: string;
  website: string;
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
  companyPhone: string;
  businessTransportLicense: string;
  businessTransportLicenseIssueDate: number;
  businessTransportLicenseExpDate: number;
  businessTransportLicenseIssueBy: string;
  vehicleOwnerType: number;
  contactAddress: Map<string, string>;
  address: Map<string, string>;
  attachProperties: Map<string, string>;
}
