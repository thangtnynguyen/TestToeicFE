import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamToeicService } from 'src/app/user/services/api/exam-toeic.service';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { ElementRef } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/identity/auth.service';

@Component({
	selector: 'app-toeic-result-detail',
	templateUrl: './toeic-result-detail.component.html',
	styleUrls: ['./toeic-result-detail.component.css']
})
export class ToeicResultDetailComponent implements OnInit {

	public baseUrl: string = enviroment.host.baseUrl;

	public examToeic: any = {
		partToeics: []

	};
	public partToeics: any = {
		name: '',
		type: 1,
		groupToeics: []

	}
	public groupToeics: any = {
		title: '',
		image: '',
		paragraph: '',
		audio: '',
		questions: []
	}
	questions: any = [];

	examResult: any = [];
	examResultDetails: any = [];


	result: any = [];
	selectedAnswers: { [questionId: number]: number } = {};
	showResultModal: boolean = false;
	allQuestions: any = [];
	allQuestionViews: any = [];
	allQuestionParts: any = [];
	leftTime: number = 0;
	isShowAnswer: boolean = true;

	userCurrent: any;

	constructor(private authService: AuthService, private examToeicService: ExamToeicService, private route: ActivatedRoute, private el: ElementRef, private router: Router, private ngxToastr: NgxToastrService) {
		this.authService.userCurrent.subscribe(user => {
			this.userCurrent = user;
		})
	}

	ngOnInit() {
		this.scrollToTop();
		this.route.paramMap.subscribe(params => {
			const request = {
				...params,
				id: params.get('id'),
			}
			this.getExamToeicResult(request);
		});


	}
	scrollToTop() {
		window.scrollTo(0, 0);
	}



	getExamToeic(request: any) {
		this.examToeicService.getExamToeicById(request).subscribe((result: any) => {
			this.examToeic = result.data;
			this.questions = result.data.partToeics[0].groupToeics[0].questions;

			this.allQuestionViews = [];
			this.examToeic.partToeics.forEach((part: any) => {
				let partQuestions: any[] = [];
				part.groupToeics.forEach((group: any) => {
					this.allQuestionViews = this.allQuestionViews.concat(group.questions);
					// partQuestions = partQuestions.concat(group.questions);
					group.questions.forEach((question: any) => {

						//thêm trường isTrue và questionAnserId cho từng question của từng group 
						const detail = this.examResultDetails.find((detail: any) => detail.questionId === question.id);
						let isTrue = false;
						if (detail) {
							const answer = question.questionAnswers.find((answer: any) => answer.id === detail.questionAnswerId);
							if (answer) {
								question.isTrue = answer.isCorrect;
							}
							else {
								question.isTrue = null;
							}
							question.questionAnswerId = detail.questionAnswerId;
						}
						else {
							question.isTrue = null;
							question.questionAnswerId = null;
						}
						// add câu hỏi vào mảng nếu chưa tồn tại
						if (!this.allQuestions.some((q: any) => q.id === question.id)) {
							this.allQuestions.push(question);
						}
						//add vào mảng partQuestions
						if (!partQuestions.some((q: any) => q.id === question.id)) {
							partQuestions.push(question);
						}

					});
				});
				//lấy câu hỏi theo part
				this.allQuestionParts.push({
					partInfo: part,
					questions: partQuestions
				});

				// console.log(this.allQuestionParts);
				// console.log(this.allQuestions);
				// console.log(this.examResultDetails);

			});
			// console.log(this.examToeic);

		});
	}

	getExamToeicListening() {
		this.route.paramMap.subscribe(params => {
			const request = {
				...params,
				examToeicId: params.get('id'),
				partToeicType: 2
			}
			this.getExamToeic(request);

		});
	}
	getExamToeicReading() {
		this.route.paramMap.subscribe(params => {
			const request = {
				...params,
				examToeicId: params.get('id'),
				partToeicType: 1
			}
			this.getExamToeic(request);

		});
	}

	getExamToeicResult(request: any) {
		this.examToeicService.GetExamToeicResultById(request).subscribe((result: any) => {
			this.examResult = result.data;
			this.examResultDetails = result.data.examToeicResultDetails;
			//get exam
			const request2 = {
				examToeicId: result.data.examToeicId,
				// partToeicType: 2
			}
			this.getExamToeic(request2);
			// console.log(this.examResult);
		});
	}

	//bỏ
	mergeArray() {
		const mergedResults: any = this.allQuestions.map((question: any) => {
			const detail = this.examResultDetails.find((detail: any) => detail.questionId === question.id);
			let isTrue = false;
			if (detail) {
				const answer = question.questionAnswers.find((answer: any) => answer.id === detail.questionAnswerId);
				isTrue = answer ? answer.isCorrect : false;
			}

			return {
				...question,
				questionAnswerId: detail ? detail.questionAnswerId : null,
				isTrue: isTrue
			};
		});

		console.log(mergedResults);
	}


	//nút back

	//front end
	closeModal() {
		this.showResultModal = true;
	}
	openModal() {
		this.showResultModal = false;
	}




	handleScrollToPart(partId: string) {
		const element = document.getElementById(partId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	@ViewChild('questionRightContainer') questionRightContainer!: ElementRef;

	scrollToPartVipProMax(partId: string) {
		const container = this.questionRightContainer.nativeElement;
		const element = document.getElementById(partId);

		if (container && element) {
			const containerRect = container.getBoundingClientRect();
			const elementRect = element.getBoundingClientRect();

			const relativeTop = elementRect.top - containerRect.top + container.scrollTop;
			container.scrollTop = relativeTop;
		}
	}

	handleParseTimeSpan(timeSpan: string): number {
		const parts = timeSpan.split(':');
		const hours = parseInt(parts[0], 10);
		const minutes = parseInt(parts[1], 10);
		const seconds = parseInt(parts[2], 10);
		return hours * 3600 + minutes * 60 + seconds;
	}

	handleConvert(index: any) {
		return String.fromCharCode(65 + index);
	}

	handleCheckAnswerSelected(answer: any) {
		if (this.selectedAnswers[answer] !== null && this.selectedAnswers[answer] !== undefined) {
			return true;
		}
		else {
			return false;
		}
	}


	handleConvertNameFile(fileName: string) {
		if (fileName != null && fileName !== '') {
			return this.baseUrl + '/' + fileName;
		}
		else {
			return null;
		}
	}
	handlePartDescription(partType: number) {
		if (partType != null && partType === 1) {
			return 'Part of the reading test'
		}
		else {
			return 'Part of the listening test'
		}
	}


	convertTimeToRelative(time: Date): string {
		const currentTime = new Date();
		const timeDiff = currentTime.getTime() - new Date(time).getTime();
		const seconds = Math.floor(timeDiff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);
		const months = Math.floor(days / 30);
		const years = Math.floor(days / 365);

		if (years > 0) {
			return years === 1 ? '1 năm trước' : `${years} năm trước`;
		} else if (months > 0) {
			return months === 1 ? '1 tháng trước' : `${months} tháng trước`;
		} else if (weeks > 0) {
			return weeks === 1 ? '1 tuần trước' : `${weeks} tuần trước`;
		} else if (days > 1) {
			return days === 2 ? 'hôm qua' : `${days} ngày trước`;
		} else if (days === 1) {
			return 'hôm kia';
		} else if (hours > 0) {
			return `${hours} giờ trước`;
		} else if (minutes > 0) {
			return `${minutes} phút trước`;
		} else {
			return 'vừa mới';
		}
	}



}
