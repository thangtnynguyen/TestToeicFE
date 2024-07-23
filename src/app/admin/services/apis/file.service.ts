import { Injectable } from '@angular/core';
import { HttpUserLoadingService } from 'src/app/shared/services/https/http-user-loading.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpUserLoadingService) { }

  UploadFileAsync(request: any): Observable<any> {
    return this.http.postFormData(`file/upload-file`, request);
  }

  UploadMultipleFile(request: any): Observable<any> {
    return this.http.postFormData(`file/upload-multiple-file`, request);
  }

 

}
