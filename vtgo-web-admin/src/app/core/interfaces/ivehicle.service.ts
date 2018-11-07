import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";
import { VehicleViewModel } from "../models/vehicle.model";

export interface IVehicleService {
    Get(entity: SearchModel): Observable<any>;
    GetVehicleById(vehicleId: number): Observable<any>;
    Create(entity: VehicleViewModel): Observable<any>;
    Put(entity: VehicleViewModel): Observable<any>;
    Delete(vehicleId: number): Observable<any>;
    GetListVehicleType(entity: SearchModel): Observable<any>;
}