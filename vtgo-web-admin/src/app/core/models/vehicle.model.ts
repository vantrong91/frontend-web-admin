export class VehicleViewModel {

    constructor() {
        this.vehicleId = 0;

    }
    userId: number;
    vehicleId: number;
    ownerId: number;
    vehicleCode: string;
    route: Map<number, string>;
    vehicleType: Map<number, string>;
    licencePlate: string;
    weight: number;
    licence: string;
    licenceIssueDate: number;
    licenceIssueBy: string;
    registrationNo: string;
    registrationIssueDate: number;
    registrationExpDate: string;
    civilInsurance: string;
    civilInsuranceIssueDate: number;
    civilInsuranceExpDate: number;
    cargoInsurance: string;
    cargoInsuranceIssueDate: number;
    cargoInsuranceExpDate: number;
    itineraryMonitoring: string;
    itineraryMonitoringIssueDate: number;
    itineraryMonitoringExpDate: number;
    attachProperties: Map<string,object>;
    state: string;
    driverId: number;
    driverName: string;
    stt?: number;
    iz?: number;
}
