import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverComponent } from './driver.component';

const routes: Routes = [
  {
    path: '', component: DriverComponent, data: {
      title: 'VTGO Lái xe',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Lái xe'}]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
