import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { UserCurrent } from '../../models/interfaces/user/user-current.interface';
import { LocalStorageService } from '../utilities/local-storage.service';
import { AuthToken } from '../../models/interfaces/common/auth-token.interface';
import { LocalStorage } from '../../enums/local-storage.enum';
import { ApiResult } from '../../models/interfaces/common/api-result.interface';
import { LoginRequest } from '../../models/interfaces/auth/login-request.interface';
import { HttpService } from '../utilities/http.service';
import { RefreshTokenRequest } from '../../models/interfaces/auth/refresh-token-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCurrent: UserCurrent | null | undefined;
  private isInitAuthSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isInitAuth$: Observable<boolean> = this.isInitAuthSubject.asObservable();

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private httpService: HttpService) {}

  //User
  setUserCurrent(userCurrent: UserCurrent | null){
    this.userCurrent = userCurrent;
  }


  getUserCurrent() {
    return this.userCurrent;
  }

 


}
