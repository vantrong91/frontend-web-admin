import { Component, OnInit } from '@angular/core';
import { SystemConfig, AccountStateConstant } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentUser: any;
  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem(SystemConfig.CURRENT_USER) != null) {
      let currentUser = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER)).data[0];
      if (currentUser != null) {
        switch (currentUser.state) {
          case AccountStateConstant.ACTIVE:
            // this.router.navigate(['/admin/main']);
            break;
          case AccountStateConstant.CREATE:
            alert('Tài khoản chưa được xác nhận');
            localStorage.removeItem(SystemConfig.CURRENT_USER);
            this.router.navigate(['/admin/login']);
            break;
          case AccountStateConstant.BLOCK:
            alert('Tài khoản đã bị khóa');
            localStorage.removeItem(SystemConfig.CURRENT_USER);
            this.router.navigate(['/admin/login']);
            break;
          case AccountStateConstant.TERMINATE:
            alert('Tài khoản đã hết hạn');
            localStorage.removeItem(SystemConfig.CURRENT_USER);
            this.router.navigate(['/admin/login']);
            break;
          default:
            alert('Tài khoản không có quyền đăng nhập');
            localStorage.removeItem(SystemConfig.CURRENT_USER);
            this.router.navigate(['/admin/login']);
        }
      }
    }
  }

}
