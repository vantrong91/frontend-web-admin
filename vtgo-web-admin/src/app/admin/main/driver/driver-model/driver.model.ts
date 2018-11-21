export class DriverViewModel {
  constructor() {
    this.accountId = 0;
    // this.issueDate = 0;
    // this.extIssueDate = 0;
  }
  attNum: string;

  accountId: number;
  fullName: string;
  nationality: string;
  licenseNo: string;
  issueDate: number;
  issueBy: string;
  gender: string;
  ethnic: string;
  email: string;
  phoneNumber: string;
  address: any;
  contactAddress: any;
  typeLicenseNo: string;
  extLicenseNo: string;
  extIssueDate: number;
  extIssueBy: string;
  properties: string;
  attachProperties: any;
  vehicleId: string;
  state: string;
  birthday: number;
}
