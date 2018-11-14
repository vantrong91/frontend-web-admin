import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";

export interface IBankListService{
    Get(entity: SearchModel): Observable<any>;
    GetById(bankId: number): Observable<any>;
    GetBranchByBankId(BankId:number);    
}