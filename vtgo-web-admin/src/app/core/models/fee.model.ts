export class FeeViewModel {
    constructor() {
        this.transferId = 0;
        this.rootId = -1;
    }
    transferId: number;
    rootId: number;
    bankCode: number;
    bankName: string;
    fee: number;
    linkIB: string;
    connect: number;
    branch: Array<any>;
}