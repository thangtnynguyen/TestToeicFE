import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { ChangeInfoComponent } from './change-info/change-info.component';

const routes: Routes = [
  {
    path:'info',
    component:InfoComponent
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
export class UserInfoRoutingModule { }
