import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";
import { AccountViewModel } from "../models/account.model";

export interface IAccountService {
    Get(entity: SearchModel): Observable<any>;
    getAccountById(accountId: number): Observable<any>;
    GetByEmail(search: SearchModel): Observable<any>;
    Create(entity: AccountViewModel): Observable<any>;
    Update(account: AccountViewModel): Observable<any>;
    Logout(accountId: number): Observable<any>;
    GetByAccCode(account: AccountViewModel): Observable<any>;
    ChangeState(account: AccountViewModel): Observable<any>;
    Delete(account: AccountViewModel): Observable<any>;
}