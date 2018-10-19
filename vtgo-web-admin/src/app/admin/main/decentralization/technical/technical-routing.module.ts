import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechnicalComponent } from './technical.component';
const routes: Routes = [
  {
    path: '', component: TechnicalComponent, data: {
      title: 'Bộ phận Kỹ thuật',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Bộ phận Kỹ thuật'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicalRoutingModule { }
