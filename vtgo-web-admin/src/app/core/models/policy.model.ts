export class PolicyViewModel{
    constructor(){
        this.policyId = 0;
    }
    policyId: number;
    ratioVat: number;
    constant: number;
    ratiRoseNoVat: number;
    ratioRoseVat: number;
    ratioVatTax: number;
    ratioPerTax: number;
    description: string;
}