import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ExamToeicService } from 'src/app/admin/services/apis/exam-toeic.service';
import { FileService } from 'src/app/admin/services/apis/file.service';

@Component({
	selector: 'app-add-toeic',
	templateUrl: './add-toeic.component.html',
	styleUrls: ['./add-toeic.component.css']
})
export class AddToeicComponent implements OnInit {

	constructor(
		private ngxToastr: ToastrService,
		private router: Router, private modalService: BsModalService,
		private examToeicService: ExamToeicService,
		private fileService: FileService

	) { }

	public exam: any = {
		title: '',
		description: '',
		duration: 0,
		fileExel: null,
		files: [],
		type: 1,
		isShowContent: false,
		isSeeScore: false,
		isMixQuestion: false,
		isMixQuestionAnswer: false,
		isAllowChangeTab: false,
		startTime: '',
		endTime: '',
		status: true,

	};


	public validateFormSuccess: any = {
		touchSection: false,
		touchDiff: false
	}

	ngOnInit(): void {

	}

	public handleSubmitCreateExam() {
		// console.log("moi", this.exam);

		const formData = new FormData();

		formData.append('fileExel', this.exam.fileExel);
		this.exam.files.forEach((file: any) => {
			formData.append('files', file);
		});
		formData.append('title', this.exam.title);
		formData.append('description', this.exam.description);
		formData.append('duration', this.exam.duration);
		formData.append('type', this.exam.type);
		formData.append('isShowContent', this.exam.isShowContent);
		formData.append('isSeeScore', this.exam.isSeeScore);
		formData.append('isMixQuestion', this.exam.isMixQuestion);
		formData.append('isMixQuestionAnswer', this.exam.isMixQuestionAnswer);
		formData.append('isAllowChangeTab', this.exam.isAllowChangeTab);
		formData.append('startTime', this.exam.startTime);
		formData.append('endTime', this.exam.endTime);
		formData.append('status', this.exam.status);

		this.examToeicService.CreateExamToeic(formData).subscribe((result: any) => {
			if (result.status) {

				this.ngxToastr.success(result.message, '', {
					progressBar: true
				});
				this.router.navigate(['/admin/exam-toeic']);

				// const formDataFile = new FormData();
				// this.exam.files.forEach((file: any) => {
				//   formDataFile.append('files', file);
				// });
				// this.fileService.UploadMultipleFile(formDataFile).subscribe(result => {

				//   if (result.status) {
				//   }
				// })

			}
		}, error => {
			console.log(error);
			this.ngxToastr.error(error.error.message, '', {
				progressBar: true
			});
		});

	}





	@ViewChild('fileInput') fileInput!: ElementRef;

	checkFileCount(): void {
		const files = this.fileInput.nativeElement.files;
		if (files.length > 150) {
			alert("Không được phép tải lên quá 150 file.");
			this.resetFileInput();
		}
		// Tiếp tục xử lý nếu số lượng file hợp lệ
	}

	resetFileInput(): void {
		this.fileInput.nativeElement.value = '';
	}



	onFileChange(event: any) {
		if (event.target.files.length > 0) {
			for (let i = 0; i < event.target.files.length; i++) {
				const originalFile = event.target.files[i];
				const fileCopy = new File([originalFile], originalFile.name, {
					type: originalFile.type,
					lastModified: originalFile.lastModified,
				});
				this.exam.files.push(fileCopy);
			}
		}
		else {
			this.ngxToastr.warning('Vui lòng chọn một thư mục có file!', 'WARNING');
			event.target.value = null;
		}
	}

	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		if (file) {
			const extension = file.name.split('.').pop()?.toLowerCase();
			if (extension !== 'xlsx' && extension !== 'xls') {
				this.ngxToastr.warning('Vui lòng chọn một tệp Excel!', 'WARNING');
				event.target.value = null;
			}
			else {
				this.exam.fileExel = file;
			}
		}
	}
}
