import { Injectable, Inject } from "@angular/core";
import { IDataService } from "../interfaces/idata.service";
import { SearchModel } from "../models/search.model";
import { InsuOrderViewModel} from '../models/insuranceorder.model';
import { Observable } from "rxjs";
import { IDataServiceToken } from "../tokens/data.service.token";

@Injectable()

export class InsuranceOrderService {
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) { }

    URL_API_INSURANCE_ORDER = 'insurance-order';

    Get(entity: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_INSURANCE_ORDER}/search`, entity);
    }

    Create(entity: InsuOrderViewModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_INSURANCE_ORDER}/create`, entity);
    }
    Put(entity: InsuOrderViewModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_INSURANCE_ORDER}/update`, entity);
    }
    Delete(accountId: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_INSURANCE_ORDER}/delete`, { accountId: accountId });
    }
    GetById(accountId: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_INSURANCE_ORDER}/get-by-id`, { accountId: accountId });
    }
    Complete(entity: InsuOrderViewModel): Observable<any>{
        return this.dataService.Post(`${this.URL_API_INSURANCE_ORDER}/complete`, entity);
    }
}