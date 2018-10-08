import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleOwnerComponent } from './vehicle-owner.component';

const routes: Routes = [
  {
    path: '', component: VehicleOwnerComponent, data: {
      title: 'Chủ phương tiện',
      urls: [{ title: 'Thông tin người dùng', url: '/admin/main' }, { title: 'Chủ phương tiện' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleOwnerRoutingModule { }
