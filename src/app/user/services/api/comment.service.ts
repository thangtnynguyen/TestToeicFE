import { Injectable } from '@angular/core';
import { HttpUserLoadingService } from 'src/app/shared/services/https/http-user-loading.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpUserLoadingService) { }

  getComments(request: any = null): Observable<any> {
    return this.http.get('comment/get', request);
  }

  CreateComment(request: any): Observable<any> {
    return this.http.post(`comment/create`, request);
  }

 

}
