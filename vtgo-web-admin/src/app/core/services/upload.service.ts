import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class UploadService {
  public responseData: any;

  constructor(
    private dataService: DataService
  ) { }

  postWithFile(url: string, postData: any, files: File[]) {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i]['name']);
    }
    if (postData !== '' && postData !== undefined && postData !== null) {
      for (const property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }
    const returnReponse = new Promise((resolve, reject) => {
      this.dataService.postFile(url, formData).subscribe(
        res => {
          this.responseData = res;
          resolve(this.responseData);
        },
        //error => this.dataService.handleError(error)
      );
    });
    return returnReponse;
  }
}
