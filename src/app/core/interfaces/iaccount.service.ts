import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";

export interface IAccountService{
    Get(entity: SearchModel): Observable<any>;
    getAccountById(accountId: number): Observable<any>;
}