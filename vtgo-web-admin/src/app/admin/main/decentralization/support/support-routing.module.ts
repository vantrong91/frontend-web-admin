import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support.component';
const routes: Routes = [
  {
    path: '', component: SupportComponent, data: {
      title: 'Bộ phận Hỗ trợ',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Bộ phận Hộ trợ'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
