import { LoginViewModel, LoggedInUser } from '../models/user.model';
import { Observable } from 'rxjs';

export interface IAuthenService {
    Login(user: LoginViewModel): Observable<any>;
    Logout(accountId: number): Observable<any>;
    GetCurrentUser(): LoggedInUser;
    IsUserAuthenticated(): boolean;
}
