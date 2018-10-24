import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './user-info.component';
const routes: Routes = [
  {
    path: '', component: UserInfoComponent, data: {
      title: 'VTGO Thông tin tài khoản',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Thông tin tài khoản'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInfoRoutingModule { }
