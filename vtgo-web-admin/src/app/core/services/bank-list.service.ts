
import { Injectable, Inject } from '@angular/core';
import { SearchModel } from '../models/search.model';
import { Observable } from 'rxjs';
import { IDataServiceToken } from '../tokens/data.service.token';
import { IDataService } from '../interfaces/idata.service';

@Injectable()
export class BankListService {
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) { }

    URL_API_BANKLIST = 'trans-fee';

    Get(entity: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_BANKLIST}/search`, entity);
    }
    GetById(bankId: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_BANKLIST}/get-by-id`, bankId);

    }
    GetBranchByBankId(BankId: number) {
        return this.dataService.Post(`${this.URL_API_BANKLIST}/get-branch-by-bank-id`, BankId);
    }
}
