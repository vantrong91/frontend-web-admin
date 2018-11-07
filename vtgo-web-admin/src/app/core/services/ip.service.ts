import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()


export class IpService{
    constructor(private http: HttpClient){}

    getIp(){
        const url= "https://ipinfo.io";
        return this.http.get(url);
    }
}
