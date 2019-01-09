import { Injectable, Inject } from "@angular/core";
import { IDataServiceToken } from "../tokens/data.service.token";
import { DataService } from "./data.service";
import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";
import { AddressCategoryModel, ConfigService } from "..";

@Injectable()

export class AddressService {
    constructor(
        @Inject(IDataServiceToken) private dataService: DataService) {
    }
    
     BASE_OTHER_URL ='http://api.vtgo.vn:8888/v1/ums/category/';

    getCommune(entity: AddressCategoryModel): Observable<any> {
        return this.dataService.PostFromOtherURL(this.BASE_OTHER_URL + 'queryCommune', entity);
    }
    getDistrict(entity: AddressCategoryModel): Observable<any> {
        return this.dataService.PostFromOtherURL(this.BASE_OTHER_URL + 'queryDistrict', entity);
    }
    getProvince(entity: AddressCategoryModel): Observable<any> {
        return this.dataService.PostFromOtherURL(this.BASE_OTHER_URL+'queryProvince', entity);
    }
    getEthnic(): Observable<any> {
        return this.dataService.PostFromOtherURL(this.BASE_OTHER_URL + 'queryEthnic', {});
    }

    URL_API_ADDRESS = 'administration';
    getProvince1(entity: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ADDRESS}/getProvince`, entity);
    }
    getById(pk: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_ADDRESS}/getById`, { pk: pk });
    }
}