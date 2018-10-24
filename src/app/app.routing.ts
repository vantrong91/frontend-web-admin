import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    // { path: 'home', loadChildren: './home/home.module#HomeModule' },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true }), NgbModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule { }
