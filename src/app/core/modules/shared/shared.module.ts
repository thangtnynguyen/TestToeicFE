import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ValidationMessageModule } from '../validation-message/validation-message.module';
import { LoadingUiModule } from '../loading-ui/loading-ui.module';
import { ToastrModule } from '../toastr/toastr.module';
import { BreadcrumbModule } from '../../components/breadcrumb/breadcrumb.module';
import { CommentComponent } from 'src/app/user/components/comment/comment.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/user/accounts/login/login.component';

@NgModule({
  declarations: [
    CommentComponent,
    LoginComponent
  ],
  imports: [CommonModule,FormsModule,ReactiveFormsModule ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ValidationMessageModule,
    ToastrModule,
    LoadingUiModule,
    BreadcrumbModule,
    CommentComponent ,
    LoginComponent
    //add
    // CommonModule,


  ],
})
export class SharedModule { }
