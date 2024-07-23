import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PER_PAGE_OPTIONS } from 'src/app/admin/configs/paging.config';
import animationConstant from 'src/app/admin/constants/animation.constant';
import orderConstant from 'src/app/admin/constants/orderConstant';
import sortConstant from 'src/app/admin/constants/sortConstant';
import questionHelper from 'src/app/admin/helpers/question.helper';
import { QuestionService } from 'src/app/admin/services/apis/question.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css'],
  animations: animationConstant.animations

})
export class ListQuestionComponent  implements OnInit{

  public config: { [key: string]: any, perPageOptions: any[]  } = { perPageOptions: DEFAULT_PER_PAGE_OPTIONS };

  questionContant:any=[1,2];
  questionHelper: any = questionHelper;
  sortConstant: any = sortConstant;
  orderConstant: any = orderConstant;
  search: any = {
    orderBy: '',
    sortBy: '',
    questionCategoryId: 0,
    type: 0,
    title: '',
    sectionId: 0,
    difficulty: 0
  };
  questions: any = [];
  selectedItems: number[] = [];
  pageSize: any = 10;
  pageIndex: any = 1;
  totalPages: any;


  constructor(private questionService:QuestionService,private router:Router, private route: ActivatedRoute  ){ }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        pageIndex: params['pageIndex'] ? params['pageIndex'] : DEFAULT_PAGE_INDEX,
        pageSize: params['pageSize'] ? params['pageSize'] : 100,
      };

      this.search = {
        ...params,
        type: params['type'] ? params['type'] : 0,
        sectionId: params['sectionId'] ? params['sectionId'] : 0,
        difficulty: params['difficulty'] ? params['difficulty'] : 0,
      }

      // if(this.search.questionCategoryId){
      //   const defaultCategory = result.data.find((category: any) => category.id === +this.search.questionCategoryId);
      // }

      this.getQuestions(request);
    });
  }
  getQuestions(request: any): void{
    this.questionService.getQuestions(request).subscribe((result: any) => {
      if(result.status){
        this.questions = result.data.items;
        this.totalPages = result.data.totalPages;
      }
    });

  }


  handleSubmitSearch(){

  };

  handleOnDeleteMultiple(){

  };
  handleDelete(int:any){};
  selectAllQuestions(event:any){

  }

  onSortAndOrderChange(int:any){

  }
  onPerPageChange(int:any){

  }
  toggleSelection(int:any){

  };
  isSelected(int:any){

  };

  setPage(int:any){

  };
}
