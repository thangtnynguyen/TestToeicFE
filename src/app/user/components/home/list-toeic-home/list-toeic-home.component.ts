// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-list-toeic-home',
//   templateUrl: './list-toeic-home.component.html',
//   styleUrls: ['./list-toeic-home.component.css']
// })
// export class ListToeicHomeComponent {

// }

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamToeicService } from 'src/app/user/services/api/exam-toeic.service';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PER_PAGE_OPTIONS } from 'src/app/user/configs/paging.config';
import { ToastrService } from 'src/app/core/modules/toastr/toastr.service';
import { AuthService } from 'src/app/core/services/identity/auth.service';

@Component({
  selector: 'app-list-toeic-home',
  templateUrl: './list-toeic-home.component.html',
  styleUrls: ['./list-toeic-home.component.css']
})
export class ListToeicHomeComponent implements OnInit {

  public config: { [key: string]: any, perPageOptions: any[] } = { perPageOptions: DEFAULT_PER_PAGE_OPTIONS };

  //data
  public examToeics: any[] = [];

  //Paging
  public currentPage: any;
  public pageSize: any = 8;
  public pageIndex: any;
  public totalPages: any;
  public totalRecords: any;
  public search: any = {
    nameOrEmail: '',
    phoneNumber: '',
    status: ''
  };
  userCurrent:any;


  constructor(private authService:AuthService ,private examToeicService: ExamToeicService, private route: ActivatedRoute, private router: Router, private ngxToastr: NgxToastrService, private toastrService: ToastrService) { 
    this.authService.userCurrent.subscribe(user => {
      this.userCurrent = user;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        pageIndex: params['pageIndex'] ? params['pageIndex'] : DEFAULT_PAGE_INDEX,
        pageSize: params['pageSize'] ? params['pageSize'] : 8,
      };

      this.getExamToeics(request);
    });


  }


  getExamToeics(request: any) {
    this.examToeicService.getExamToeics(request).subscribe((result: any) => {
      if (result.status) {
        if (request.pageIndex !== 1 && result.data.items.length === 0) {
          this.route.queryParams.subscribe(params => {
            const request = {
              ...params,
              pageIndex: 1,
            };

            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: request,
              queryParamsHandling: 'merge',
            });
          });
        }

        this.examToeics = result.data.items;
        this.totalPages = result.data.totalPages;
        this.currentPage = result.data.pageIndex;
        this.totalRecords = result.data.totalRecords;
        this.pageSize = result.data.pageSize;
        this.assignRandomColors();
        this.assignRandomNumbers();
        this.getExamDataToLocalStorage({userId:this.userCurrent?.id});

        if (this.examToeics.length === 0) {
          this.pageIndex = 1;
        }
      }
    });
  }



  getExamDataToLocalStorage(request: any) {
    const examDatasJSON = localStorage.getItem('examToeicDatas');
    let examDatas: any[] = [];

    if (examDatasJSON) {
        examDatas = JSON.parse(examDatasJSON);
    }
    const userExams = examDatas.filter(item => item.UserId === request.userId);
    // console.log(userExams);

    this.examToeics.forEach(exam => {
        const isTestFound = userExams.find(userExam => userExam.ExamToeicId === exam.id);

        if (isTestFound) {
            exam.isTest = true;
            exam.questionTesting= Object.keys(isTestFound.selectedAnswers).length;
        } else {
            exam.isTest = false; 
            exam.questionTesting=0;
        }

       
    });
}


  //front end

  assignRandomColors() {
    this.examToeics.forEach(exam => {
      exam.color = this.getRandomColor();
    });
  }
  gradientColors = [
    'linear-gradient(to right, #e91e63, #f8bbd0)',    // Dải màu hồng
    'linear-gradient(to right, #9c27b0, #e1bee7)',    // Dải màu tím
    'linear-gradient(to right, #ff9800, #ffe0b2)',    // Dải màu cam
    'linear-gradient(to right, #03a9f4, #81d4fa)',    // Dải màu xanh dương
    'linear-gradient(to right, #ff5722, #ffccbc)',    // Dải màu cam đất
    'linear-gradient(to right, #8bc34a, #dcedc8)',    // Dải màu xanh lá cây nhạt
    'linear-gradient(to right, #ffc107, #ffecb3)',    // Dải màu vàng
    'linear-gradient(to right, #2196f3, #bbdefb)'     // Dải màu xanh dương nhạt
  ];
  getRandomColor(): string {
    return this.gradientColors[Math.floor(Math.random() * this.gradientColors.length)];
  }



  assignRandomNumbers() {
    this.examToeics.forEach(exam => {
      exam.view = this.getRandomNumber();
    });
  }

  getRandomNumber() {
    const min = 10000;
    const max = 30000;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }








  // checkFileCount(event: any): void {
  //   const files = event.target.files;
  //   if (files.length > 150) {
  //     alert("Không được phép tải lên quá 150 file.");
  //     this.resetFileInput();
  //   }
  //   // Tiếp tục xử lý nếu số lượng file hợp lệ
  // }

  // resetFileInput(): void {
  //   const fileInput = <HTMLInputElement>document.getElementById('fileInput');
  //   fileInput.value = '';
  // }



}
