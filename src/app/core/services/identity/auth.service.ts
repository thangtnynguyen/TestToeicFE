import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCurrent } from '../../models/interfaces/user/user-current.interface';
import { LocalStorageService } from '../utilities/local-storage.service';
import { AuthToken } from '../../models/interfaces/common/auth-token.interface';
import { LocalStorage } from '../../enums/local-storage.enum';
import { ApiResult } from '../../models/interfaces/common/api-result.interface';
import { LoginRequest } from '../../models/interfaces/auth/login-request.interface';
import { HttpService } from '../utilities/http.service';
import { RefreshTokenRequest } from '../../models/interfaces/auth/refresh-token-request.interface';
import { httpCustomService } from 'src/app/shared/services/https/http-custom.service';
import { HttpUserLoadingService } from 'src/app/shared/services/https/http-user-loading.service';
// import { UserCurrent } from '../../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	// private userCurrent: UserCurrent | null | undefined;
	private isInitAuthSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	isInitAuth$: Observable<boolean> = this.isInitAuthSubject.asObservable();


	private currentUserSubject = new BehaviorSubject<any>(null);
	public userCurrent = this.currentUserSubject.asObservable();

	getUserCurrent() {
		return this.currentUserSubject.value;
	}

	setUserCurrent(user: any) {
		this.currentUserSubject.next(user);
	}



	constructor(private http: httpCustomService, private localStorageService: LocalStorageService, private httpService: HttpService,private httpUser: HttpUserLoadingService) { }

	//Auth token
	getAuthTokenLocalStorage(): AuthToken | null {
		const authToken: AuthToken | null = this.localStorageService.getItem(LocalStorage.AuthToken);

		return authToken;
	}

	setAuthTokenLocalStorage(authToken: AuthToken | null) {
		this.localStorageService.setItem(LocalStorage.AuthToken, authToken);
	}


	getUserCurrentApi(): Observable<ApiResult<UserCurrent>> {
		return this.http.get<ApiResult<UserCurrent>>('/api/user/user-info');
	}

	fetchUserCurrent(): Observable<ApiResult<UserCurrent>> {
		let headers = this.httpService.addSkipLoadingHeader();

		return this.http.get<ApiResult<UserCurrent>>('/api/user/user-info', { headers });
	}

	register(request: any): Observable<any> {
		return this.http.post('/api/auth/register', request);
	}

	loginByUserName(request: LoginRequest): Observable<ApiResult<AuthToken>> {
		return this.http.post<ApiResult<AuthToken>>('/api/auth/login', request);
	}

	editAccount(request: any): Observable<any> {
		return this.httpUser.postFormData('user/edit-user-info', request);
	}

	refreshToken(request: RefreshTokenRequest): Observable<ApiResult<AuthToken>> {
		return this.http.post<ApiResult<AuthToken>>('/api/auth/refresh-token', request);
	}

	hasRole(permisson: string): boolean {

		if (!this.currentUserSubject.value) {
			return false;
		}

		if (this.currentUserSubject.value.role==permisson) {
			return true;
		} else {
			return false;
		}
	}

	logout(): Observable<ApiResult<boolean>> {
		return this.http.post<ApiResult<boolean>>('/api/auth/logout', null);
	}





















	//User
	// setUserCurrent(userCurrent: any) {
	//   this.userCurrent = userCurrent;
	// }

	// getUserCurrent() {
	//   return this.userCurrent;
	// }



	// loginByUsername(request: LoginRequest): Observable<ApiResult<UserCurrent>>{

	// }

	//   logout(): Observable<void> {
	//     return this.http.post<void>(`${this.apiUrl}/logout`, null);
	//   }

	//   refreshToken(): Observable<void> {
	//     return this.http.post<void>(`${this.apiUrl}/logout`, null);
	//   }

	// //   currentUser(): Observable<UserCurrent | null> {
	// //     const user = localStorage.getItem('currentUser');
	// //     if (user) {
	// //       return of(JSON.parse(user) as UserCurrent);
	// //     } else {
	// //       return of(null);
	// //     }
	// //   }

	//   isAuthenticated(): boolean {
	//     return !!localStorage.getItem('currentUser');
	//   }


}
