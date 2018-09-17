export class VehicleViewModel {

    constructor() {
        //this.userId = 0;
    }
    userId: number;
    vehicleId: number;
    ownerId: number;
    vehicleCode: string;
    route:any;// Map<number, string>;
    vehicleType: any;
    licencePlate: string;
    weight: number;
    licence: string;
    licenceIssueDate: any;
    licenceIssueBy: string;
    registrationNo: string;
    registrationIssueDate: any;
    registrationExpDate: any;
    civilInsurance: string;
    civilInsuranceIssueDate: any;
    civilInsuranceExpDate: any;
    cargoInsurance: string;
    cargoInsuranceIssueDate: any;
    cargoInsuranceExpDate: any;
    itineraryMonitoring: string;
    itineraryMonitoringIssueDate: any;
    itineraryMonitoringExpDate: any;
    attachProperties: Map<string,object>;
    state: string;
    driverId: number;
    driverName: string;
    stt?: any;
    i?: any;
}
