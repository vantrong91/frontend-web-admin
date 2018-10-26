import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginViewModel, LoggedInUser } from '../models/user.model';
import { SystemConfig } from '../enums/system.enum';
import { ConfigService } from '../services/config.service';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthenService {
    constructor(private http: HttpClient, private configService: ConfigService) {
    }

    
    Login(user: LoginViewModel): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.configService.getConfiguration().BASE_API + 'account-man/check-login';
        return this.http.post(url, user, { headers: headers }).pipe(map(response => {
            if (response) {
                localStorage.setItem(SystemConfig.CURRENT_USER, JSON.stringify(response));
            } else {
                localStorage.removeItem(SystemConfig.CURRENT_USER);
            }
        }));
    }

    Logout(accountId: number) {
        localStorage.removeItem(SystemConfig.CURRENT_USER);
        const url2 = this.configService.getConfiguration().BASE_API + 'account-man/logout';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log("onLogout" + accountId + url2) ;
        return this.http.post(url2, {"accountId": accountId} , { headers: headers });
    }

    IsUserAuthenticated(): boolean {
        const user = localStorage.getItem(SystemConfig.CURRENT_USER);
        if (user != null) {
            return true;
        }
        return false;
    }
    GetCurrentUser(): LoggedInUser {
        let user: LoggedInUser;
        if (this.IsUserAuthenticated()) {
            const userData = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
            user = new LoggedInUser(
                userData.data[0].accoundId,
                userData.data[0].accountToken,
                userData.data[0].fullName,
                userData.data[0].accountType,
                userData.data[0].email,
                userData.data[0].phoneNumber);
        } else {
            user = null;
        }
        return user;
    }
}
