import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/identity/auth.service';
import { Page } from '../enums/page.enum';
import { AuthToken } from '../models/interfaces/common/auth-token.interface';

@Injectable({
	providedIn: 'root',
})


export class userInfoGuard {
	constructor(private authService: AuthService, private router: Router, private loadingService: NgxSpinnerService) { }

	canActivate: CanActivateFn = (route, state) => {
		this.loadingService.show();
		const authToken: AuthToken | null = this.authService.getAuthTokenLocalStorage();
		if (authToken?.accessToken) {
			if (this.authService.getUserCurrent()) {
				return of(true);
			}
			else {
				return this.authService.fetchUserCurrent().pipe(
					map(res => {
						if (res.status) {
							this.authService.setUserCurrent(res.data);
							this.loadingService.hide();
							return true;
						} else {
							this.authService.setUserCurrent(null);
							this.loadingService.hide();
							// this.router.navigate([Page.Login]);
							return false;
						}
					}),
					catchError(() => {
						this.authService.setUserCurrent(null);
						this.loadingService.hide();
						this.router.navigate([Page.Login]);
						return of(false);
					})
				);
			}
		} else {
			return true;
		}
	};
}

export const userInfoGuardGuard: CanActivateFn = (route, state) => {
	return inject(userInfoGuard).canActivate(route, state);
};



// export const userInfoGuard: CanActivateFn = (route, state) => {
//   constructor(private authService: AuthService, private router: Router, private loadingService: NgxSpinnerService) {}

//   if()
//   return true;
// };