import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AuthenService } from '../core';

const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'main', canActivate: [AuthenService], loadChildren: './main/main.module#MainModule' },
            { path: 'login', loadChildren: './login/login.module#LoginModule' },
            { path: 'fogot', loadChildren: './fogot-password/fogot-password.module#FogotPasswordModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
