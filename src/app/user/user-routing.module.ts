import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestToeicComponent } from './components/toeic/test-toeic/test-toeic.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './accounts/login/login.component';
import { ChangeInfoComponent } from './components/change-info/change-info.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'toeic',
    // component: TestToeicComponent,
    loadChildren: () => import('./components/toeic/toeic.module').then((m) => m.ToeicModule),

  },
  {
    path: 'quiz',
    // component: TestToeicComponent,
    loadChildren: () => import('./components/quiz/quiz.module').then((m) => m.QuizModule),

  },
  {
    path: 'login',
    component: LoginComponent,
    // loadChildren: () => import('./accounts/login/login.component').then((m) => m.ToeicModule),

  },
  {
    path:'change-info',
    component:ChangeInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
