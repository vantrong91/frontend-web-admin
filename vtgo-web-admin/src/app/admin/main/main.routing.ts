import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { NotFoundComponent } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'vehicleowner', loadChildren: './vehicle-owner/vehicle-owner.module#VehicleOwnerModule' },
      { path: 'vehicle', loadChildren: './vehicle/vehicle.module#VehicleModule' },
      { path: 'driver', loadChildren: './driver/driver.module#DriverModule' },
      { path: 'customer', loadChildren: './customer/customer.module#CustomerModule' },
      { path: 'goodsowner', loadChildren: './goodsowner/goodsowner.module#GoodsownerModule' },
      { path: 'account', loadChildren: './payment/account/account.module#AccountModule' },
      { path: 'insuranceorder', loadChildren: './order/insuranceorder/insuranceorder.module#InsuranceOrderModule' },
      { path: 'balancehis', loadChildren: './payment/balance-his/balance-his.module#BalanceHisModule' },
      { path: 'orderlist', loadChildren: './order/orderlist/orderlist.module#OrderListModule' },
      { path: 'quotation', loadChildren: './order/quotation/quotation.module#QuotationModule'},
      { path: 'balance', loadChildren: './payment/balance/balance.module#BalanceModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
