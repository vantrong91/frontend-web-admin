import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsOwnerComponent } from './goodsowner.component';
const routes: Routes = [
  {
    path: '',
    component: GoodsOwnerComponent,
    data: {
      title: 'VTGO Chủ hàng',
      urls: [{ title: 'Trang chủ', url: '/admin/main' }, { title: 'Chủ hàng' }]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsownerRoutingModule { }
