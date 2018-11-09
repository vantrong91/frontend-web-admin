
import { Injectable, Inject } from '@angular/core';
import { SearchModel } from '../models/search.model';
import { Observable } from 'rxjs';
import { IDataServiceToken } from '../tokens/data.service.token';
import { IDataService } from '../interfaces/idata.service';
import { CompanyViewModel } from '../models/company.model';

@Injectable()
export class VehicleOwnerService {
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) { }

    URL_API_VEHICLE_OWNER = 'vehicle-owner';

    Get(entity: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_VEHICLE_OWNER}/search`, entity);
    }
    GetOwnerById(accountId: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_VEHICLE_OWNER}/get-by-id`, { accountId: accountId });
    }
    Create(entity: any): Observable<any> {
        return this.dataService.Post(`${this.URL_API_VEHICLE_OWNER}/create`, entity);
    }
    Put(entity: any): Observable<any> {
        return this.dataService.Post(`${this.URL_API_VEHICLE_OWNER}/update`, entity);
    }
    Delete(accountId: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_VEHICLE_OWNER}/delete`, { accountId: accountId });
    }
}
