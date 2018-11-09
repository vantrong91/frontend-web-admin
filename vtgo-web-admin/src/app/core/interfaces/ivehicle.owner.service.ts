import { Observable } from 'rxjs';
import { SearchModel } from '../models/search.model';
import { CompanyViewModel } from '../models/company.model';

export interface IVehicleOwnerService {
    Get(entity: SearchModel): Observable<any>;
    GetOwnerById(accountId: number): Observable<any>;
    Create(entity: any): Observable<any>;
    Put(entity: any): Observable<any>;
    Delete(accountId: number): Observable<any>;
}
