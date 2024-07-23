import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { ExamToeicService } from 'src/app/user/services/api/exam-toeic.service';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { CommentService } from 'src/app/user/services/api/comment.service';
import { LoginComponent } from 'src/app/user/accounts/login/login.component';
import { AuthService } from 'src/app/core/services/identity/auth.service';
import { app } from 'src/app/core/configs/app.config';

@Component({
	selector: 'app-detail-toeic',
	templateUrl: './detail-toeic.component.html',
	styleUrls: ['./detail-toeic.component.css']
})
export class DetailToeicComponent implements OnInit {

	App = app;

	@ViewChild(LoginComponent) loginComponent!: LoginComponent;


	public examToeic: any = {
		id: '',
		title: '',
		description: '',

	};

	public comments: any;
	public commentAdd: any = {
		content: '',

	};
	userCurrent: any;


	constructor(private authService: AuthService, private examToeicService: ExamToeicService, private router: Router, private route: ActivatedRoute, private commentService: CommentService, private ngxToastr: NgxToastrService) {

		this.authService.userCurrent.subscribe(user => {
			this.userCurrent = user;
		});
		
	}


	ngOnInit() {
		this.scrollToTop();
		this.route.paramMap.subscribe(params => {
			const request = {
				...params,
				examToeicId: params.get('id'),
				// partToeicType:1
			}
			this.examToeicService.getExamToeicById(request).subscribe((result: any) => {
				this.examToeic = result.data;
				// console.log(this.examToeic);
			});
		});

		this.getComment();
	}
	scrollToTop() {
		window.scrollTo(0, 0);
	}


	testNow(examToeic: any) {
		if (this.userCurrent) {
			this.router.navigate([`/toeic/test-toeic/${examToeic.id}`]);
		} else {
			this.loginComponent.openModal();
		}
	}



	getComment() {
		this.route.paramMap.subscribe(params => {
			const request = {
				...params,
				examId: params.get('id'),
			}
			this.commentService.getComments(request).subscribe((result: any) => {
				this.comments = result.data.items;
				// console.log(result.data.items);
			});
		});

	}

	submitComment(examId: number) {
		if (this.userCurrent) {
			const request = {
				content: this.commentAdd.content,
				examId: examId,
			};
			this.commentService.CreateComment(request).subscribe((result) => {
				if (result.status) {
					this.ngxToastr.success(result.message, 'Thành công', {
						progressBar: true
					});
					this.commentAdd.content = '';
					this.getComment();
				}
			}, error => {
				console.log(error);
				this.ngxToastr.error(error.error.message, '', {
					progressBar: true
				});
			});
		}
		else {
			this.loginComponent.openModal();

		}


	}


















	//front end
	public formatAMPM(date: any) {
		date = new Date(date);

		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}

	public formatDate(date: any) {
		date = new Date(date);

		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		day = day < 10 ? '0' + day : day;
		month = month < 10 ? '0' + month : month;
		return day + '/' + month + '/' + year;
	}

}
