import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceComponent } from './balance.component';
const routes: Routes = [
  {
    path: '', component: BalanceComponent, data: {
      title: 'VTGO Số dư tài khoản',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Số dư tài khoản'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceRoutingModule { }
