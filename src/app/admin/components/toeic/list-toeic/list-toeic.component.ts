import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PER_PAGE_OPTIONS } from 'src/app/admin/configs/paging.config';
import { ExamToeicService } from 'src/app/admin/services/apis/exam-toeic.service';

@Component({
  selector: 'app-list-toeic',
  templateUrl: './list-toeic.component.html',
  styleUrls: ['./list-toeic.component.css']
})
export class ListToeicComponent  implements OnInit{




  public config: { [key: string]: any, perPageOptions: any[]  } = { perPageOptions: DEFAULT_PER_PAGE_OPTIONS };

  //data
  public examToeics: any[] = [];

  //Paging
  public currentPage: any;
  public pageSize: any = 10;
  public pageIndex: any;
  public totalPages: any;
  public totalRecords: any;
  public search: any = {
    nameOrEmail: '',
    phoneNumber: '',
    status: ''
  };

  constructor(private examToeicService: ExamToeicService, private route: ActivatedRoute, private router: Router, private ngxToastr: ToastrService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        pageIndex: params['pageIndex'] ? params['pageIndex'] : DEFAULT_PAGE_INDEX,
        pageSize: params['pageSize'] ? params['pageSize'] : DEFAULT_PAGE_SIZE,
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

        if (this.examToeics.length === 0) {
          this.pageIndex = 1;
        }
      }
    });
  }

  handleDeleteItem(id:number){

  }


  handleOnPerPageChange(event:any){

  }

  handleOnChangePage(page:number){

  }
  handleSearchExamToeics(){

  }












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

  //Status button
  public statusButton(exam: any): number {
    const currentTime = new Date();
    if(exam.endTime && new Date(exam.endTime) < currentTime){
      return 1;
    } else if(currentTime >= new Date(exam.startTime) && currentTime <= new Date(exam.endTime)){
      return 2;
    }else{
      return 3;
    }
  }
}
