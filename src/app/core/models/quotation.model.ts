export class QuotationModel {
    constructor() {
      this.quotationId = "";
    } 
    quotationId: string;
    orderId: number;
    vehicleId: number;
    driverId: number;
    price: number;
    state: number;
    vat: number;
    commission: number;
    finesAmount: number;
    delayPrice: number;
    receivePrice: number;
    deliverPrice: number;
    driverVatTax: number;
    perDriverTax: number;
    reserveDriver: number;
    reserveOrder: number;
    receiveTime: number;
    toReceiveTime: number;
    deliverTime: number;
    toDeliverTime: number;
    numQuotation: number;
  }
  