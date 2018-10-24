import { Observable } from 'rxjs';
import { SearchModel } from '../models/search.model';
import { QuotationModel } from '../models/quotation.model';

export interface IQuotationService {
    Get(entity: SearchModel): Observable<any>;    
}
