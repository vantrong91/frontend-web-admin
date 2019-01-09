import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";
import { AddressCategoryModel } from "..";

export interface IAddressService{

    getCommune(entity: AddressCategoryModel): Observable<any>;
    getDistrict(entity: AddressCategoryModel): Observable<any>;
    getProvince(entity: AddressCategoryModel): Observable<any>;
    getEthnic():Observable<any>;

    getProvince1(entity: SearchModel): Observable<any>;
    getById(pk: number): Observable<any>;
}