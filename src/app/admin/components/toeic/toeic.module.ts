import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToeicRoutingModule } from './toeic-routing.module';
import { AddToeicComponent } from './add-toeic/add-toeic.component';
import { ListToeicComponent } from './list-toeic/list-toeic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddToeicComponent,
    ListToeicComponent
  ],
  imports: [
    CommonModule,
    ToeicRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ToeicModule { }
