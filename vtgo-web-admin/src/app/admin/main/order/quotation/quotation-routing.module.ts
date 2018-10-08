import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotationComponent } from './quotation.component';
const routes: Routes = [
  {
    path: '', component: QuotationComponent, data: {
      title: 'Quotation',
      urls: [{ title: 'Main', url: '/admin/main'}, {title: 'Báo giá'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationRoutingModule { }
