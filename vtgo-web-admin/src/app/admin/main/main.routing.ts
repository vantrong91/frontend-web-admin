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
      { path: 'balance', loadChildren: './payment/balance/balance.module#BalanceModule' },
      { path: 'exchange', loadChildren: './payment/exchange/balance-his.module#BalanceHisModule' },
      { path: 'account-exchange', loadChildren: './payment/account-exchange/account-exchange.module#AccountModule' },
      { path: 'business', loadChildren: './decentralization/business/business.module#BusinessModule' },
      { path: 'accountant', loadChildren: './decentralization/accountant/accountant.module#AccountantModule' },
      { path: 'manage', loadChildren: './decentralization/manage/manage.module#ManageModule' },
      { path: 'support', loadChildren: './decentralization/support/support.module#SupportModule' },
      { path: 'technical', loadChildren: './decentralization/technical/technical.module#TechnicalModule' },
      { path: 'userinfo', loadChildren: './settings/user-info/user-info.module#UserInfoModule'},
      { path: 'changepw', loadChildren: './settings/change-pw/change-pw.module#ChangePwModule'},
      { path: 'feebanks', loadChildren: './feebanks/feebanks.module#FeeBanksModule'},
      { path: 'orderpaid', loadChildren: './payment/order-paid/order-paid.module#OrderPaidModule'},
      { path: 'vehiclefines', loadChildren: './setting/config-vehiclefines/config-vehiclefines.module#ConfigVehiclefinesModule'},
      { path: 'policy', loadChildren: './setting/configpolicy/configpolicy.module#ConfigPolicyModule'},
      { path: 'category', loadChildren: './setting/category/category.module#CategoryModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class MainRoutingModule { }
