import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListToeicComponent } from './list-toeic/list-toeic.component';
import { TestToeicComponent } from './test-toeic/test-toeic.component';
import { DetailToeicComponent } from './detail-toeic/detail-toeic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToeicResultComponent } from './toeic-result/toeic-result.component';
import { ToeicResultDetailComponent } from './toeic-result-detail/toeic-result-detail.component';
import { CountdownModule } from 'ngx-countdown';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: ListToeicComponent
  },
  {
    path: 'detail-toeic/:id',
    component: DetailToeicComponent
  },
  {
    path: 'test-toeic/:id',
    component: TestToeicComponent,
    canDeactivate: [CanDeactivateGuard]

  },
  {
    path: 'toeic-result',
    component: ToeicResultComponent
  },
  {
    path: 'toeic-result-detail/:id',
    component: ToeicResultDetailComponent
  },
  {
    path: 'test-test/:id',
    component: TestToeicComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CountdownModule
  ],
  exports: [RouterModule]
})
export class ToeicRoutingModule { }
