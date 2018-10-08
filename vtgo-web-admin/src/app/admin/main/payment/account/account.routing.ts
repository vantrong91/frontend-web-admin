import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AccountComponent} from './account.component';

const routes: Routes = [
    {
        path: '', component: AccountComponent, data: {
            title: 'Account Page',
            urls: [{ title: 'Main', url: '/admin/main'}, {title: 'Tài khoản'}]
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AccountRoutingModule {}