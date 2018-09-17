import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsOwnerComponent } from './goodsowner.component';
const routes: Routes = [
  {
    path: '', component: GoodsOwnerComponent, data: {
      title: 'Goodsowner Page',
      urls: [{ title: 'Main', url: '/admin/main'}, {title: 'GoodsOwner'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsownerRoutingModule { }
