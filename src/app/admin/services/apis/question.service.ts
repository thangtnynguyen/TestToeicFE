import { Injectable } from '@angular/core';
import { HttpUserLoadingService } from 'src/app/shared/services/https/http-user-loading.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpUserLoadingService) { }

  getQuestions(request: any = null): Observable<any> {
    return this.http.get('question/get', request);
  }

  getQuestionById(request: any = null): Observable<any> {
    return this.http.get('question/get-by-id', request);
  }

  CheckOverallQuestion(request: any = null): Observable<any> {
    return this.http.post('question/check-overall-answers', request);
  }

  CreateQuestion(request: any): Observable<any> {
    return this.http.postFormData(`question/create`, request);
  }

  ImportQuestionsExcel(request: any): Observable<any> {
    return this.http.postFormData(`question/import-questions-excel`, request);
  }



}
// ?QuestionId=${request.QuestionId}&partToeicType=${request.partToeicType}

// {params: request}