import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceComponent } from './insurance.component';
const routes: Routes = [
  {
    path: '', component: InsuranceComponent, data: {
      title: 'Bộ phận Bảo hiểm',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Bộ phận Bảo hiểm'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
