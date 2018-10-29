import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";
import { AccountViewModel } from "../models/account.model";

export interface IAccountService{
    Get(entity: SearchModel): Observable<any>;
    getAccountById(accountId: number): Observable<any>;
    Create(entity: AccountViewModel): Observable<any>;
    Logout(accountId: number): Observable<any>;
    
}