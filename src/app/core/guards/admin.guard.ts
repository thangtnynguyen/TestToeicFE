import { CanActivateFn, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/identity/auth.service';
import { Page } from '../enums/page.enum';
import { AuthToken } from '../models/interfaces/common/auth-token.interface'; import { NgxSpinnerService } from "ngx-spinner";
import { Observable, of } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import roleConstant from 'src/app/shared/constants/role.constant';


@Injectable({
	providedIn: 'root'
})

export class adminGuard {
	constructor(private authService: AuthService, private router: Router, private loadingService: NgxSpinnerService) { }

	canActivate: CanActivateFn = (route, state) => {
		this.loadingService.show();
		const authToken: AuthToken | null = this.authService.getAuthTokenLocalStorage();
		if (authToken?.accessToken) {
			if (this.authService.getUserCurrent() && this.authService.hasRole(roleConstant.admin)) {
				return of(true);
			}
			else {
				return this.authService.fetchUserCurrent().pipe(
					map(res => {
						if (res.status) {
							this.authService.setUserCurrent(res.data);
							this.loadingService.hide();
							if (this.authService.hasRole(roleConstant.admin)) {
								return true;
							}
							else {
								this.router.navigate([Page.AdminLogin]);
								return false;
							}
						} else {
							this.authService.setUserCurrent(null);
							this.loadingService.hide();
							this.router.navigate([Page.AdminLogin]);
							return false;
						}
					}),
					catchError(() => {
						this.authService.setUserCurrent(null);
						this.loadingService.hide();
						this.router.navigate([Page.AdminLogin]);
						return of(false);
					})
				);
			}
		} else {
			this.authService.setUserCurrent(null);
			this.loadingService.hide();
			this.router.navigate([Page.AdminLogin]);
			return false;
		}
	};
}

export const adminGuardGuard: CanActivateFn = (route, state) => {
	return inject(adminGuard).canActivate(route, state);
};


// export const adminGuard: CanActivateFn = (route, state) => {
//   return true;
// };

