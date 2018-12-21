import { Injectable, Inject } from "@angular/core";
import { IDataServiceToken } from "../tokens/data.service.token";
import { IDataService } from "../interfaces/idata.service";
import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";
import { AccountViewModel } from "../models/account.model";

@Injectable()

export class AccountService {
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) { }

    URL_API_ACCOUNT = 'account-man';

    Get(entity: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ACCOUNT}/search`, entity);
    }
    GetAccountById(accountId: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ACCOUNT}/get-by-id`, { accountId: accountId });
    }
    GetByEmail(search: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ACCOUNT}/search-by-email`, search);
    }
    Create(entity: AccountViewModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ACCOUNT}/create`, entity);
    }
    Logout(accountId: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ACCOUNT}/logout`, { accountId: accountId });
    }
    GetByAccCode(account: AccountViewModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ACCOUNT}/get-by-acc-code`, account);
    }

}