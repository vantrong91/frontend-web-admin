import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleOwnerComponent } from './vehicle-owner.component';

const routes: Routes = [
  {
    path: '', component: VehicleOwnerComponent, data: {
      title: 'VehicleOwner Page',
      urls: [{ title: 'Main', url: '/admin/main' }, { title: 'VehicleOwner' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleOwnerRoutingModule { }
