export class VehicleViewModel {

    constructor() {
        this.vehicleId = 0;
    }
    userId: number;
    vehicleId: number;
    ownerId: number;
    vehicleCode: string;
    route?: number;
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
    ipMonitoring: string;
    carBadges: string; //Phu hieu xe
    carBaIssDate: any;
    carBaExpDate: any;
    //attachProperties: Array<any>;
    attachProperties: any;
    state: string;
    driverId: number;
    driverName: string;
}
