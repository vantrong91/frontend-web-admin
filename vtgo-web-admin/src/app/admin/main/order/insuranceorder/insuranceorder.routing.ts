import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceorderComponent } from './insuranceorder.component';

const routes: Routes = [
  {
    path: '', component: InsuranceorderComponent, data: {
      title: 'Insurance Order Page',
      urls: [{ title: 'Main', url: '/admin/main'}, {title: 'Đơn hàng bảo hiểm hàng hóa'}]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceOrderRoutingModule { }
