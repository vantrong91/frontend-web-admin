import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './orderlist.component';

const routes: Routes = [
  {
    path: '', component: OrderListComponent, data: {
      title: 'VTGO Đơn hàng',
      urls: [{ title: 'Trang chủ', url: '/admin/main' }, { title: 'Danh sách đơn hàng' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderListRoutingModule {
}
