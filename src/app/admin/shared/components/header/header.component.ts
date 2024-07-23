import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { app } from 'src/app/core/configs/app.config';
import { Page } from 'src/app/core/enums/page.enum';
import { UserCurrent } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/identity/auth.service';

@Component({
	selector: 'app-header-admin',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {


	App = app;
	Page = Page;
	
	userCurrent: UserCurrent;

	//Init
	constructor(public authService: AuthService, private router: Router, private toastrService: ToastrService) {
		this.userCurrent = this.authService.getUserCurrent() as UserCurrent;
	}


	ngOnInit() { }

	public logout() {
		this.authService.logout().subscribe(
			(res) => {
				if (res.status) {
					this.authService.setUserCurrent(null);
					this.authService.setAuthTokenLocalStorage(null);
					this.router.navigate([Page.AdminLogin]);
				}
			},
			(exception) => {
				this.toastrService.error(exception.error.Message);
			}
		);
	}
}
