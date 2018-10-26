import { Observable } from "rxjs";

export interface ITestLogoutService{
    Logout(accountId: number): Observable<any>;
}