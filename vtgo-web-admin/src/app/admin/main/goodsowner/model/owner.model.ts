export class OwnerViewModel {
    constructor() {
      this.accountId = 0;
    }  
    accountId: number;
    fullName: string;
    nationality: string;
    issueDate: number;
    issueBy: string;
    gender: number;
    phoneNumber: string;
    address: string;
    identityNo: string;
    dateOfBirth: number;
    properties: Map<string, object>;
    attachProperties: Map<string, object>;
  }