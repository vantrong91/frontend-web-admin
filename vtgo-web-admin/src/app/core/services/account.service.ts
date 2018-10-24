import { Injectable, Inject } from "@angular/core";
import { IDataServiceToken } from "../tokens/data.service.token";
import { IDataService } from "../interfaces/idata.service";
import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";
import { AccountViewModel } from "../models/account.model";

@Injectable()

export class AccountService{
    constructor(@Inject(IDataServiceToken) private dataService: IDataService){}

    URL_API_ACCOUNT = 'account-man';

    Get(entity: SearchModel): Observable<any>{
        return this.dataService.Post(`${this.URL_API_ACCOUNT}/search`, entity);
    }
    GetAccountById(accountId: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ACCOUNT}/get-by-id`,{ accountId: accountId});
    }
    Create(entity: AccountViewModel): Observable<any>{
        return this.dataService.Post(`${this.URL_API_ACCOUNT}/create`, entity);
    }
}