import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeebanksComponent } from './feebanks.component';
const routes: Routes = [
  {
    path: '', component: FeebanksComponent, data: {
      title: 'Phí chuyển khoản',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Phí chuyển khoản'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeBanksRoutingModule { }
