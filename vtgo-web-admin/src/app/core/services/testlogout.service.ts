import { Injectable, Inject } from "@angular/core";
import { IDataServiceToken } from "../tokens/data.service.token";
import { IDataService } from "../interfaces/idata.service";
import { Observable } from "rxjs";

@Injectable()

export class TestLogoutService {
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) {

    }
    URL_API_ACCOUNT = 'account-man';

    Logout(accountId: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ACCOUNT}/logout`, { accoundId: accountId });
    }
}