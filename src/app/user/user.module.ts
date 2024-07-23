import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';

import { CountdownModule } from 'ngx-countdown';
import { LoginComponent } from './accounts/login/login.component';
import { SignUpComponent } from './accounts/sign-up/sign-up.component';
import { SlideShowComponent } from './components/home/slide-show/slide-show.component';
import { ListToeicHomeComponent } from './components/home/list-toeic-home/list-toeic-home.component';
import { SharedModule } from '../core/modules/shared/shared.module';
import { CommentComponent } from './components/comment/comment.component';
import { ChangeInfoComponent } from './components/change-info/change-info.component';
import { OverviewToeicComponent } from './components/home/overview-toeic/overview-toeic.component';
import { ListQuizHomeComponent } from './components/home/list-quiz-home/list-quiz-home.component';
import { BannerInfoComponent } from './components/home/banner-info/banner-info.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    UserComponent,
    // LoginComponent,
    SignUpComponent,
    SlideShowComponent,
    ListToeicHomeComponent,
    ChangeInfoComponent,
    OverviewToeicComponent,
    ListQuizHomeComponent,
    BannerInfoComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    CountdownModule,
    ModalModule.forRoot(),
    SharedModule,

    


  ]
})
export class UserModule { }
