import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';
const routes: Routes = [
  {
    path: '', component: ManageComponent, data: {
      title: 'Bộ phận Quản lý',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Bộ phận Quán lý'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
