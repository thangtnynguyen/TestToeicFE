import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ExamToeicService } from 'src/app/user/services/api/exam-toeic.service';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { ElementRef } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/identity/auth.service';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { filter } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/core/guards/can-deactivate.guard';

@Component({
	selector: 'app-test-toeic',
	templateUrl: './test-toeic.component.html',
	styleUrls: ['./test-toeic.component.css'],
})
export class TestToeicComponent implements OnInit, ComponentCanDeactivate {
	private baseUrl: string = enviroment.host.baseUrl;

	public examToeic: any = {
		partToeics: [],
	};
	public partToeics: any = {
		name: '',
		type: 1,
		groupToeics: [],
	};
	public groupToeics: any = {
		title: '',
		image: '',
		paragraph: '',
		audio: '',
		questions: [],
	};
	userCurrent: any;
	questions: any = [];
	result: any = [];
	selectedAnswers: { [questionId: number]: number } = {};
	showResultModal: boolean = false;
	allQuestions: any = [];
	allQuestionViews: any = [];
	allQuestionParts: any = [];
	leftTime: any;
	isShowAnswer: boolean = false;


	isSubmitting = false;

	constructor(
		private authService: AuthService,
		private examToeicService: ExamToeicService,
		private route: ActivatedRoute,
		private el: ElementRef,
		private router: Router,
		private ngxToastr: NgxToastrService
	) {
		this.authService.userCurrent.subscribe((user) => {
			this.userCurrent = user;
		});

	}

	ngOnInit() {
		this.route.paramMap.subscribe((params) => {
			const request = {
				...params,
				examToeicId: params.get('id'),
				partToeicType: 2,
			};
			this.getExamToeic(request);
		});

		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe((event: any) => {
				// Khi có sự kiện NavigationEnd, kiểm tra nếu đó là trang hiện tại
				if (event.url === this.router.url) {
					this.route.paramMap.subscribe((params) => {
						const request = {
							...params,
							examToeicId: params.get('id'),
							partToeicType: 2,
						};
						this.getExamToeic(request);
					});
				}
			});
	}

	canDeactivate(): Promise<boolean> {

		if (this.isSubmitting) {
			return Promise.resolve(true);
		}
		else {
			// const confirmation = confirm('Bạn có chắc chắn muốn rời khỏi trang này không?');
			// if (confirmation) {
			// 	this.a();
			// 	return true;
			// } else {
			// 	return false;
			// }

			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					cancelButton: 'btn btn-danger ms-5',
					confirmButton: 'btn btn-success',
				},
				buttonsStyling: false,
			});
			return swalWithBootstrapButtons.fire({
				title: 'Bạn có chắc chắn muốn rời khỏi trang này không?',
				text: 'Sau khi rời dữ liệu bài làm sẽ được lưu lại !',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Xác nhận',
				cancelButtonText: 'Bỏ qua',
				reverseButtons: false
			}).then((result) => {
				if (result.isConfirmed) {
					this.saveInfoExam();
					return true;
				} else {
					return false;
				}
			});
		}

	}

	saveInfoExam() {
		if (Object.keys(this.selectedAnswers).length != 0) {
			const newExamData: any = {
				UserId: this.userCurrent.id,
				ExamToeicId: this.examToeic.id,
				Duration: this.getCountdown(),
				selectedAnswers: this.selectedAnswers,
			};
			this.saveExamDataToLocalStorage(newExamData);
		}
	}



	getExamToeic(request: any) {
		this.examToeicService.getExamToeicById(request).subscribe((result: any) => {
			this.examToeic = result.data;
			this.questions = result.data.partToeics[0].groupToeics[0].questions;
			this.leftTime = this.handleParseTimeSpan(this.examToeic.duration);
			this.allQuestionViews = [];
			this.allQuestionParts = [];
			this.examToeic.partToeics.forEach((part: any) => {
				let partQuestions: any[] = [];
				//lấy tất cả câu hỏi
				part.groupToeics.forEach((group: any) => {
					// this.allQuestions = this.allQuestions.concat(group.questions);// có thể bị trùng
					this.allQuestionViews = this.allQuestionViews.concat(group.questions);
					partQuestions = partQuestions.concat(group.questions);
					group.questions.forEach((question: any) => {
						// add câu hỏi vào mảng nếu chưa tồn tại
						if (!this.allQuestions.some((q: any) => q.id === question.id)) {
							this.allQuestions.push(question);
						}
					});
				});
				//lấy câu hỏi theo part
				this.allQuestionParts.push({
					partInfo: part,
					questions: partQuestions,
				});
			});

			// lấy dữ liệu đã thi từ trước
			const request1 = {
				examToeicId: request.examToeicId,
				userId: this.userCurrent.id,
			};
			this.getExamDataToLocalStorage(request1);
		});
	}

	getExamToeicListening() {
		this.route.paramMap.subscribe((params) => {
			const request = {
				...params,
				examToeicId: params.get('id'),
				partToeicType: 2,
			};
			this.getExamToeic(request);

			const newExamData: any = {
				UserId: this.userCurrent.id,
				ExamToeicId: this.examToeic.id,
				Duration: this.getCountdown(),
				selectedAnswers: this.selectedAnswers,
			};
			this.saveExamDataToLocalStorage(newExamData);
		});
	}
	getExamToeicReading() {
		this.route.paramMap.subscribe((params) => {
			const request = {
				...params,
				examToeicId: params.get('id'),
				partToeicType: 1,
			};
			this.getExamToeic(request);

			const newExamData: any = {
				UserId: this.userCurrent.id,
				ExamToeicId: this.examToeic.id,
				Duration: this.getCountdown(),
				selectedAnswers: this.selectedAnswers,
			};
			this.saveExamDataToLocalStorage(newExamData);
		});
	}

	selectQuestion(index: number): void { }

	closeModal() {
		this.showResultModal = false;
	}

	sendAnswers(): void {
		// console.log(this.selectedAnswers)

		this.isSubmitting = true;

		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				cancelButton: 'btn btn-danger ms-5',
				confirmButton: 'btn btn-success',
			},
			buttonsStyling: false,
		});
		swalWithBootstrapButtons
			.fire({
				title: `Bạn có chắc muốn nộp bài thi này không`,
				text: 'Sau khi nộp không thể hoàn tác!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Xác nhận',
				cancelButtonText: 'Bỏ qua',
				reverseButtons: false,
			})
			.then((result) => {
				if (result.isConfirmed) {
					this.route.paramMap.subscribe((params) => {
						const examId = params.get('id');

						const request = {
							examId: examId,
							checkQuestions: this.allQuestions.map(
								(question: any, i: number) => {
									return {
										questionId: question.id,
										questionAnswerId: this.selectedAnswers[question.id] || 0,
									};
								}
							),
						};

						//   api
						this.examToeicService
							.CheckOverallExamToeic(request)
							.subscribe((result: any) => {
								if (result.status) {
									this.result = result.data;

									//api lưu kết quả
									this.route.paramMap.subscribe((params) => {
										const requestResult = {
											examToeicId: params.get('id')?.toString(),
											Score: result.data.totalScore,
											StartTime: new Date(),
											durationTime: '00:39:00',
											numberCorrectOverallAnswers: result.data.totalCountTrue,
											numberCorrectListeningAnswers:
												result.data.totalCountListeningTrue,
											numberCorrectReadingAnswers:
												result.data.totalCountReadingTrue,
											numberChangeTab: 1,
										};
										this.examToeicService
											.CreateExamToeicResult(requestResult)
											.subscribe((result2: any) => {
												if (result2.status) {
													// console.log(result2.data.id);
													const requestResultDetail = {
														examId: result2.data.id,
														checkQuestions: this.allQuestions.map(
															(question: any, i: number) => {
																return {
																	questionId: question.id,
																	questionAnswerId:
																		this.selectedAnswers[question.id - 1] || 0,
																};
															}
														),
													};
													// console.log(requestResultDetail);
													this.examToeicService
														.CreateExamToeicResultDetail(requestResultDetail)
														.subscribe((result3) => {
															if (result3.status) {
																this.ngxToastr.success('Thông báo', 'Đã nộp bài');
																this.deleteExamDataFromLocalStorage({
																	examToeicId: result2.data.examToeicId,
																	userId: this.userCurrent.id,
																});
																this.router.navigate([
																	'/toeic/toeic-result-detail',
																	result2.data.id,
																]);
															}
														});
												}
											});
									});

									// console.log(this.result);
								}
							});

						// console.log(this.selectedAnswers);
						// console.log(request);
					});
				}
			});

		// this.showResultModal = true;
		// this.isShowAnswer=true;
	}

	sendAnswersLeftTime(): void {
		// console.log(this.selectedAnswers)
		this.isSubmitting = true;

		this.route.paramMap.subscribe((params) => {
			const examId = params.get('id');

			const request = {
				examId: examId,
				checkQuestions: this.allQuestions.map(
					(question: any, i: number) => {
						return {
							questionId: question.id,
							questionAnswerId: this.selectedAnswers[question.id] || 0,
						};
					}
				),
			};

			//   api
			this.examToeicService
				.CheckOverallExamToeic(request)
				.subscribe((result: any) => {
					if (result.status) {
						this.result = result.data;

						//api lưu kết quả
						this.route.paramMap.subscribe((params) => {
							const requestResult = {
								examToeicId: params.get('id')?.toString(),
								Score: result.data.totalScore,
								StartTime: new Date(),
								durationTime: '00:39:00',
								numberCorrectOverallAnswers: result.data.totalCountTrue,
								numberCorrectListeningAnswers:
									result.data.totalCountListeningTrue,
								numberCorrectReadingAnswers:
									result.data.totalCountReadingTrue,
								numberChangeTab: 1,
							};
							this.examToeicService
								.CreateExamToeicResult(requestResult)
								.subscribe((result2: any) => {
									if (result2.status) {
										const requestResultDetail = {
											examId: result2.data.id,
											checkQuestions: this.allQuestions.map(
												(question: any, i: number) => {
													return {
														questionId: question.id,
														questionAnswerId:
															this.selectedAnswers[question.id] || 0,
													};
												}
											),
										};
										this.examToeicService
											.CreateExamToeicResultDetail(requestResultDetail)
											.subscribe((result3) => {
												if (result3.status) {
													this.ngxToastr.success('Thông báo', 'Đã nộp bài');
													this.deleteExamDataFromLocalStorage({
														examToeicId: result2.data.examToeicId,
														userId: this.userCurrent.id,
													});
													this.router.navigate([
														'/toeic/toeic-result-detail',
														result2.data.id,
													]);
												}
											});
									}
								});
						});

					}
				});

		});
	}


	countNonNullItems(): number {
		// return arr.filter(item => item !== null).length;
		return Object.keys(this.selectedAnswers).length;
	}

	handleScrollToPart(partId: string) {
		const element = document.getElementById(partId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	@ViewChild('questionRightContainer') questionRightContainer!: ElementRef;

	scrollToPartVipProMax(partId: string) {
		console.log(partId);
		const container = this.questionRightContainer.nativeElement;
		const element = document.getElementById(partId);

		if (container && element) {
			const containerRect = container.getBoundingClientRect();
			const elementRect = element.getBoundingClientRect();

			const relativeTop =
				elementRect.top - containerRect.top + container.scrollTop;
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
		if (
			this.selectedAnswers[answer] !== null &&
			this.selectedAnswers[answer] !== undefined
		) {
			return true;
		} else {
			return false;
		}
	}

	handleConvertNameFile(fileName: string) {
		if (fileName != null && fileName !== '') {
			return this.baseUrl + '/' + fileName;
		} else {
			return null;
		}
	}
	handlePartDescription(partType: number) {
		if (partType != null && partType === 1) {
			return 'Part of the reading test';
		} else {
			return 'Part of the listening test';
		}
	}

	@ViewChild('countdown', { static: false }) countdown!: CountdownComponent;

	getCountdown() {
		if (this.countdown) {
			return this.countdown.left;
		} else return 0;
	}

	get() {
		console.log(this.getCountdown());
	}

	handleEvent(event: any) {

		console.log(event); // Kiểm tra sự kiện trong console

		if (event.action === 'notify') {
			// console.log('Thời gian còn lại mỗi 15 giây:', event.left, 'giây');
			this.ngxToastr.warning("Thông báo", "Thời gian còn 15 giây là hết giờ");

		}

		if (event.action === 'done') {
			if (Object.keys(this.selectedAnswers).length === 0) {
				this.router.navigate([`toeic/detail-toeic/${this.examToeic.id}`]);
				// this.ngxToastr.warning("Thông báo", "Hết giờ");
			}
			else {
				this.sendAnswersLeftTime();

			}

		}
	}


	getExamDataToLocalStorage(request: any) {
		const examDatasJSON = localStorage.getItem('examToeicDatas');
		let examDatas: any[] = [];

		if (examDatasJSON) {
			examDatas = JSON.parse(examDatasJSON);
		}

		const examToeicData = examDatas.find(
			(item) =>
				item.ExamToeicId == request.examToeicId && item.UserId == request.userId
		);
		if (examToeicData) {
			this.selectedAnswers = examToeicData.selectedAnswers;
			this.leftTime = parseFloat(examToeicData.Duration) / 1000;
		}
	}

	deleteExamDataFromLocalStorage(request: any) {
		const examDatasJSON = localStorage.getItem('examToeicDatas');
		let examDatas: any[] = [];

		if (examDatasJSON) {
			examDatas = JSON.parse(examDatasJSON);
		}

		const filteredExamDatas = examDatas.filter(
			(item) =>
				!(
					item.ExamToeicId == request.examToeicId &&
					item.UserId == request.userId
				)
		);

		// console.log(filteredExamDatas);
		// console.log(request);
		localStorage.setItem('examToeicDatas', JSON.stringify(filteredExamDatas));
	}

	saveExamDataToLocalStorage(examData: any): void {
		try {
			if (typeof localStorage === 'undefined') {
				console.error('localStorage is not supported.');
				return;
			}
			const examDatasJSON = localStorage.getItem('examToeicDatas');
			let examDatas: any[] = [];
			if (examDatasJSON) {
				examDatas = JSON.parse(examDatasJSON);
			}
			const existingIndex = examDatas.findIndex(
				(item) =>
					item.ExamToeicId === examData.ExamToeicId &&
					item.UserId === examData.UserId
			);
			if (existingIndex !== -1) {
				examDatas[existingIndex] = examData;
			} else {
				if (Object.keys(examData.selectedAnswers).length > 0) {
					examDatas.push(examData);
				}
			}

			const examDatasJSONUpdated = JSON.stringify(examDatas);
			localStorage.setItem('examToeicDatas', examDatasJSONUpdated);

			// console.log('Exam data saved to localStorage successfully.');
		} catch (error) {
			console.error(
				'An error occurred while saving exam data to localStorage:',
				error
			);
		}
	}


	@HostListener('window:beforeunload', ['$event'])
	unloadNotification($event: BeforeUnloadEvent) {
		console.log("Kiểm tra đầu hàm unloadNotification");

		const confirmationMessage = 'Bạn có chắc chắn muốn rời khỏi trang này?';
		$event.returnValue = confirmationMessage;

		if (Object.keys(this.selectedAnswers).length != 0) {

			const newExamData: any = {
				UserId: this.userCurrent.id,
				ExamToeicId: this.examToeic.id,
				Duration: this.getCountdown(),
				selectedAnswers: this.selectedAnswers,
			};
			this.saveExamDataToLocalStorage(newExamData);
		}
	}


	//nut continute

	continuteFlag = false;
	continute(status: any) {
		this.continuteFlag = status;
		if (status == true) {
			this.countdown.pause();
		} else {
			this.countdown.resume();
		}
	}
}








// ngOnInit() {
//   this.route.paramMap.subscribe(params => {
//     const request = {
//       id: params.get('id')
//     }

//     this.examToeicService.getExamToeicById(request).subscribe((result: any) => {
//       this.examToeic = result.data;
//     });
//   });
// }

// public questions:any={
//   title:'',
//   image:'',
//   paragraph:'',
//   audio:'',
//   questionAnswers:[]
// }
