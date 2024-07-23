import { Component, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/core/modules/toastr/toastr.service';
import { LoginComponent } from 'src/app/user/accounts/login/login.component';
// import { AuthService } from 'src/app/user/services/api/auth.service';
import { AuthService } from 'src/app/core/services/identity/auth.service';

import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { app } from 'src/app/core/configs/app.config';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {

	App = app;


	@ViewChild(LoginComponent) loginComponent!: LoginComponent;



	userCurrent: any = {
		name: '',
		userName: '',
		email: '',
		password: '',
		repeatPassword: '',
	};

	constructor(public authService: AuthService, private router: Router, private toastrService: ToastrService, private ngxToastr: NgxToastrService) {
		// this.userCurrent = this.authService.getUserCurrent() ;
		this.authService.userCurrent.subscribe(user => {
			this.userCurrent = user;
		});

	}

	ngOnInit() { }

	public logout() {
		this.authService.logout().subscribe(
			(res) => {
				if (res.status) {
					this.authService.setUserCurrent(null);
					this.authService.setAuthTokenLocalStorage(null);
					// this.router.navigate(['/']);
					this.userCurrent = null;
				}
			},
			(exception) => {
				this.toastrService.error(exception.error.Message);
			}
		);
	}











}
