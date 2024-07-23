// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {

// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { Page } from 'src/app/core/enums/page.enum';
import { AuthService } from 'src/app/core/services/identity/auth.service';
import roleConstant from 'src/app/shared/constants/role.constant';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    //Init
    constructor(
        private authService: AuthService,
        // private userService: UserService,
        private ngxToastr: NgxToastrService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loginForm.type = 2;

    }

    roleContant: any = roleConstant;

    public validateFormSuccess: any = {
        touchSection: false,
        touchDiff: false
    }
    //Login
    public loginForm: any = {
        // email: '',
        password: '',
        rememberMe: false,

        //new
        username: '',
        type: 0,
    }

    public handleOnSubmitLogin() {
        this.authService.loginByUserName(this.loginForm).subscribe(response => {
            if (response.status) {
                this.authService.setAuthTokenLocalStorage(response.data);
                this.authService.fetchUserCurrent().subscribe(
                    (data) => {
                        this.authService.setUserCurrent(data.data);
                    }
                )
                this.ngxToastr.success("Thành công", "Success");
                this.router.navigate([Page.Dashboard]);

            }
            else {
                this.ngxToastr.error('Đăng nhập thất bại. Hãy thử lại!', 'Lỗi!');

            }
        }, error => {
            const errorMessage = this.extractErrorMessage(error);
            this.ngxToastr.error(errorMessage, 'Lỗi! Rồi', {
                progressBar: true
            });
            // console.error(error);
        });
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
