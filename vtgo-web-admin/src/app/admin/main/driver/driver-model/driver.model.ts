export class DriverViewModel {
  constructor() {
    this.accountId = 0;
    this.issueDate = 0;
    this.issueDate = 0;
  }


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
  address: Map<string, string>;
  contactAddress: Map<string, string>;
  typelicenseno: string;
  extLicenseNo: string;
  extIssueDate: number;
  extIssueBy: string;
  attachProperties: string;
  properties: Map<string, object>;
  vehicleId: string;
  state: string;
  birthday: string;
}
