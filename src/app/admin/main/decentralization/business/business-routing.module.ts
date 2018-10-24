import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessComponent } from './business.component';
const routes: Routes = [
  {
    path: '', component: BusinessComponent, data: {
      title: 'Bộ phận kinh doanh',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Bộ phận kinh doanh'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
