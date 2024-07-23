import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListQuestionComponent } from './list-question/list-question.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';

const routes: Routes = [
  {
    path:'',
    component:ListQuestionComponent
  },
  {
    path:'create',
    component:AddQuestionComponent
  },
  {
    path:'import-excel',
    component:ImportExcelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
