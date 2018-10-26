import { Injectable, Inject } from "@angular/core";
import { CanActivate, CanActivateChild, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from "@angular/router";
import { IAuthenServiceToken } from "../tokens/authen.service.token";
import { IAuthenService } from "../interfaces/iauthen.service";

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild, CanLoad{
    constructor(private router: Router,
        @Inject(IAuthenServiceToken) private authService: IAuthenService ){}
    //Kiểm tra, bảo vệ người dùng có thể truy cập vào route hay ko;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        console.log('In canActive' + state.url);
        return this.checkLoggedIn(state.url);
    }

    //Kiem tra, bao ve nguoi dung co the truy cap vao route child hay ko
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        console.log('In canActiveChild' + state.url);
        return this.checkLoggedIn(state.url);
    }
    canLoad(route: Route): boolean{
        console.log('In Load', route.path);
        return this.checkLoggedIn(route.path);
    }

    checkLoggedIn(url: string): boolean{
        if(this.authService.IsUserAuthenticated()){
            return true;
        }
    }

}