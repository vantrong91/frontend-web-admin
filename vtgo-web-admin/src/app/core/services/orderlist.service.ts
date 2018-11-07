
import { Injectable, Inject } from '@angular/core';
import { SearchModel } from '../models/search.model';
import { Observable } from 'rxjs';
import { IDataServiceToken } from '../tokens/data.service.token';
import { IDataService } from '../interfaces/idata.service';
import { OrderListViewModel } from '../models/orderlist.model';
import { OrderCompleteModel } from '../models/ordercomplete.mode';

@Injectable()
export class OrderListService {
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) { }

    URL_API_ORDER_LIST = 'order';

    Get(entity: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ORDER_LIST}/search`, entity);
    }

    Complete(entity: OrderCompleteModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ORDER_LIST}/complete`, entity);
    }

    GetComplete(entity: OrderCompleteModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ORDER_LIST}/getComplete`, entity);
    }
    GetQuotationByOrderId(search: SearchModel): Observable<any> {
        return this.dataService.Post(`quotation/get-by-order-id`, search);
    }
}
