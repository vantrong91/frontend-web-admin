export class LoginViewModel {
    email: string;
    password: string;
}

export class LoggedInUser {
    accountId: string;
    accountToken: string;
    accountType: any;
    fullName: string;
    email: string;
    phoneNumber: string;
    fileAvata: Map<string, object>;

    constructor(
        accoundId: string,
        accountToken: string,
        fullName: string,
        accountType: any, 
        email: string,
        phoneNumber: string,
        fileAvata: Map<string, object>) {
        this.accountId = accoundId;
        this.accountToken = accountToken;
        this.fullName = fullName;
        this.accountType = accountType;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.fileAvata = fileAvata;
    }
}
