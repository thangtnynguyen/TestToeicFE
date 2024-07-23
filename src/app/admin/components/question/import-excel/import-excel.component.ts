// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-import-excel',
//   templateUrl: './import-excel.component.html',
//   styleUrls: ['./import-excel.component.css']
// })
// export class ImportExcelComponent {

// }


import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/admin/services/apis/question.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent {


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngxToastr: NgxToastrService,
    private questionService: QuestionService
  ) { }


  public importExcelForm: any = {
    file: null,//excel
    files:[]//audio,image
  }
  
  public onFileSelected(event: any):void{
    this.importExcelForm.file = event.target.files[0];
  }
  
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const originalFile = event.target.files[i];
        const fileCopy = new File([originalFile], originalFile.name, {
          type: originalFile.type,
          lastModified: originalFile.lastModified,
        });
        this.importExcelForm.files.push(fileCopy);
      }
    }
    else {
      this.ngxToastr.warning('Vui lòng chọn một thư mục có file!', 'WARNING');
      event.target.value = null;
    }
  }




  public handleImportQuestionGroupModule(): void{
    this.route.params.subscribe(params => {

      const formData = new FormData();

      formData.append('file', this.importExcelForm.file);
      this.importExcelForm.files.forEach((file: any) => {
        formData.append('files', file);
      });


    this.questionService.ImportQuestionsExcel(formData).subscribe((result: any) => {
      if (result.status) {
        this.ngxToastr.success('Import câu hỏi thành công','',{
          progressBar: true
        });

        this.router.navigate(['admin//question']);

       
      } 
    },error => {
      console.log(error);
      this.ngxToastr.error(error.error.message,'',{
        progressBar: true
      });
    });
    });
  }

}

