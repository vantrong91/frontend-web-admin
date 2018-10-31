import { Injectable, Inject } from "@angular/core";
import { IDataServiceToken } from "../tokens/data.service.token";
import { IDataService } from "../interfaces/idata.service";
import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";
import { CategoryViewModel } from '../models/category.model';

@Injectable()

export class CategoryService {
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) { }
    URL_API_CATEGORY = 'category';

    Get(entity: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_CATEGORY}/search`, entity);
    }

    Put(entity: CategoryViewModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_CATEGORY}/update`, entity);
    }

    GetById(pk: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_CATEGORY}/get-by-id`, { pk: pk });
    }
}