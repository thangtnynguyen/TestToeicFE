import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

import { AuthGuard } from './core/guards/auth.guard';
import { UnAuthGuard } from './core/guards/un-auth.guard';
import { NotFoundComponent } from './core/components/error/components/not-found/not-found.component';
import { userInfoGuardGuard, userInfoGuard } from './core/guards/user-info.guard';
import { adminGuardGuard } from './core/guards/admin.guard';
import { LoginComponent } from './admin/components/login/login.component';

const routes: Routes = [

	// {
	//   path: 'auth',
	//   loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
	//   canActivate: [UnAuthGuard]
	// },
	{
		path: '',
		component: UserComponent,
		canActivate: [userInfoGuardGuard],
		loadChildren: () =>
			import('./user/user.module').then((m) => m.UserModule),
	},
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [adminGuardGuard],
		loadChildren: () =>
			import('./admin/admin.module').then((m) => m.AdminModule),
	},
	{
		path: 'admin/login',
		component: LoginComponent,
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
