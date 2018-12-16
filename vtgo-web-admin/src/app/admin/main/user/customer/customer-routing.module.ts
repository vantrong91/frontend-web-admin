import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  {
    path: '', component: CustomerComponent, data: {
      title: 'Customer Page',
      urls: [{ title: 'Main', url: '/admin/main' }, { title: 'Customer Category' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
