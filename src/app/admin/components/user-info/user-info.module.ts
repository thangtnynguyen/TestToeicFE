import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoRoutingModule } from './user-info-routing.module';
import { InfoComponent } from './info/info.component';
import { ChangeInfoComponent } from './change-info/change-info.component';


@NgModule({
  declarations: [
    InfoComponent,
    ChangeInfoComponent
  ],
  imports: [
    CommonModule,
    UserInfoRoutingModule
  ]
})
export class UserInfoModule { }
