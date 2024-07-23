import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestQuizComponent } from './test-quiz/test-quiz.component';

const routes: Routes = [
  {
    path:'test-quiz',
    component:TestQuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
