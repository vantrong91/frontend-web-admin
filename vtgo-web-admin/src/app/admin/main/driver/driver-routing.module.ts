import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverComponent } from './driver.component';

const routes: Routes = [
  {
    path: '', component: DriverComponent, data: {
      title: 'Driver Page',
      urls: [{ title: 'Main', url: 'admin/main'}, {title: 'Driver'}]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
