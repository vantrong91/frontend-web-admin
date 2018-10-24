import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePwComponent } from './change-pw.component';
const routes: Routes = [
  {
    path: '', component: ChangePwComponent, data: {
      title: 'VTGO Đổi mật khẩu',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Đổi mật khẩu'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePwRoutingModule { }
