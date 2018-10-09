import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleComponent } from './vehicle.component';

const routes: Routes = [
  {
    path: '', component: VehicleComponent, data: {
      title: 'VTGO Phương tiện',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, { title: 'Phương tiện'}]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
