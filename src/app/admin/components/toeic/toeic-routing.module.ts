import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListToeicComponent } from './list-toeic/list-toeic.component';
import { AddToeicComponent } from './add-toeic/add-toeic.component';

const routes: Routes = [
  {
    path:'',
    component:ListToeicComponent
  },
  {
    path:'create',
    component:AddToeicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToeicRoutingModule { }
