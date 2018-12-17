import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { NotFoundComponent } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      //Thông tin người dùng
      { path: 'vehicleowner', loadChildren: './user/vehicle-owner/vehicle-owner.module#VehicleOwnerModule' },
      { path: 'vehicle', loadChildren: './user/vehicle/vehicle.module#VehicleModule' },
      { path: 'driver', loadChildren: './user/driver/driver.module#DriverModule' },
      { path: 'customer', loadChildren: './user/customer/customer.module#CustomerModule' },
      { path: 'goodsowner', loadChildren: './user/goodsowner/goodsowner.module#GoodsownerModule' },
      //Thanh toán: payment
      { path: 'account-exchange', loadChildren: './payment/account-exchange/account-exchange.module#AccountModule' },
      { path: 'balance', loadChildren: './payment/balance/balance.module#BalanceModule' },
      { path: 'orderpaid', loadChildren: './payment/order-paid/order-paid.module#OrderPaidModule' },
      //Đơn hàng
      { path: 'insuranceorder', loadChildren: './order/insuranceorder/insuranceorder.module#InsuranceOrderModule' },
      { path: 'orderlist', loadChildren: './order/orderlist/orderlist.module#OrderListModule' },
      { path: 'quotation', loadChildren: './order/quotation/quotation.module#QuotationModule' },
      //Bộ phận & phân quyền      
      { path: 'account', loadChildren: './decentralization/account/account.module#AccountModule' },
      { path: 'business', loadChildren: './decentralization/business/business.module#BusinessModule' },
      { path: 'accountant', loadChildren: './decentralization/accountant/accountant.module#AccountantModule' },
      { path: 'manage', loadChildren: './decentralization/manage/manage.module#ManageModule' },
      { path: 'support', loadChildren: './decentralization/support/support.module#SupportModule' },
      { path: 'technical', loadChildren: './decentralization/technical/technical.module#TechnicalModule' },
      //Quản lý danh mục
      { path: 'vehiclefines', loadChildren: './configuration/config-vehiclefines/config-vehiclefines.module#ConfigVehiclefinesModule' },
      { path: 'policy', loadChildren: './configuration/configpolicy/configpolicy.module#ConfigPolicyModule' },
      { path: 'category', loadChildren: './configuration/category/category.module#CategoryModule' },
      { path: 'feebanks', loadChildren: './configuration/feebanks/feebanks.module#FeeBanksModule' },
     
      // Cài đặt tài khoản
      { path: 'userinfo', loadChildren: './settings/user-info/user-info.module#UserInfoModule' },
      { path: 'changepw', loadChildren: './settings/change-pw/change-pw.module#ChangePwModule' },

      //Quên mật khẩu
      { path: 'mailbox', loadChildren: './mailbox/mailbox.module#MailboxModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
