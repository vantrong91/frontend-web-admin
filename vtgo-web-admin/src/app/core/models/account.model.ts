export class AccountViewModel {

    constructor() {
        this.accountId = 0;
    }
    accountId: number;
    password: string;
    email: string;
    phoneNumber: string;
    fileAvata: Map<string, object>;
    fullName: string;
    accountType: number;
    accountToken: any;
    osType: any;
    deviceToken: any;
    salt: string;
    accountCode: string;
}