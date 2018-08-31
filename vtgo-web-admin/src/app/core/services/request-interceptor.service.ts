// import {Injectable, Injector} from '@angular/core';
// import {
//   HttpErrorResponse,
//   HttpHandler,
//   HttpHeaderResponse, HttpHeaders,
//   HttpInterceptor,
//   HttpProgressEvent,
//   HttpRequest,
//   HttpResponse,
//   HttpSentEvent,
//   HttpUserEvent
// } from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/finally';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/take';
//
// import {LoggedInUser} from '../models/user.model';
// import {AuthenService} from './authen.service';
// import {BehaviorSubject} from 'rxjs';
//
// @Injectable()
// export class RequestInterceptorService implements HttpInterceptor {
//
//   isRefreshingToken: boolean = false;
//   tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
//
//   constructor(private injector: Injector) {
//   }
//
//   addHeader(req: HttpRequest<any>, loggedInUser: LoggedInUser): HttpRequest<any> {
//     if (loggedInUser) {
//       const contentType = (req.headers.get('Content-Type') == null ? 'application/json; charset=utf-8' : '');
//       let headers = new HttpHeaders();
//       headers= headers.set(
//         'Authorization',
//         'Bearer ' + loggedInUser.accessToken
//       );
//       headers= headers.set('RefreshToken', loggedInUser.refreshToken);
//       headers =headers.set('UserId', loggedInUser.userId);
//       if(req.headers.get('Content-Type') == null){
//         headers = headers.set('Content-Type', 'application/json; charset=utf-8');
//       }
//       return req.clone({
//         headers:headers
//         // setHeaders: {
//         //   'Content-Type': 'application/json; charset=utf-8',
//         //   'Access-Control-Allow-Origin': '*',
//         //   Authorization: 'Bearer ' + loggedInUser.accessToken,
//         //   RefreshToken: loggedInUser.refreshToken,
//         //   UserId: loggedInUser.userId
//         // }
//       })
//     }
//   }
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse
//     | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
//     const authService = this.injector.get(AuthenService);
//     if (authService.getLoggedInUser()) {
//       return next.handle(this.addHeader(req, authService.getLoggedInUser()))
//         .catch(error => {
//           if (error instanceof HttpErrorResponse) {
//             switch ((<HttpErrorResponse>error).status) {
//               case 99:
//                 return this.handleTokenExpireError(req, next);
//               default:
//                 return next.handle(req);
//             }
//           } else {
//             return Observable.throw(error);
//           }
//         });
//     } else {
//       return next.handle(req);
//     }
//   }
//
//   handleTokenExpireError(req: HttpRequest<any>, next: HttpHandler) {
//     const authService = this.injector.get(AuthenService);
//     console.log("isRefreshingToken: " + this.isRefreshingToken);
//     if (!this.isRefreshingToken) {
//       this.isRefreshingToken = true;
//       this.tokenSubject.next(null);
//       return authService.refreshToken()
//         .switchMap(() => {
//           const newToken = authService.getLoggedInUser();
//           if (newToken) {
//             console.log("add new token");
//             this.tokenSubject.next(newToken.accessToken);
//             return next.handle(this.addHeader(this.getNewRequest(req), newToken));
//           } else {
//             // If we don't get a new token, we are in trouble so logout.
//             authService.logout();
//             return this.logoutUser();
//           }
//         })
//         .catch(error => {
//           // If there is an exception calling 'refreshToken', bad news so logout.
//           console.log("resfresh token,error, logout");
//           authService.logout();
//           return this.logoutUser();
//         })
//         .finally(() => {
//           this.isRefreshingToken = false;
//           console.log("set isRefreshingToken: " + this.isRefreshingToken);
//         });
//     } else {
//       return this.tokenSubject
//         .filter(token => token != null)
//         .take(1)
//         .switchMap(token => {
//           console.log("tokenSubject: " + token);
//           return next.handle(this.addHeader(this.getNewRequest(req), authService.getLoggedInUser()));
//         });
//     }
//   }
//
//   getNewRequest(req: HttpRequest<any>): HttpRequest<any> {
//     if (req.method === 'POST') {
//       return new HttpRequest('POST', req.url, req.body);
//     } else {
//       if (req.method === 'GET') {
//         return new HttpRequest('GET', req.url);
//       }
//     }
//
//   }
//
//   logoutUser() {
//     return Observable.throw("");
//   }
// }
