import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderPaidComponent } from './order-paid.component';

const routes: Routes = [
  {
    path: '', component: OrderPaidComponent, data: {
      title: 'VTGO Thanh toán đơn hàng',
      urls: [{ title: 'Trang chủ', url: '/admin/main' }, { title: 'Thanh toán đơn hàng' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPaidRoutingModule { 
}
