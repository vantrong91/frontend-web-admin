import { Injectable, Inject } from "@angular/core";
import { IDataServiceToken } from "../tokens/data.service.token";
import { IDataService } from "../interfaces/idata.service";
import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";
import { PolicyViewModel } from "../models/policy.model";

@Injectable()

export class PolicyService {
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) { }
    URL_API_POLICY = 'policy';

    Get(entity: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_POLICY}/search`, entity);
    }

    Put(entity: PolicyViewModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_POLICY}/update`, entity);
    }

    GetById(policyId: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_POLICY}/get-by-id`, { policyId: policyId});
    }

    Create(entity: PolicyViewModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_POLICY}/create`, entity);
    }
}