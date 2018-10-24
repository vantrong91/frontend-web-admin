import { Observable } from 'rxjs';
import { SearchModel } from '../models/search.model';
import { BalanceModel } from '../models/balance.model';

export interface IBalanceService {
    Get(entity: SearchModel): Observable<any>;
    getBalanceId(accountId: number): Observable<any>;
    Create(entity: BalanceModel): Observable<any>;
    Put(entity: BalanceModel): Observable<any>;
    Delete(accountId: number): Observable<any>;
}
