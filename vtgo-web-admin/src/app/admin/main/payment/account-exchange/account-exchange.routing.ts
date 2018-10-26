import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AccountComponent} from './account-exchange.component';

const routes: Routes = [
    {
        path: '', component: AccountComponent, data: {
            title: 'VTGO Tài khoản',
            urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Tài khoản'}]
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AccountRoutingModule {}