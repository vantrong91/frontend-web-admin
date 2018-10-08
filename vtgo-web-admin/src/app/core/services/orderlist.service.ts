
import { Injectable, Inject } from '@angular/core';
import { SearchModel } from '../models/search.model';
import { Observable } from 'rxjs';
import { IDataServiceToken } from '../tokens/data.service.token';
import { IDataService } from '../interfaces/idata.service';
import { OrderListViewModel } from '../models/orderlist.model';

@Injectable()
export class OrderListService {
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) { }

    URL_API_ORDER_LIST  = 'order';

    Get(entity: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ORDER_LIST}/search`, entity);
    }    
}
