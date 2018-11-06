import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailboxComponent } from './mailbox.component';
const routes: Routes = [
  {
    path: '', component: MailboxComponent, data: {
      title: 'Hộp thư',
      urls: [{ title: 'Trang chủ', url: '/admin/main'}, {title: 'Hộp thư'}]
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailboxRoutingModule { }
