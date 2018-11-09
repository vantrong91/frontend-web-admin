import { Injectable, Inject } from "@angular/core";
import { IDataServiceToken } from "../tokens/data.service.token";
import { DataService } from "./data.service";
import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";

@Injectable()

export class AddressService {
    constructor(@Inject(IDataServiceToken) private dataService: DataService) { }

    URL_API_ADDRESS = 'administration';
    getProvince(entity: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ADDRESS}/getProvince`, entity);
    }
    getById(pk: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ADDRESS}/getById`, { pk: pk });
    }
}