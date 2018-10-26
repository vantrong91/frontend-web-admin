import { Observable } from 'rxjs';
import { SearchModel } from '../models/search.model';
import { OrderCompleteModel } from '../models/ordercomplete.mode';


export interface IOrderListService {
    Get(search: SearchModel): Observable<any>;
    Complete(entity: OrderCompleteModel): Observable<any>;
    // GetOwnerById(accountId: number): Observable<any>;
}
