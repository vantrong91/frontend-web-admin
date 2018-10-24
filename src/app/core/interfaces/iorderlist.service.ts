import { Observable } from 'rxjs';
import { SearchModel } from '../models/search.model';


export interface IOrderListService {
    Get(search: SearchModel): Observable<any>;
    // GetOwnerById(accountId: number): Observable<any>;
}
