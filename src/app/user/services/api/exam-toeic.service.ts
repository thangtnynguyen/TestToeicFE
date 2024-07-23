import { Injectable } from '@angular/core';
import { HttpUserLoadingService } from 'src/app/shared/services/https/http-user-loading.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamToeicService {

  constructor(private http: HttpUserLoadingService) { }

  getExamToeics(request: any = null): Observable<any> {
    return this.http.get('exam-toeic/get', request);
  }

  getExamToeicById(request: any = null): Observable<any> {
    return this.http.get('exam-toeic/get-by-id', request);
  }

  CheckOverallExamToeic(request: any = null): Observable<any> {
    return this.http.post('exam-toeic/check-overall-answers', request);
  }

  CreateExamToeicResult(request: any): Observable<any> {
    return this.http.post(`exam-toeic/add-exam-toeic-result`, request);
  }

  CreateExamToeicResultDetail(request: any): Observable<any> {
    return this.http.post(`exam-toeic/add-exam-toeic-result-detail`, request);
  }

  GetExamToeicResult(request: any): Observable<any> {
    return this.http.get(`exam-toeic/get-exam-toeic-result-by-user-id`,request );
  }

  GetExamToeicResultById(request: any): Observable<any> {
    return this.http.get(`exam-toeic/get-exam-toeic-result-by-id`,request );
  }


}
// ?examToeicId=${request.examToeicId}&partToeicType=${request.partToeicType}

// {params: request}