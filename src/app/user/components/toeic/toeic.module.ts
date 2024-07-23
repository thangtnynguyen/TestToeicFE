import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToeicRoutingModule } from './toeic-routing.module';
import { ListToeicComponent } from './list-toeic/list-toeic.component';
import { TestToeicComponent } from './test-toeic/test-toeic.component';
import { DetailToeicComponent } from './detail-toeic/detail-toeic.component';
import { FormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { ToeicResultComponent } from './toeic-result/toeic-result.component';
import { ToeicResultDetailComponent } from './toeic-result-detail/toeic-result-detail.component';
import { CommentComponent } from '../comment/comment.component';
import { SharedModule } from 'src/app/core/modules/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    ListToeicComponent,
    TestToeicComponent,
    DetailToeicComponent,
    ToeicResultComponent,
    ToeicResultDetailComponent,
  ],
  imports: [
    CommonModule,
    ToeicRoutingModule,
    FormsModule,
    CountdownModule,
    SharedModule,
    ModalModule.forRoot(),

  ]
})
export class ToeicModule { }
