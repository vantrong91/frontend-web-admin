import { Injectable, Inject } from "@angular/core";
import { IDataServiceToken } from "../tokens/data.service.token";
import { IDataService } from "../interfaces/idata.service";
import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";
import { VehicleViewModel } from "../models/vehicle.model";

@Injectable()
export class VehicleService{
    constructor(@Inject(IDataServiceToken) private dataService: IDataService) {}
    URL_API_VEHICLE = 'vehicle';

    Get(entity: SearchModel): Observable<any> {
        return this.dataService.Post(`${this.URL_API_VEHICLE}/search`, entity);
    }
    GetVehicleById(vehicleId: number): Observable<any> {
        return this.dataService.Post(`${this.URL_API_VEHICLE}/get-by-id`, {vehicleId: vehicleId});
    }
    Create(entity: VehicleViewModel): Observable<any>{
        return this.dataService.Post(`${this.URL_API_VEHICLE}/create`, entity);
    }
    Put(entity: VehicleViewModel): Observable<any>{
        return this.dataService.Post(`${this.URL_API_VEHICLE}/update`, entity);
    }
    Delete(vehicleId: number): Observable<any>{
        return this.dataService.Post(`${this.URL_API_VEHICLE}/delete`, {vehicleId: vehicleId});
    }
}