import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";

export interface IAddressService{
    getProvince(entity: SearchModel): Observable<any>;
    getById(pk: number): Observable<any>;
}