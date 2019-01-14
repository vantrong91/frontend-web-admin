
import { Injectable, Inject } from '@angular/core';
import { SearchModel } from '../models/search.model';
import { Observable } from 'rxjs';
import { IDataServiceToken } from '../tokens/data.service.token';
import { IDataService } from '../interfaces/idata.service';
import { ConfigService } from './config.service';

@Injectable()
export class BanksService {
    constructor(
        @Inject(IDataServiceToken) private dataService: IDataService,
        private configSV: ConfigService) { }

    URL_BANKS = 'ums/category';

    GetBankList(entity: SearchModel) {
        let url = this.configSV.getConfiguration().BASE_API_SHARE + this.URL_BANKS + '/queryBankList';
        return this.dataService.PostFromOtherURL(url, entity);
    }
    GetById(bankId: any) {
        return null;
    }
    GetBranchByBankId(BankId: any) {
        return null;
    }
}