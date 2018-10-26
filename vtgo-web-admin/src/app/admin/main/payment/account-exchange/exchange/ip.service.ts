import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
// interface myIp{
//     ip: string;
// }

@Injectable()


export class IpService{
    constructor(private http: HttpClient){}

    getIp(){
        // const url= "http://api.ipify.org/?format=json";
        const url= "https://ipinfo.io";
        return this.http.get(url);
    }
}
