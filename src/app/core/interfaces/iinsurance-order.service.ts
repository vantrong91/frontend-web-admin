import { Observable } from "rxjs";
import { InsuOrderViewModel } from "../models/insuranceorder.model";
import { SearchModel } from "../models/search.model";

export interface IInsuranceOrderService {
    Get(entity: SearchModel): Observable<any>;
    GetVehicleById(accountId: number): Observable<any>;
    Create(entity: InsuOrderViewModel): Observable<any>;
    Put(entity: InsuOrderViewModel): Observable<any>;
    Delete(accountId: number): Observable<any>;
}