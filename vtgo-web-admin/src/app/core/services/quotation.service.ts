
import { Injectable, Inject } from '@angular/core';
import { SearchModel } from '../models/search.model';
import { Observable } from 'rxjs';
import { IDataServiceToken } from '../tokens/data.service.token';
import { IDataService } from '../interfaces/idata.service';
import { QuotationModel } from '../models/quotation.model';

@Injectable()
export class QuotationService {
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) { }

    URL_API_QUOTATION = 'quotation';

    Get(entity: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_QUOTATION}/search`, entity);
    }
}
