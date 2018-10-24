export class BalanceModel {

    constructor() {
        this.accountId = 0;
    }
  accountId: number;
  balance: Map<number,Map<String,Object>>;
  debt: number;
  code: string;
}
