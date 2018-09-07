import { Observable } from 'rxjs';
import { SearchModel } from '../models/search.model';
import { CompanyViewModel } from '../models/company.model';

export interface IDriverService {
    Get(entity: SearchModel): Observable<any>;
    GetOwnerById(accountId: number): Observable<any>;
    Create(entity: CompanyViewModel): Observable<any>;
    Put(entity: CompanyViewModel): Observable<any>;
    Delete(accountId: number): Observable<any>;
}
