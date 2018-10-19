import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountantComponent } from './accountant.component';
const routes: Routes = [
  {
    path: '', component: AccountantComponent, data: {
      title: 'Bộ phận Kế toán',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Bộ phận Kế toán'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountantRoutingModule { }
