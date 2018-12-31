export class BalanceHisModel {

    constructor() {
        this.hisId = 0;
    }
    hisId: number;
    accountId: number;
    hisType: string;
    hisContent: string;
    iP: string;
    balanceBefor: number;
    balanceAfter: number;
    amount: number;
    time: number;
    fromAcctNumber: string;
    toAcctNumber: string;
}
