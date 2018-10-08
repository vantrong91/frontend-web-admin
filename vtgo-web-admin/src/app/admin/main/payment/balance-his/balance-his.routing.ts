import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceHisComponent } from './balance-his.component';

const routes: Routes = [
  {
    path: '', component: BalanceHisComponent, data: {
      title: 'VTGO Lịch sử giao dịch',
      urls: [{ title: 'Main', url: '/admin/main' }, { title: 'Lịch sử giao dịch' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceHisRoutingModule { 
}
