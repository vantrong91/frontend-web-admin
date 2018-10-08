import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleComponent } from './vehicle.component';

const routes: Routes = [
  {
    path: '', component: VehicleComponent, data: {
      title: 'Phương tiện',
      urls: [{ title: 'Thông tin người dùng', url: '/admin/main'}, { title: 'Phương tiện'}]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
