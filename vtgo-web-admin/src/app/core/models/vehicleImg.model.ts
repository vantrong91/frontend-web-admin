export class VehicleImg {
    constructor() { };

    set(path, name, code){
        this.attachPath = path;
        this.attachName = name;
        this.attachCode = code;
    }

    attachPath: string;
    attachName: string;
    attachCode: string;
}