import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleOwnerComponent } from './vehicle-owner.component';

const routes: Routes = [
  {
    path: '', component: VehicleOwnerComponent, data: {
      title: 'VTGO Chủ phương tiện',
      urls: [{ title: 'Trang chủ', url: '/admin/main' }, { title: 'Chủ phương tiện' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleOwnerRoutingModule { }
