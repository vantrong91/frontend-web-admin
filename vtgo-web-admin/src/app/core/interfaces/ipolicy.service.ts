import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";
import { PolicyViewModel } from "../models/policy.model";

export interface IPolicyService{
    Get(entity: SearchModel): Observable<any>;
    Put(entity: PolicyViewModel): Observable<any>;
    GetById(policyId: number): Observable<any>;
    Create(entity: PolicyViewModel): Observable<any>;
}