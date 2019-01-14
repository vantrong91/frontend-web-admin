import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";

export interface IBanksService{
    GetBankList(entity: SearchModel): Observable<any>;
    GetById(bankId: any): Observable<any>;
    GetBranchByBankId(BankId: any):Observable<any>;    
}