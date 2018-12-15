import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { IAuthenServiceToken } from '../tokens/authen.service.token';
import { IAuthenService } from '../interfaces/iauthen.service';
import { ErrorHandle } from '../models/handleError';
import { IDataService } from '../interfaces/idata.service';
import { AuthenService } from './authen.service';

@Injectable()
export class DataService {
  private header: HttpHeaders;

  constructor(private http: HttpClient,
    private configuration: ConfigService,
    @Inject(IAuthenServiceToken) private authenService: IAuthenService) {
    this.header = new HttpHeaders();
    this.header = this.header.append('Content-Type', 'application/json');
  }

  Get(url: string): Observable<any> {
    this.header = this.header.delete('Authorization');
    if (this.authenService.GetCurrentUser() && this.authenService.GetCurrentUser().accountToken) {
      this.header = this.header.append('Authorization', 'Bearer ' + this.authenService.GetCurrentUser().accountToken);
    }
    const urlGet = this.configuration.getConfiguration().BASE_API + url;
    return this.http.get(urlGet, { headers: this.header });
  }

  GetBaseUrlImg(folder:string): string {
    return this.configuration.getConfiguration().BASE_URL_IMG+folder;
  }

  Post(url: string, model?: any): Observable<any> {
    this.header = this.header.delete('Authorization');
    if (this.authenService.GetCurrentUser() && this.authenService.GetCurrentUser().accountToken) {
      this.header = this.header.append('Authorization', 'Bearer ' + this.authenService.GetCurrentUser().accountToken);
    }
    const urlPost = this.configuration.getConfiguration().BASE_API + url;
    return this.http.post(urlPost, model, { headers: this.header });
  }

  PostFromOtherURL(url: string, model?: any): Observable<any> {
    this.header = this.header.delete('Authorization');
    if (this.authenService.GetCurrentUser() && this.authenService.GetCurrentUser().accountToken) {
      this.header = this.header.append('Authorization', 'Bearer ' + this.authenService.GetCurrentUser().accountToken);
    }
    return this.http.post(url, model, { headers: this.header });
  }
  

  Put(url: string, model?: any): Observable<any> {
    this.header = this.header.delete('Authorization');
    if (this.authenService.GetCurrentUser() && this.authenService.GetCurrentUser().accountToken) {
      this.header = this.header.append('Authorization', 'Bearer ' + this.authenService.GetCurrentUser().accountToken);
    }
    const urlPut = this.configuration.getConfiguration().BASE_API + url;
    return this.http.put(urlPut, model, { headers: this.header });
  }

  Delete(url: string): Observable<any> {
    this.header = this.header.delete('Authorization');
    if (this.authenService.GetCurrentUser() && this.authenService.GetCurrentUser().accountToken) {
      this.header = this.header.append('Authorization', 'Bearer ' + this.authenService.GetCurrentUser().accountToken);
    }
    const urlDelete = this.configuration.getConfiguration().BASE_API + url;
    return this.http.delete(urlDelete, { headers: this.header });
  }

  getFile(url: string) {
    return this.http
      .get(this.configuration.getConfiguration().BASE_API + url, {
        headers: this.header,
        responseType: 'blob'
      });
  }

  postDownload(url: string, data?: any) {
    // const entity = Object.assign({staffLoginId: this.authenService.GetCurrentUser().staffId}, data);
    return this.http
      .post(this.configuration.getConfiguration().BASE_API + url, {}, {
        headers: this.header,
        responseType: 'blob'
      });
  }

  postFile(uri: string, data?: any): Observable<any> {
    // let newHeader = new HttpHeaders();
    // newHeader = newHeader.set('Content-Type', 'multipart/form-data');
    // return this.http.post(this.configuration.getConfiguration().BASE_API + uri, data, {
    //   headers: newHeader
    // });
    return this.http.post(this.configuration.getConfiguration().BASE_API + uri, data);
  }
}
