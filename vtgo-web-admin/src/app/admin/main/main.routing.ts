import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {NotFoundComponent} from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: 'vehicleowner', loadChildren: './vehicle-owner/vehicle-owner.module#VehicleOwnerModule'},
      {path: 'vehicle', loadChildren: './vehicle/vehicle.module#VehicleModule'},
      {path: 'driver', loadChildren: './driver/driver.module#DriverModule'},
      {path: 'customer', loadChildren: './customer/customer.module#CustomerModule'},
      {path: 'goodsowner', loadChildren: './goodsowner/goodsowner.module#GoodsownerModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
