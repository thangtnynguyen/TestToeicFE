import {
	Component, TemplateRef,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { AuthService } from '../../services/api/auth.service';
import { ToastrService } from 'src/app/core/modules/toastr/toastr.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/interfaces/auth/login-request.interface';
import { Page } from 'src/app/core/enums/page.enum';
import { AuthService } from 'src/app/core/services/identity/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	encapsulation: ViewEncapsulation.None,

})
export class LoginComponent {

	mode = 1;  // 1: Đăng nhập, 2: Đăng ký

	//State
	loginForm: FormGroup;
	validationMessages = {
		userName: [
			{ type: 'required', message: 'Tên người dùng không được để trống' },
		],
		password: [
			{ type: 'required', message: 'Mật khẩu không được để trống' },
		],
	};

	//register
	account: any = {
		name: '',
		userName: '',
		email: '',
		password: '',
		repeatPassword: '',
	};

	//get current url:
	currentUrl: string;

	constructor(private bsModalRef: BsModalRef, private modalService: BsModalService, private fb: FormBuilder, private authService: AuthService, private router: Router, private toastrService: ToastrService, private ngxToastr: NgxToastrService) {
		this.loginForm = this.fb.group({
			userName: ['', Validators.required],
			password: ['', [Validators.required, Validators.email]],
			rememberMe: [true, Validators.required],
			type: [1, [Validators.required, Validators.min(1), Validators.max(3)]]
		});
		this.currentUrl = this.router.url;

	}




	modalRef?: BsModalRef;
	@ViewChild('template') template!: TemplateRef<any>;


	switchMode() {
		this.mode = this.mode === 1 ? 2 : 1;
	}
	loginModalOpen: boolean = true;

	openModal() {
		this.currentUrl = this.router.url;
		this.modalRef = this.modalService.show(this.template);
	}

	closeModal() {
		this.modalRef?.hide();
	}




	//call api


	login() {
		const request: LoginRequest = this.loginForm.value;
		this.authService.loginByUserName(request).subscribe(
			(res) => {
				if (res.status) {
					this.authService.setAuthTokenLocalStorage(res.data);
					this.authService.fetchUserCurrent().subscribe(
						(data) => {
							this.authService.setUserCurrent(data.data);
						}
					)

					// this.toastrService.error('Đăng nhập thành công!', 'Thành công');
					this.ngxToastr.success("Thành công", "Success");
					this.closeModal();
					this.router.navigateByUrl(this.currentUrl);
				}
				else {
					// this.toastrService.error('Đăng nhập thất bại. Hãy thử lại!');
					this.ngxToastr.error('Đăng nhập thất bại. Hãy thử lại!');

				}
			},
			(error) => {
				const errorMessage = this.extractErrorMessage(error);
				this.ngxToastr.error(errorMessage, 'Lỗi! Rồi', {
					progressBar: true
				});
				// console.error(error);
			}
		);
	}

	signup() {
		if (this.account.password === this.account.repeatPassword) {
			this.authService.register(this.account).subscribe((result: any) => {
				if (result.status) {
					this.ngxToastr.success(result.message, 'Success', {
						progressBar: true
					});
					this.mode = 1;
				}
			}, error => {
				const errorMessage = this.extractErrorMessage(error);
				this.ngxToastr.error(errorMessage, 'Lỗi! Rồi', {
					progressBar: true
				});
			});
		}
		else {
			this.ngxToastr.info('Mật khẩu không khớp', 'Warning');

		}

	}


	extractErrorMessage(error: any): string {
		if (error && error.error) {
			// Check for UnauthorizedAccessException
			const unauthorizedMatch = error.error.match(/System\.UnauthorizedAccessException:\s(.*?)\r\n/);
			if (unauthorizedMatch && unauthorizedMatch[1]) {
				return unauthorizedMatch[1]; // Extracted UnauthorizedAccessException message
			}

			// Check for BadHttpRequestException
			const badRequestMatch = error.error.match(/Microsoft\.AspNetCore\.Http\.BadHttpRequestException:\s(.*?)\r\n/);
			if (badRequestMatch && badRequestMatch[1]) {
				return badRequestMatch[1]; // Extracted BadHttpRequestException message
			}
		}
		return 'Đã xảy ra lỗi không xác định';
	}





}
