import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountComponent } from './components/account/account.component';
import { BannerComponent } from './components/banner/banner.component';
import { ConfigComponent } from './components/config/config.component';

const routes: Routes = [
	{
		path: 'exam-toeic',
		loadChildren: () => import('./components/toeic/toeic.module').then((m) => m.ToeicModule),
	},
	{
		path: 'user-info',
		loadChildren: () => import('./components/user-info/user-info.module').then((m) => m.UserInfoModule),
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'account',
		component: AccountComponent
	},
	{
		path: 'banner',
		component: BannerComponent
	},
	{
		path: 'config/web',
		component: ConfigComponent
	},
	{
		path: 'config/system',
		component: ConfigComponent
	},
	{
		path: 'question',
		loadChildren: () => import('./components/question/question.module').then(m => m.QuestionModule),
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
