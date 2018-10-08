export class OrderListViewModel {
    constructor() {

    }
    orderId: string;
    accountIdDriver: number;
    srcAddress: string;
    srcLat: number;
    srcLong: number;
    dstAddress: string;
    dstLat: number;
    dstLong: number;
    weight: number;
    deliverTime: number;
    toDeliverTime: number;
    receiveTime: number;
    toReceiveTime: number;
    state: number;
    lstProduct: object;
    orderComplete: Map<string, object>
    productImgLst: string;
    uRLFolderProductImg: string;
    quotationId: string;
    lstOrderHis: string;
    orderName: string;
    typeCar: number;
    sumProduct: number;
    sumVolume: number;
    note: string;
    productType: number;
    wantPrice: number;

    realDeliverTime: number;
    realToDeliverTime: number;
    realReceiveTime: number;
    realToReceiveTime: number;


}